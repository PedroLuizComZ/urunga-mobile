import {
  listStoreByIdService,
  listStoresService,
  listStoreByCategoryService,
  listStoreByEmailService,
} from "../services/Restaurants.service";

export const listStoresController = async () => {
  return await listStoresService();
};

export const listStoreByIdController = async (storeId: string) => {
  return await listStoreByIdService(storeId);
};

export const listStoreByCategoryController = async (category: string) => {
  return await listStoreByCategoryService(category);
};

export const listStoreByEmailController = async (email: string) => {
  return await listStoreByEmailService(email);
};

