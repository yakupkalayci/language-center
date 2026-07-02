const express = require('express');
const prisma = require('../lib/prismaClient');
const rateLimit = require('express-rate-limit');
const Response = require('../lib/Response');
const auth = require('../lib/auth')();
const { validate } = require("../middlewares/validate");
const { contactSchema } = require("../validators/contact.validator");


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

router.post("/", limiter(10), validate(contactSchema), async (req, res) => {
    try {
        const contact = await prisma.contactMessage.create({
            data: req.body
        });
        res.json(Response.successResponse({ contact }));
    } catch (error) {
        const errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).json(errorResponse);
    }
});

module.exports = router;