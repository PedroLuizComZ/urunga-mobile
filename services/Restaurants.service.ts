import { privateApi } from "./api";

export const listStoresService = async () => {
  return privateApi
    .get("/store")
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};

export const listStoreByIdService = async (storeId: string) => {
  return privateApi
    .get(`/store/${storeId}`)
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};

export const listStoreByCategoryService = async (category: string) => {
  return privateApi
    .get(`/store/list-by-category/${category}`)
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};

export const listStoreByEmailService = async (email: string) => {
  return privateApi
    .get(`/store/list-by-email/${email}`)
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};
