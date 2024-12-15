import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('List of users');
});

router.post('/', (req: Request, res: Response) => {
    res.send('Create a new user');
});

export default router;
