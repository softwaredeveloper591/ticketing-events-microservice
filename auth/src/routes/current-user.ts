import { Router } from 'express';

const router = Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('Current User Route');
});

export { router as currentUserRouter };