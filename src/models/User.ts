export enum Role{
  // eslint-disable-next-line no-unused-vars
  USER = 'user',
  // eslint-disable-next-line no-unused-vars
  ADMIN = 'admin',
}

export interface users{
   id:string,
   name:string,
   email:string,
   role:Role,
   password:string,
   created_at:string,
}

export class Users {
  constructor(
  // eslint-disable-next-line no-unused-vars
  private id:string,
  // eslint-disable-next-line no-unused-vars
  private name:string,
  // eslint-disable-next-line no-unused-vars
  private email:string,
  // eslint-disable-next-line no-unused-vars
  private role:Role,
  // eslint-disable-next-line no-unused-vars
  private password:string,
  // eslint-disable-next-line no-unused-vars
  private created_at:string,
  ) {}

  public getId():string{
    return this.id;
  }
  public getName():string{
    return this.name;
  }
  public getEmail(): string {
    return this.email;
  }
  public getRole():Role{
    return this.role;
  }
  public getPassword():string{
    return this.password;
  }
  public getCreated_at():string{
    return this.created_at;
  }

  public setName(name:string){
    this.name = name;
  }
}
