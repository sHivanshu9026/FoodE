const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtToken = 'my_secret_jwt_token';

router.post(
  "/register",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        location: req.body.location,
      });

      await newUser.save();
      res.json({ success: true });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

router.post(
    '/login',
    [
      body('email').isEmail(),
      body('password').isLength({ min: 5 }),
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const { email, password } = req.body;
  
        const userData = await User.findOne({ email });
        if (!userData) {
          return res.status(400).json({ errors: 'Invalid credentials!' });
        }
  
        const isPasswordValid = await bcrypt.compare(password, userData.password);
  
        if (!isPasswordValid) {
          return res.status(400).json({ errors: 'Invalid credentials!' });
        }
  
        const tokenPayload = {
          user: {
            id: userData.id,
          },
        };
  
        const authToken = jwt.sign(tokenPayload, jwtToken);
  
        return res.json({ success: true, authToken });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
      }
    }
  );
  

module.exports = router;
