import { api, apiParams } from "utils";

export const getLocation = async (params, tokenAuth) => {
  const res = await apiParams("GET", params, "location", "", tokenAuth);
  if (res.status === 200) {
    const data = res?.data?.allLocation;
    return data
  }
};
