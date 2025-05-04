import { Router, Request, Response} from 'express';
import { body, validationResult } from 'express-validator';


import {User} from '../models/user';

import { RequestValidationError } from '../errors/request-validation-error';
import { CustomizedError  } from '../errors/customized-error';

const router = Router();

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const isExist = await User.findOne({ email });
    if (isExist) {    
      throw new CustomizedError(400, 'Email in use');
    }
    const user= User.build({email, password});
    await user.save();

    res.status(201).send(user);
  }
);

export { router as signupRouter };