'use client';
import usePricesBySocket from '@/hooks/usePricesBySocket';

export default function Home() {
  const { priceList } = usePricesBySocket();
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
            {priceList.map((cryptoObject, index) => {
              const cryptoKey = Object.keys(cryptoObject)[0];
              const cryptoValue = cryptoObject[cryptoKey];

              return (
                <tr key={index} className="even:bg-slate-100 odd:bg-white">
                  <td className="p-3">{index}</td>
                  <td className="p-3">{cryptoKey}</td>
                  <td className="p-3 font-bold">{cryptoValue as string}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
