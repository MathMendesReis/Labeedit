import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { InputSchema } from '../inteface/InputLogin';
import { ZodError } from 'zod';
import { BaseError } from '../error/BaseError';
import { InputSingUpSchema } from '../DTOs/InputSingUp.DTO';
import { InputUpdateSchema } from '../DTOs/inputUpdate.DTO';

export class UserController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private userBusiness : UserBusiness
  ) {}

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const inputData = InputSchema.parse(req.body);
      const result = await this.userBusiness.login(inputData);
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

  public singUp =async (req:Request, res:Response):Promise<void> => {
    try {
      const inputData = InputSingUpSchema.parse(req.body);
      const result = await this.userBusiness.singUp(inputData);
      res.status(200).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
     } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
     } else {
        res.status(500).send('Erro inesperado'+' '+ error);
     }
    }
  };


  public updateUser =async (req:Request, res:Response):Promise<void> => {
    try {
      const inputData = InputUpdateSchema.parse(req.body);

      const result = await this.userBusiness.updateUser(inputData);
      res.status(200).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
     } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
     } else {
        res.status(500).send('Erro inesperado'+' '+ error);
     }
    }
  };
  public deleteUserById =async (req:Request, res:Response):Promise<void> => {
    try {
      const inputData = InputUpdateSchema.parse(req.body);
      const result = await this.userBusiness.deleteUserById(inputData);
      res.status(200).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
     } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
     } else {
        res.status(500).send('Erro inesperado'+' '+ error);
     }
    }
  };
}
