import { ICheckin } from "../interfaces/ICheckin";
import { createCheckinService } from "../services/Checkin.service";

export const createCheckinController = async (checkinData: ICheckin) => {
  return await createCheckinService(checkinData);
};
