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

    res.json({
      status: "success",
      token,
      userData: userData,
    });
  } catch (err) {
    if (!res.headersSent) {
      let errorResponse = Response.errorResponse(err);
      res.status(errorResponse.code).json(errorResponse);
    }
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

module.exports = router;
