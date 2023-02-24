import { api } from "utils";

export const getFootwearType = async(tokenAuth) => {
  const res = await api('GET', 'footwearType', '', tokenAuth)
  if(res.status === 200) {
    const data = res?.data?.allFootwearType;
    return data
  }
}
