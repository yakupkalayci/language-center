const express = require("express");
const bcrypt = require("bcrypt");
const is = require("is_js");
const { PrismaClient } = require("@prisma/client");
const config = require("../config");
const Enum = require("../config/Enum");
const jwt = require("jwt-simple");
const rateLimit = require("express-rate-limit");
const Response = require("../lib/Response");
const CustomError = require("../lib/Error");
const auth = require("../lib/auth")();

const router = express.Router();
const prisma = new PrismaClient();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
});

const checkPassword = (password) => {
  const regex = Enum.PASS_REGEX;
  if (!regex.test(password)) return false;
  return true;
};

router.post("/register", limiter, async (req, res) => {
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
        Enum.HTTPS_CODES.OK,
        "Hata.",
        "Lütfen tüm alanları doldurunuz."
      );
    }

    if (is.not.email(body.email)) {
      throw new CustomError(
        Enum.HTTPS_CODES.OK,
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
        Enum.HTTPS_CODES.OK,
        "Hata, Kullanıcı kayıtlı",
        "Lütfen başka bir e-posta adresi giriniz."
      );
    }

    body.password = await bcrypt.hash(body.password, 8);

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

router.post("/login", limiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new CustomError(
        Enum.HTTPS_CODES.OK,
        "Hatalı istek",
        "Eposta veya parola hatalı."
      );
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw new CustomError(
        Enum.HTTPS_CODES.OK,
        "Hatalı istek",
        "Eposta veya parola hatalı."
      );
    }

    let payload = {
      id: user.id,
      exp: parseInt(Date.now() / 1000) * config.JWT.EXPIRE_TIME,
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

router.put("/update/:id", limiter, auth.authenticate(), async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, password } = req.body;
    if (!email || !password || is.not.email(email) || checkPassword(password)) {
      throw new CustomError(
        Enum.HTTPS_CODES.BAD_REQUEST,
        "Hatalı istek",
        "Eposta veya parola hatalı."
      );
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: req.body,
    });
    res.json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.delete("/delete/:userId", limiter, auth.authenticate(), async (req, res) => {
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

module.exports = router;
