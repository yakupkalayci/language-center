const express = require("express");
const prisma = require('../lib/prismaClient');
const Enum = require("../config/Enum");
const Response = require("../lib/Response");
const CustomError = require("../lib/Error");
const auth = require("../lib/auth")();

const router = express.Router();

router.get("/", auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const page = Number(req.query.pageIndex) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const dateType = req.query.dateType;

    const skip = (page - 1) * pageSize;

    // timezone-aware boundaries
    // client can pass tzOffset in minutes (the value returned by new Date().getTimezoneOffset())
    // example: for UTC+3 tzOffset === -180
    const tzOffset = Number(req.query.tzOffset) || 0;
    const tzMs = tzOffset * 60 * 1000;

    let startDate;
    let endDate;
    if (dateType) {
      // compute client's local Y/M/D by shifting now by -tzOffset
      const shiftedNow = new Date(Date.now() - tzMs);
      const Y = shiftedNow.getUTCFullYear();
      const M = shiftedNow.getUTCMonth();
      const D = shiftedNow.getUTCDate();

      if (dateType === 'day') {
        // client's local midnight in UTC = Date.UTC(Y,M,D) + tzMs
        const startEpoch = Date.UTC(Y, M, D) + tzMs;
        startDate = new Date(startEpoch);
      } else if (dateType === 'week') {
        // start = local date -7 days at local midnight, end = local date -1 day end of day
        const startEpoch = Date.UTC(Y, M, D - 7) + tzMs;
        const endEpoch = Date.UTC(Y, M, D - 1) + tzMs + (24 * 60 * 60 * 1000 - 1);
        startDate = new Date(startEpoch);
        endDate = new Date(endEpoch);
      } else if (dateType === 'month') {
        // start = same local day last month at local midnight, end = local date -7 days end of day
        const startEpoch = Date.UTC(Y, M - 1, D) + tzMs;
        const endEpoch = Date.UTC(Y, M, D - 7) + tzMs + (24 * 60 * 60 * 1000 - 1);
        startDate = new Date(startEpoch);
        endDate = new Date(endEpoch);
      }
    }

    // shared where clause for both findMany and count
    const where = startDate ? {
      userId,
      updatedAt: {
        gte: startDate,
        ...(endDate ? { lte: endDate } : {})
      }
    } : { userId };
    
    const [words, total] = await Promise.all([
      prisma.word.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          updatedAt: 'desc'
        },

      }),
      prisma.word.count({ where })
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

router.post("/", auth.authenticate(), async (req, res) => {
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

router.put("/:id", auth.authenticate(), async (req, res) => {
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

router.delete("/:id", auth.authenticate(), async (req, res) => {
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

router.get("/daily-learning", auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { settings: true }
    });

    const dailyWordCount = user.settings.dailyWordCount;

    const words = await prisma.word.findMany({
      where: { 
        userId,
        learnedWords: {
          none: {
            userId
          }
        }
      },
      take: dailyWordCount || 5
    });

    if (words.length) {
      console.log("ykp", words);;
      
      
      
      await prisma.dailySession.createMany({
        data: words.map(word => ({
          userId,
          wordId: word.id,
          date: startOfToday,
        })),
        skipDuplicates: true,
      });
    }

    res.json(Response.successResponse({ words }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.post("/daily-learning/:id/mark-learned", auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const wordId = req.params.id;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    await prisma.learnedWord.upsert({
      where: {
        userId_wordId: {
          userId,
          wordId
        },
      },
      update: {},
      create: {
        userId,
        wordId
      },
    });

    const learnedWordCount = await prisma.learnedWord.count({
      where: {
        userId,
        learnedAt: {
          gte: startOfToday,
          lte: endOfToday
        }
      },
    });

    const dailySessionWordCount = await prisma.dailySession.count({
      where: {
        userId,
        date: startOfToday
      }
    });

    if (learnedWordCount === dailySessionWordCount) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          settings: {
            update: {
              showDailyLearningWordModal: false,
            }
          },
        },
      });
    }

    res.json(Response.successResponse({
      title: 'Kelime işaretlendi',
      message: 'Kelime başarıyla işaretlendi.',
    }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.get("/learned", auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const page = Number(req.query.pageIndex) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if (!startDate || !endDate) {
      throw new CustomError(
        Enum.HTTPS_CODES.BAD_REQUEST,
        "Hata.",
        "Başlangıç ve bitiş tarihi girilmesi zorunludur."
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23,59,59,999);

    const skip = (page - 1) * pageSize;

    const [words, total, dailyCounts] = await Promise.all([
      prisma.learnedWord.findMany({
        where: {
          userId,
          learnedAt: {
            gte: start,
            lte: end
          }
        },
        skip,
        take: pageSize,
        include: {word: true},
        orderBy: {
          learnedAt: 'desc'
        }
      }),
      prisma.learnedWord.count({ 
        where: {
          userId,
          learnedAt: {
            gte: start,
            lte: end
          }
        },
      }),
      prisma.$queryRaw`
    SELECT
      DATE("learnedAt") as date,
      COUNT(*)::int as count
    FROM "LearnedWord"
    WHERE
      "userId" = ${userId}
      AND "learnedAt" >= ${start}
      AND "learnedAt" <= ${end}
    GROUP BY DATE("learnedAt")
    ORDER BY DATE("learnedAt")
  `,
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
      },
      dailyCounts,
    }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

module.exports = router;