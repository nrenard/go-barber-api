import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';

import { secret, expiresIn } from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ message: 'Validation failed.' });

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ message: 'User not found' });

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Password incorrect' });
    }

    const { id, name } = user;

    const token = jwt.sign({ id }, secret, {
      expiresIn,
    });

    return res.json({ user: { id, name, email }, token });
  }
}

module.exports = new SessionController();
