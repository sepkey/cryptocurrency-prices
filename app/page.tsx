'use client';
import { REST_API_URL } from '@/utils/constants';
import { getRefreshedPrices } from '@/utils/getNewList';
import usePricesBySocket from '@/hooks/usePricesBySocket';
import { ICoin } from '@/types/type';
import { useEffect, useState } from 'react';

export default function Home() {
  const { socketData } = usePricesBySocket();
  const [restData, setRestData] = useState<ICoin[]>([]);

  useEffect(() => {
    fetch(REST_API_URL)
      .then((res) => res.json())
      .then((res) => {
        const mappedData = res.data.map((item: ICoin) => {
          return { id: item.id, priceUsd: item.priceUsd };
        });
        setRestData(mappedData);
      });
  }, []);

  return (
    <main className="flex flex-col items-center justify-between p-16">
      <section className="max-w-7xl my-5  mx-auto">
        <table className="text-center  border-collapse">
          <thead className="bg-teal-600 text-white text-xl">
            <tr>
              <th className="p-5">Number</th>
              <th className="p-5">Cryptocurrency</th>
              <th className="p-5">Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {getRefreshedPrices(restData, socketData).map((coin, index) => {
              return (
                <tr key={index} className="even:bg-slate-100 odd:bg-white">
                  <td className="p-3">{index}</td>
                  <td className="p-3">{coin.id}</td>
                  <td className="p-3 font-bold">
                    {parseFloat(coin.priceUsd).toFixed(3)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
