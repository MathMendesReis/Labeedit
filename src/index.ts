import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './router/usersRouters';
import { postRouter } from './router/postsRouter';
import { comentsRouter } from './router/comentsRouter';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(Number(process.env.PORT), () => {
	console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`);
});

app.get('/', (req: Request, res: Response) => {
	res.send('Hello world!');
});

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/coments', comentsRouter);
