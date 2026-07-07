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

        if (!user || !isAdminUser) {
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

        res.json({ status: "success", userData: userData });
    } catch (err) {
        if (!res.headersSent) {
            let errorResponse = Response.errorResponse(err);
            res.status(errorResponse.code).json(errorResponse);
        }
    }
});

module.exports = router;