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

router.get("/", limiter, auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const words = await prisma.word.findMany({
      where: { userId },
    });

    res.json(Response.successResponse({
      words
    }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.post("/", limiter, auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const data = { userId, ...req.body };
    console.log("ENS", req.body);
    console.log("ykp", data);
    
    await prisma.word.create({
      data
    });

    res.json(Response.successResponse({
      title: 'Kelime eklendi'
    }));

  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

module.exports = router;