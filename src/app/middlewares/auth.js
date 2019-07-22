import jwt from 'jsonwebtoken';

import { secret } from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: 'Token not provided' });

  const [, token] = authHeader.split(' ');

  try {
    const { id } = await jwt.verify(token, secret);

    req.userId = id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
};
