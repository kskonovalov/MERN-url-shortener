const { Router } = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password length should be > 6').isLength({ min: 6 }),
    check('password', 'Password should contain digits and letters').matches(
      /([0-9].*[a-z])|([a-z].*[0-9])/i
    )
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Validation error'
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'User already exists!' });
      }
      const passwordHash = await bcrypt.hash(password, 12);
      const user = new User({ email, password: passwordHash });

      await user.save();

      res.status(201).json({ message: 'User Created!' });
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Something get wrong! Please try again' });
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Input correct email')
      .normalizeEmail()
      .isEmail(),
    check('password', "Password couldn't be empty").notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid login data'
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password' });
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1d'
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Something get wrong! Please try again' });
    }
  }
);

module.exports = router;
