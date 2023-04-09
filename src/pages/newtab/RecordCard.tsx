import Record from "./record";

const RecordCard = (props: { record: Record; rate: number }) => {
  const {
    fiatSymbol,
    price,
    minSingleTransAmount,
    maxSingleTransAmount,
    minSingleTransQuantity,
    maxSingleTransQuantity,
    nickName,
    monthFinishRate,
    monthOrderCount,
  } = props.record;

  return (
    <pre className="m-2 cursor-pointer rounded border-2 border-red-400 p-2 hover:border-red-500">
      <p className="bold text-lg text-red-300">
        {fiatSymbol}. {price}
      </p>
      <i className="text-white">{+price / props.rate}</i>
      <p className="text-indigo-400">
        {(+minSingleTransQuantity).toFixed(2)} -{" "}
        {(+maxSingleTransQuantity).toFixed(2)}
      </p>
      <p className="text-base text-slate-400">
        {minSingleTransAmount} - {maxSingleTransAmount}
      </p>
      <p className="text-sm italic text-green-300">
        {nickName} (~{+monthFinishRate.toFixed(2) * 100}%/
        {monthOrderCount})
      </p>
    </pre>
  );
};

export default RecordCard;
