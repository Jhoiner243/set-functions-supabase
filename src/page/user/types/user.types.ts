export enum Roles {
  User = 'user',
  Admin = 'a  dmin'
}

export interface Rol {
  id: string;
  name: string;
}

export interface UserEntity {
  roleId: string,
  username: string,
  name: string,
  email: string,
  lastname: string,
  password: string
  premiun?: boolean
}

export interface UserLoginEntity  {
  username: string;
  password: string;
}