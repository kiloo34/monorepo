import { getAuth } from '../config/firebaseAdmin.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decodedToken = await getAuth().verifyIdToken(token);
        req.user = decodedToken;

        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;
