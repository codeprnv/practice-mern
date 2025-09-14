import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
   const { email, password, confirmPassword } = req.body;

   if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
   }

   if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
   }

   try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ message: 'User already exists' });
      }

      // Create a new user
      const newUser = new User({
         email,
         password,
      });

      // Save the user to the database
      await newUser.save();
      return res.status(201).json({ message: 'User created successfully!!' });
   } catch (err) {
      console.error('Error during signup:', err);
      return res.status(500).json({ message: 'Internal server error' });
   }
});

// login Route
router.post('/login', async (req, res) => {
   const { email, password } = req.body;
   try {
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).json({ message: 'User not found!!' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
         return res.status(401).json({ message: 'Invalid Password!!' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
         expiresIn: '1h',
      });
      return res.status(200).json({ message: 'Login Successful!!', token });
   } catch (err) {
      console.error('Error during login: ', err);
      return res
         .status(500)
         .json({ message: 'Internal server error during login!!' });
   }
});

export default router;
