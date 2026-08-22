import jwt from 'jsonwebtoken';
import { mockStore } from '../data/mockStore.js';
import User from '../models/User.js';
import { getDBStatus } from '../config/db.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'svit_super_secret_jwt_key_2026_career_hub');

      if (getDBStatus()) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        const found = mockStore.findUserById(decoded.id);
        if (found) {
          const { password, ...userWithoutPass } = found;
          req.user = userWithoutPass;
        }
      }

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found or authorization revoked.' });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized, invalid token.' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided.' });
  }
};
