import type IUser from "./IUser";

export default interface IPost {
  id: string;
  body: string;
  is_joinable: boolean;
  user: IUser;
  created_at: string;
  updated_at: string;
}
