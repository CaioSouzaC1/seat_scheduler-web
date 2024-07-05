import { IApiRoot } from "../Api";
import { IUser } from "../User";

export interface ICreatedUser extends IApiRoot {
  data: IUser;
}
