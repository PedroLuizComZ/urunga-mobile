import { ICheckin } from "../interfaces/ICheckin";
import { publicApi } from "./api";

export const createCheckinService = async (checkinData: ICheckin) => {
  return publicApi
    .post("/checkin/", checkinData)
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};
