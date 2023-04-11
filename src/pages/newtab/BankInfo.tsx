import { useEffect, useState } from "react";
import BankCard from "./BankCard";
import { bloombergPlugin, cbslPlugin, comBankPlugin } from "./bank-plugins";

const BankInfo = () => {
  const [rate, setRate] = useState(null);
  const [cbsl, setCbsl] = useState(null);
  const [bloomberg, setBloomberg] = useState(null);

  useEffect(() => {
    (async function () {
      setRate(await comBankPlugin());
      setCbsl(await cbslPlugin());
      setBloomberg(await bloombergPlugin());
    })().catch(console.error);
  }, []);

  return (
    <div className="flex h-32 w-screen justify-between p-2">
      <BankCard name={"CBSL"} pre={cbsl} />
      <BankCard name={"COMBANK"} rate={rate} />
      <BankCard name={"Bloomberg"} rate={bloomberg} />
      <BankCard />
    </div>
  );
};

export default BankInfo;
