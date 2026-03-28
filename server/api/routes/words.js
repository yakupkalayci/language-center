const express = require("express");
const bcrypt = require("bcrypt");
const is = require("is_js");
const prisma = require('../lib/prismaClient');
const config = require("../config");
const Enum = require("../config/Enum");
const jwt = require("jwt-simple");
const rateLimit = require("express-rate-limit");
const Response = require("../lib/Response");
const CustomError = require("../lib/Error");
const auth = require("../lib/auth")();

const router = express.Router();

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
    const page = Number(req.query.pageIndex) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const dateType = req.query.dateType;

    const skip = (page - 1) * pageSize;

    let startDate;
    let endDate;
    if (dateType) {
      if (dateType === 'day') {
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
      } else if (dateType === 'week') {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        startDate.setHours(0, 0, 0, 0);

        endDate = new Date();
        endDate.setDate(endDate.getDate() - 1);
        endDate.setHours(23, 59, 59, 999);
      } else if (dateType === 'month') {
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        startDate.setHours(0, 0, 0, 0);

        endDate = new Date();
        endDate.setDate(endDate.getDate() - 7);
        endDate.setHours(23, 59, 59, 999);
      }
    }

    const [words, total] = await Promise.all([
      prisma.word.findMany({
        where: startDate ? {
          userId,
          updatedAt: {
            gte: startDate,
            ...(endDate ? {lte: endDate} : {})
          }
        } : {
          userId
        },
        skip: startDate ? 0 : skip,
        take: pageSize,
        orderBy: {
          updatedAt: 'desc'
        },

      }),
      prisma.word.count({
        where: {userId}
      })
    ]);

    const totalPages = Math.ceil(total / pageSize);

    res.json(Response.successResponse({
      words,
      pagination: {
        total,
        page,
        pageSize,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
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

router.put("/:id", limiter, auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const wordId = req.params.id;
    const wordData = req.body;
    const updatedWord = await prisma.word.update({
      where: {userId, id:wordId},
      data: wordData
    });

    res.json(Response.successResponse({
      updatedWord
    }));
  } catch(err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.delete("/:id", limiter, auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const wordId = req.params.id;
    await prisma.word.delete({
      where: { userId, id: wordId },
    });
    res.status(Enum.HTTPS_CODES.OK)
      .json(Response.successResponse({ title: "Kelime silindi", message: "Kelime başarıyla silindi." }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

module.exports = router;