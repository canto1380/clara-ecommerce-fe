import { api, apiParams } from "utils";

export const getCountry = async (params, tokenAuth) => {
  const res = await apiParams("GET", params, "country", "", tokenAuth);
  if (res.status === 200) {
    const data = res?.data?.allCountries;
    return data
  }
};
