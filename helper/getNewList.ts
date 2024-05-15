import { ICoin } from '@/types/type';

export function getRefreshedPrices(
  restD: ICoin[],
  socketD: Record<string, unknown>[]
): ICoin[] {
  const idPriceMap: Record<string, string> = {};

  for (let soc of socketD) {
    const key = Object.keys(soc)[0];
    const value = soc[key];
    idPriceMap[key] = value as string;
  }

  const updatedList = restD.map((res) => {
    const priceUsd = idPriceMap[res.id];
    if (priceUsd) {
      return { id: res.id, priceUsd };
    } else {
      return res;
    }
  });

  const uniqueList = updatedList.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.id === value.id && t.priceUsd === value.priceUsd)
  );

  return uniqueList;
}
