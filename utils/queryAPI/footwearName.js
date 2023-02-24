import { api } from "utils";

export const getFootwear = async() => {
  const res = await api('GET', 'footwear?limit=10000', '')
  if(res.status === 200) {
    const data = res?.data?.allFootwear;
    return data.map(({ idFootwearType, nameFootwear }) => {
    return { nameType: idFootwearType?.nameType, nameFootwear }
    })
  }
}
