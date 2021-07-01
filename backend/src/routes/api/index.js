import { Router } from 'express';
import UserRouter from './handle';

const router = Router();

router.use('/',  UserRouter);

export default router;
