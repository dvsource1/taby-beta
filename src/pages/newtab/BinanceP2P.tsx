import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import RecordCard from "./RecordCard";
import Record from "./record";
import mapRecord from "./utli";

type RecordEntry = {
  records: Record[];
  rate: number;
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

  const _setRecordsMap = (orders: any[], rates: string[] | number[]) => {
    const newMap = new Map<string, RecordEntry>();

    _.forEach(orders, (order) => {
      const record = mapRecord(order);
      if (!newMap.has(record.asset)) {
        const assetIndex = ASSETS.indexOf(record.asset);
        newMap.set(record.asset, { rate: +rates[assetIndex], records: [] });
      }
      newMap.get(record.asset).records.push(record);
    });

    setRecordsMap(newMap);
    console.log(newMap);
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

    const rateRequests = ASSETS.filter((asset) => asset !== "USDT").map(
      (asset) =>
        axios.get(`https://api.binance.com/api/v3/avgPrice?symbol=${asset}USDT`)
    );

    axios.all([...orderRequests, ...rateRequests]).then((responses) => {
      console.log(responses);
      const ordersResponses = responses.filter((res) =>
        _.has(res, "data.data")
      );
      const orders = ordersResponses.map((res) => res.data.data);

      const rateResponses = responses.filter((res) => _.has(res, "data.price"));
      const rates = rateResponses.map((res) => res.data.price);
      _setRecordsMap(_.flatten(orders), [1, ...rates]);
    });
  }, []);

  return (
    <div className="flex">
      {Array.from(recordsMap).map((entry) => {
        const [asset, _entry] = entry;
        const { rate, records } = _entry;
        return (
          <div key={asset}>
            <div className="text-bold m-2 rounded border-2 border-red-400 p-2 text-center text-xl text-slate-300">
              {asset} | {rate.toFixed(4)}
            </div>
            <div className="flex flex-col">
              {records
                .filter((_, i) => i < 6)
                .map((record) => (
                  <RecordCard key={record.advNo} record={record} rate={rate} />
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BinanceP2P;
