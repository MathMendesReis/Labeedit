import { UserDataBase } from '../database/UserDataBase';
import { Input } from '../DTOs/InputLogin';
import { OutputGetUser } from '../inteface/outputGetUse';
import { IdGenerator } from '../services/IdGenerator';
    // eslint-disable-next-line no-unused-vars
import { TokenManager, TokenPayload } from '../services/TokenManager';
import { InputSingUp } from '../DTOs/InputSingUp.DTO';
import { BadRequestError } from '../error/BadRequestError';
import { Role, Users } from '../models/User';
import { HashManager } from '../services/HashManager';

export class UserBusiness {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private userBaseDataBase :  UserDataBase,
     // eslint-disable-next-line no-unused-vars
    private idGenerator: IdGenerator,
    // eslint-disable-next-line no-unused-vars
    private tokenManager: TokenManager,
    // eslint-disable-next-line no-unused-vars
    private hashManager: HashManager,

  ) {}

  public login = async ({email,password}: Input): Promise<OutputGetUser | Error> => {

    const usersWithEmail = await this.userBaseDataBase.getAllUsersByEmail(email);
    if (usersWithEmail.length < 1) return new BadRequestError('Requisição inválida');


    const usersWithPassword = await this.userBaseDataBase.getAllUsersByPassword(password);
    if (usersWithPassword.length < 1) return new BadRequestError('Requisição inválida');




    return {
      message:'',
      token: ''
    };
  };

  public singUp =async ({name,email,password}: InputSingUp):Promise<OutputGetUser | Error> => {
      const isEmail = await this.userBaseDataBase.getAllUsersByEmail(email);
      if(isEmail.length > 0) return new BadRequestError('Requisição inválida');

      const id = this.idGenerator.generate();
      const hashedPassword = await this.hashManager.hash(password);

      const newUser = new Users(
        id,
        name,
        email,
        Role.USER,
        hashedPassword,
        new Date().toISOString()
      );

      await this.userBaseDataBase.insertUserInDB(newUser);

      const tokenPayload: TokenPayload = {
        id: newUser.getId(),
        role: newUser.getRole()
    };

    // criação do token string a partir do payload
    const token = this.tokenManager.createToken(tokenPayload);

      return {
        message:'Usúario cadastrado com sucesso.',
        token
      };
   };

}


// 46
// jfo
// wcp
