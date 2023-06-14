import { Request, Response } from 'express';
import { PostBusiness } from '../business/PostBusiness';
import { ZodError } from 'zod';
import { BaseError } from '../error/BaseError';
import { inputDTOSchemma } from '../DTOs/inputCreatePost.DTO';
import { InputDeleteByIdSchema } from '../DTOs/inputDelete.DTO';
import { InputUpdatePostSchema } from '../DTOs/inputUpdatePost.DTO';

export class PostController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private postBusiness : PostBusiness
  ) {}

  public createPost =async (req:Request, res:Response) => {
    try {

      const input = inputDTOSchemma.parse(req.body);
      await this.postBusiness.createPost(input);
      res.status(200).send({message:'Post created successfully'});


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

public deletePost =async (req:Request, res:Response) => {
  try {

    const input = InputDeleteByIdSchema.parse(req.body);
    await this.postBusiness.deletePost(input);
    res.status(200).send({message:'Post delete successfully'});


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

public updatePost =async (req:Request, res:Response) => {
  try {
    const input = InputUpdatePostSchema.parse(req.body);
    await this.postBusiness.updatePost(input);
    res.status(200).send({message:' Update post successfully'});
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


public getAllpost =async (req:Request, res:Response) => {
  try {

    const result = await this.postBusiness.getAllpost();
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
public findPostByUserId =async (req:Request, res:Response) => {
  try {

    const id = req.params.id;

    const result = await this.postBusiness.findPostByUserId(id);
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
