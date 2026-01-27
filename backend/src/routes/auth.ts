import express from 'express';
import { authRegister, authLogin, authRefresh } from '../controllers/auth';
import { authMiddleware, roleMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/register', authRegister);
router.post('/login', authLogin);
router.post('/refresh', authRefresh);

// Example protected route
router.get('/me', authMiddleware, (req, res) => {
  res.json({
    data: req.body,
  });
});

export default router;
