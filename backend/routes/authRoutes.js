import express from 'express';
import { register } from '../controllers/authController.js';
const router = express.Router();

//* Auth routes
router.post('/register', register)

export default router;