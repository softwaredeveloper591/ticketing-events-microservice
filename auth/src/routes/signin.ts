import { Router, Request, Response } from 'express';
import { body} from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password'),
], validateRequest,
  
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }
    // Check if the password is correct

    const passwordsMatch = bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }
    // Generate JWT token
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!);

    req.session = { jwt: userJwt };
    res.status(200).send(user);
});

export { router as signinRouter };