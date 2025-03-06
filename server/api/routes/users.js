const express = require("express");
const bcrypt = require("bcrypt");
const is = require("is_js");
const { PrismaClient } = require("@prisma/client");
const config = require("../config");
const jwt = require('jwt-simple');

const router = express.Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
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
      return res.status(400).json({ error: "Please fill all fields" });
    }

    if (is.not.email(body.email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const isUniqueEmail = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (isUniqueEmail) {
      return res.status(400).json({ error: "User already exists" });
    }

    body.password = await bcrypt.hash(body.password, 8);

    await prisma.user.create({
      data: body,
    });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in /register:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if(!user) {
      res.status(400).json({ error: "Email or password wrong"});
    }

    const isPassowrdValid = bcrypt.compare(user.password, password);
    if(!isPassowrdValid) {
      res.status(400).json({ error: "Email or password wrong"});
    }

    let payload = {
      id: user.id,
      exp: parseInt(Date.now() / 1000) * config.JWT.EXPIRE_TIME
    }

    let token = jwt.encode(payload, config.JWT.SECRET);

    res.json({
      token
    });

  } catch(err) {
    console.error("Error in /register:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
