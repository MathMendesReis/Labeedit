export enum Role{
  "ADMIN",
  "USER"
}

export interface users{
   name:string,
   email:string,
   role:Role,
   created_at:Date,
}

export class Users {
  constructor(
    private id:string,
    private name:string,
    private email:string,
    private role:Role,
    private created_at:Date,
  ) {

  }
}
