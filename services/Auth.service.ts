
import { ISigninDTO } from "../interfaces/ISigninDTO";
import { IUser } from "../interfaces/IUser";
import { publicApi } from "./api";

export const createUserService = async (createUser: IUser) => {
  return publicApi
    .post("/user/client", createUser)
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};

export const signinService = async (user: ISigninDTO) => {
  return publicApi
    .post("/user/login", user)
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};

