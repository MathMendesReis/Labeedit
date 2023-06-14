import { ZodError } from 'zod';
import { LikeDislikesBusiness } from '../business/LikeDislikeBusiness';
import { BaseError } from '../error/BaseError';
import { Request, Response } from 'express';

export class LikeDislikeController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private likiDislikeBusiness : LikeDislikesBusiness
  ) {}

    public LikeDislike =async (req:Request, res:Response) => {
    try {

      const result = await this.likiDislikeBusiness.LikeDislike();


      res.status(200).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Erro de validação', issues: error.issues });
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro inesperado', message: error });
      }
    }
};

}
