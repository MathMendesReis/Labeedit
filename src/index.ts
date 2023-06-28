import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './router/usersRouters';
import { postRouter } from './router/postsRouter';
import { like_dislike_router } from './router/like_dislike_router';
import { comentsRouter } from './router/comentsRouter';
import { like_dislike_coments_router } from './router/LikeDislikeComents';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
	console.log('Servidor rodando na porta 3003');
});

app.get('/ping', (req: Request, res: Response) => {
	res.send('Pong!');
});

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/like', like_dislike_router);
app.use('/coments', comentsRouter);
app.use('/likesComents', like_dislike_coments_router);
