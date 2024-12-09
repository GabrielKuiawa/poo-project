import { Router, Request, Response } from 'express';
import userRoutes from './userRoutes';
const router = Router();


router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the API!');
});

router.get('/about', (req: Request, res: Response) => {
    res.send('About this API...');
});

router.use('/users', userRoutes);

export default router;
