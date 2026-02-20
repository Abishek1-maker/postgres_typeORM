import { Role } from '../enums/role.enum';

//this is function going to use in authservice
export type CurrentUser = {
  id: number;
  role: Role;
};
