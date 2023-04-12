import { useEffect, useState } from "react";
import BankCard from "./BankCard";
import {
  bloombergPlugin,
  cbslPlugin,
  comBankPlugin,
  sampathBankPlugin,
  selanBankPlugin,
} from "./bank-plugins";

const BankInfo = () => {
  const [combank, setCombank] = useState(null);
  const [selan, setSelan] = useState(null);
  const [sampath, setSampath] = useState(null);
  const [cbsl, setCbsl] = useState(null);
  const [bloomberg, setBloomberg] = useState(null);

  useEffect(() => {
    (async function () {
      setCombank(await comBankPlugin());
      setSelan(await selanBankPlugin());
      setSampath(await sampathBankPlugin());
      setCbsl(await cbslPlugin());
      setBloomberg(await bloombergPlugin());
    })().catch(console.error);
  }, []);

  return (
    <div className="flex h-32 w-screen justify-between p-2">
      <BankCard name={"COMBANK"} rate={combank} />
      <BankCard name={"SELAN"} rate={selan} />
      <BankCard name={"SAMPATH"} rate={sampath} />
      <BankCard name={"Bloomberg"} rate={bloomberg} />
      <BankCard name={"CBSL"} pre={cbsl} />
    </div>
  );
};

export default BankInfo;
