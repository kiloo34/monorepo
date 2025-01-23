import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id', authMiddleware, getUserById);
router.post('/', authMiddleware, createUser);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

router.get('/', authMiddleware, getAllUsers);

export default router;