import { Router } from 'express';
import { currentUser } from '@esticket/common';

const router = Router();

router.get('/api/users/currentuser', currentUser,  async (req, res) => {
  res.send({ currentUser: req.currentUser || null});
});

export { router as currentUserRouter };