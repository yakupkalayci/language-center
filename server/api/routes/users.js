const express = require("express");
const bcrypt = require("bcrypt");
const is = require("is_js");
const config = require("../config");
const prisma = require('../lib/prismaClient');
const Enum = require("../config/Enum");
const jwt = require("jwt-simple");
const rateLimit = require("express-rate-limit");
const Response = require("../lib/Response");
const CustomError = require("../lib/Error");
const auth = require("../lib/auth")();

const router = express.Router();

const limiter = (max) => {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    max: max ?? 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again later.",
  });
};

const checkPassword = (password) => {
  const regex = Enum.PASS_REGEX;
  if (!regex.test(password)) return false;
  return true;
};

router.post("/register", limiter(10), async (req, res) => {
  try {
    let body = req.body;
    if (
      !body ||
      !Object.keys(body) ||
      !body.password ||
      !body.email ||
      !body.firstName ||
      !body.lastName
    ) {
      throw new CustomError(
        Enum.HTTPS_CODES.BAD_REQUEST,
        "Hata.",
        "Lütfen tüm alanları doldurunuz."
      );
    }

    if (is.not.email(body.email)) {
      throw new CustomError(
        Enum.HTTPS_CODES.BAD_REQUEST,
        "Hata.",
        "Geçersiz e-posta adresi."
      );
    }

    const isNotUniqueEmail = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (isNotUniqueEmail) {
      throw new CustomError(
        Enum.HTTPS_CODES.BAD_REQUEST,
        "Hata, Kullanıcı kayıtlı",
        "Lütfen başka bir e-posta adresi giriniz."
      );
    }

  body.password = await bcrypt.hash(body.password, config.SECURITY.BCRYPT_SALT_ROUNDS);

    await prisma.user.create({
      data: body,
    });

    res
      .status(Enum.HTTPS_CODES.OK)
      .json(
        Response.successResponse({ title:"Hesap oluşturuldu.", message: "Uygulamaya giriş yaparak kullanmaya başlayabilirsiniz." })
      );
  } catch (err) {
    if (!res.headersSent) {
      let errorResponse = Response.errorResponse(err);
      res.status(errorResponse.code).json(errorResponse);
    }
  }
});

router.post("/login", limiter(10), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new CustomError(
        Enum.HTTPS_CODES.BAD_REQUEST,
        "Hatalı istek",
        "Eposta veya parola hatalı."
      );
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw new CustomError(
        Enum.HTTPS_CODES.BAD_REQUEST,
        "Hatalı istek",
        "Eposta veya parola hatalı."
      );
    }

    let payload = {
      id: user.id,
      exp: Math.floor(Date.now() / 1000) + config.JWT.EXPIRE_TIME,
    };

    let token = jwt.encode(payload, config.JWT.SECRET);
    const {password: _, ...userData} = user;

    // create refresh token and persist
    const refreshPayload = {
      id: user.id,
      at: Date.now(),
    };
  const refreshToken = jwt.encode(refreshPayload, config.JWT.SECRET);
  const expiresAt = new Date(Date.now() + config.JWT.REFRESH_EXPIRE_TIME * 1000);
  await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id, expiresAt } });

    // send access token in httpOnly cookie and return user data
    res.cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: config.JWT.EXPIRE_TIME * 1000 });
    res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });

    res.json({ status: "success", userData: userData });
  } catch (err) {
    if (!res.headersSent) {
      let errorResponse = Response.errorResponse(err);
      res.status(errorResponse.code).json(errorResponse);
    }
  }
});

// Refresh access token using refresh token cookie
router.post('/refresh', limiter(), async (req, res) => {
  try {
    const refreshToken = req.cookies?.refresh_token || req.body?.refresh_token;
    if (!refreshToken) {
      throw new CustomError(Enum.HTTPS_CODES.UNAUTHORIZED, 'Unauthorized', 'No refresh token provided');
    }

    const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!stored || stored.revoked) {
      throw new CustomError(Enum.HTTPS_CODES.UNAUTHORIZED, 'Unauthorized', 'Invalid refresh token');
    }

    if (stored.expiresAt && new Date(stored.expiresAt) < new Date()) {
      // token expired
      await prisma.refreshToken.updateMany({ where: { token: refreshToken }, data: { revoked: true } });
      throw new CustomError(Enum.HTTPS_CODES.UNAUTHORIZED, 'Unauthorized', 'Refresh token expired');
    }

    // decode the refresh token (we used jwt-simple without verification helpers)
    let payload;
    try {
      payload = jwt.decode(refreshToken, config.JWT.SECRET);
    } catch (e) {
      throw new CustomError(Enum.HTTPS_CODES.UNAUTHORIZED, 'Unauthorized', 'Invalid refresh token');
    }

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) {
      throw new CustomError(Enum.HTTPS_CODES.UNAUTHORIZED, 'Unauthorized', 'User not found');
    }

  // rotate refresh token: revoke old and create new
  await prisma.refreshToken.updateMany({ where: { token: refreshToken }, data: { revoked: true } });
  const newRefreshPayload = { id: user.id, at: Date.now() };
  const newRefreshToken = jwt.encode(newRefreshPayload, config.JWT.SECRET);
  const newExpiresAt = new Date(Date.now() + config.JWT.REFRESH_EXPIRE_TIME * 1000);
  await prisma.refreshToken.create({ data: { token: newRefreshToken, userId: user.id, expiresAt: newExpiresAt } });

  // issue new access token
  const newAccess = jwt.encode({ id: user.id, exp: Math.floor(Date.now() / 1000) + config.JWT.EXPIRE_TIME }, config.JWT.SECRET);
  res.cookie('access_token', newAccess, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: config.JWT.EXPIRE_TIME * 1000 });
  res.cookie('refresh_token', newRefreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
  res.json(Response.successResponse({ title: 'Token Refreshed' }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

// Logout: revoke refresh token and clear cookies
router.post('/logout', limiter(), auth.authenticate(), async (req, res) => {
  try {
    const refreshToken = req.cookies?.refresh_token || req.body?.refresh_token;
    if (refreshToken) {
      await prisma.refreshToken.updateMany({ where: { token: refreshToken }, data: { revoked: true } });
    } else if (req.user && req.user.id) {
      await prisma.refreshToken.updateMany({ where: { userId: req.user.id }, data: { revoked: true } });
    }
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.json(Response.successResponse({ title: 'Logged out' }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

// router.put("/update/:id", limiter, auth.authenticate(), async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { email, password } = req.body;
//     if (!email || !password || is.not.email(email) || checkPassword(password)) {
//       throw new CustomError(
//         Enum.HTTPS_CODES.BAD_REQUEST,
//         "Hatalı istek",
//         "Eposta veya parola hatalı."
//       );
//     }
//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: req.body,
//     });
//     res.json({
//       status: "success",
//       updatedUser,
//     });
//   } catch (err) {
//     let errorResponse = Response.errorResponse(err);
//     res.status(errorResponse.code).json(errorResponse);
//   }
// });

router.patch("/update-profile", limiter(), auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, email } = req.body;
    const updatedData = {};

    if (email) {
      if (is.not.email(email)) {
        throw new CustomError(
          Enum.HTTPS_CODES.BAD_REQUEST,
          "Hatalı İstek",
          "Geçersiz E-Posta Adresi"
        );
      }
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        throw new CustomError(
          Enum.HTTPS_CODES.BAD_REQUEST,
          "Hatalı İstek",
          "Bu e-posta zaten kullanlıyor."
        );
      }
      updatedData.email = email;
    }

    if (firstName) updatedData.firstName = firstName;
    if (lastName) updatedData.lastName = lastName;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData
    });

    const {password, ...userData} = updatedUser;

    res.json(Response.successResponse({
      title: 'Profil Güncellendi',
      message: 'Bilgileriniz başarıyla güncellendi.',
      user: userData
    }));

  } catch (err) {
    if (!res.headersSent) {
      let errorResponse = Response.errorResponse(err);
      res.status(errorResponse.code).json(errorResponse);
    }
  }

});

router.delete("/delete/:userId", limiter(), auth.authenticate(), async (req, res) => {
  try {
    const userId = req.params.userId;    
    await prisma.user.delete({
      where: {
        id: userId
      }
    });
    
    res.status(Enum.HTTPS_CODES.OK)
    .json(Response.successResponse({title: "Hesap silindi", message: "Hesabınz başarıyla silindi."}));
  } catch(err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.patch("/update-password", limiter(), auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      throw new CustomError(
        Enum.HTTPS_CODES.BAD_REQUEST,
        "Mevcut parola ve yeni parola zorunludur."
      );
    }

    if (!checkPassword(newPassword)) {
      throw new CustomError(
        Enum.HTTPS_CODES.BAD_REQUEST,
        "Yeni parola kriterlere uymuyor."
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    const isCorrectPassword = await bcrypt.compare(currentPassword, user.password);

    if (!isCorrectPassword) {
      throw new CustomError(
        Enum.HTTPS_CODES.BAD_REQUEST,
        "Mevcut parola yanlış."
      );
    }

  const hashedPassword = await bcrypt.hash(newPassword, config.SECURITY.BCRYPT_SALT_ROUNDS);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    res.json(Response.successResponse({
      title: "Parola Güncellendi",
      message: "Parolanız başarıyla değiştirildi."
    }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

// Return current user
router.get('/me', auth.authenticate(), async (req, res) => {
  try {
    const { password, ...userData } = req.user;
    res.json(Response.successResponse({ user: userData }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

module.exports = router;
