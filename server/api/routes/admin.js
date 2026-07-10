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

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
    });
})

router.post("/login", limiter(10), async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        const isAdminUser = user.role.includes(Enum.ROLES.ADMİN);

        // TODO
        // if (!user || !isAdminUser) {
        //     throw new CustomError(
        //         Enum.HTTPS_CODES.BAD_REQUEST,
        //         "Hatalı istek",
        //         "Eposta veya parola hatalı."
        //     );
        // }
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

        const { password: _, ...userData } = user;

        // create refresh token and persist
        const refreshPayload = {
            id: user.id,
            at: Date.now(),
        };
        const refreshToken = jwt.encode(refreshPayload, config.JWT.SECRET);
        const expiresAt = new Date(Date.now() + config.JWT.REFRESH_EXPIRE_TIME * 1000);
        await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id, expiresAt } });

        // send access token in httpOnly cookie and return user data
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: config.JWT.EXPIRE_TIME * 1000
        });
        // set refresh cookie maxAge to refresh expiry so browser persists it correctly
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: config.JWT.REFRESH_EXPIRE_TIME * 1000
        });

        res.json({ status: "success", userData: userData, accessToken: token, refreshToken: refreshToken });
    } catch (err) {
        if (!res.headersSent) {
            let errorResponse = Response.errorResponse(err);
            res.status(errorResponse.code).json(errorResponse);
        }
    }
});

router.post('/logout', limiter(), async (req, res) => {
  try {
    const refreshToken = req.cookies?.refresh_token || req.body?.refresh_token;
    if (refreshToken) {
      await prisma.refreshToken.updateMany({ where: { token: refreshToken }, data: { revoked: true } });
    } else if (req.user && req.user.id) {
      await prisma.refreshToken.updateMany({ where: { userId: req.user.id }, data: { revoked: true } });
    }
    // clear cookies regardless
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.json(Response.successResponse({ title: 'Logged out' }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.get('/me', auth.authenticate(), async (req, res) => {
  try {
    if(req.user?.id) {
        const { password, ...userData } = req.user;
        res.json(Response.successResponse({ authenticated: true, user: userData}));
    } else {
        return res.status(401).json({
            authenticated: false,
        });
    }
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.get("/users", auth.authenticate(), async (req, res) => {
  try {
    const userId = req.user.id;
    const page = Number(req.query.pageIndex) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    const skip = (page - 1) * pageSize;
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: pageSize,
        orderBy: {
          createdAt: 'desc'
        },
        omit: {
            password: true,
        },
      }),
      prisma.user.count()
    ]);

    const totalPages = Math.ceil(total / pageSize);

    res.json(Response.successResponse({
      users,
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

module.exports = router;