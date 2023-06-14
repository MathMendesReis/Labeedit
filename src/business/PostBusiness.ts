import { IdGenerator } from '../services/IdGenerator';
    // eslint-disable-next-line no-unused-vars
import { TokenManager, TokenPayload } from '../services/TokenManager';
import { HashManager } from '../services/HashManager';
import { PostDataBase } from '../database/PostDataBase';


export class PostBusiness {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private userBaseDataBase :  PostDataBase,
     // eslint-disable-next-line no-unused-vars
    private idGenerator: IdGenerator,
    // eslint-disable-next-line no-unused-vars
    private tokenManager: TokenManager,
    // eslint-disable-next-line no-unused-vars
    private hashManager: HashManager,

  ) {}




}
