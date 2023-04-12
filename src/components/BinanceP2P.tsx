import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import Record from "../pages/newtab/record";
import mapRecord from "../pages/newtab/utli";
import RecordCard from "./RecordCard";

type RecordEntry = {
  records: Record[];
  rate: number;
  price: number;
};
const ASSETS = [
  "USDT",
  "BUSD",
  "BTC",
  "ETH",
  "BNB",
  "DAI",
  "ADA",
  "TRX",
  "SHIB",
];

const BinanceP2P = () => {
  const [recordsMap, setRecordsMap] = useState(new Map<string, RecordEntry>());

  const _setRecordsMap = (
    orders: any[],
    prices: string[] | number[],
    rates: string[] | number[]
  ) => {
    const newMap = new Map<string, RecordEntry>();

    _.forEach(orders, (order) => {
      const record = mapRecord(order);
      if (!newMap.has(record.asset)) {
        const assetIndex = ASSETS.indexOf(record.asset);
        newMap.set(record.asset, {
          price: +prices[assetIndex],
          rate: +rates[assetIndex],
          records: [],
        });
      }
      newMap.get(record.asset).records.push(record);
    });

    setRecordsMap(newMap);
  };

  useEffect(() => {
    const orderRequests = ASSETS.map((asset) => {
      const payload = {
        proMerchantAds: false,
        page: 1,
        rows: 10,
        payTypes: ["BANK"],
        countries: [],
        publisherType: null,
        fiat: "LKR",
        tradeType: "SELL",
        asset,
      };
      return axios.post(
        "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search",
        payload
      );
    });

    const priceRequests = ASSETS.filter((asset) => asset !== "USDT").map(
      (asset) =>
        axios.get(`https://api.binance.com/api/v3/avgPrice?symbol=${asset}USDT`)
    );

    // const rateRequests = ASSETS.map((asset) =>
    //   axios.get(
    //     `https://rest.coinapi.io/v1/exchangerate/${asset}/USD?apiKey=${COIN_API}`
    //   )
    // );

    axios
      .all([...orderRequests, ...priceRequests /*, ...rateRequests*/])
      .then((responses) => {
        const ordersResponses = responses.filter((res) =>
          _.has(res, "data.data")
        );
        const orders = ordersResponses.map((res) => res.data.data);

        const priceResponses = responses.filter((res) =>
          _.has(res, "data.price")
        );
        const prices = priceResponses.map(
          (res) => res.data.price - res.data.price * 0.001
        );
        // const rateResponses = responses.filter((res) =>
        //   _.has(res, "data.rate")
        // );
        // const rates = rateResponses.map((res) => res.data.rate);

        _setRecordsMap(_.flatten(orders), [1, ...prices], [1, ...prices]);
      });
  }, []);

  return (
    <div className="w-screen flex-1 overflow-auto border-t-2 border-white p-2">
      <div className="flex">
        {Array.from(recordsMap).map((entry) => {
          const [asset, _entry] = entry;
          const { rate, price, records } = _entry;
          return (
            <div key={asset}>
              <div className="text-bold m-2 rounded border-4 border-[#F64670]/60 p-2 text-center text-xl text-[#FCD535]">
                {asset}
                <div className="text-lg">
                  <span className="text-[#FCD535]/50">{price.toFixed(4)} </span>
                  <span className="text-[#FCD535]/30">| {rate.toFixed(4)}</span>
                </div>
              </div>
              <div className="flex flex-col">
                {records
                  .filter((_, i) => i < 5)
                  .map((record) => (
                    <RecordCard
                      key={record.advNo}
                      record={record}
                      price={price}
                      rate={rate}
                    />
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BinanceP2P;
