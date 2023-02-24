import { api, apiParams } from "utils";

export const getProvince = async (params, tokenAuth) => {
  const res = await apiParams("GET", params, "province", "", tokenAuth);
  if (res.status === 200) {
    const data = res?.data?.allProvince;
    return data
  }
};
