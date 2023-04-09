import Record from "./record";

const RecordCard = (props: { record: Record; rate: number; price: number }) => {
  const {
    fiatSymbol,
    price: fiatPrice,
    minSingleTransAmount,
    maxSingleTransAmount,
    nickName,
    monthFinishRate,
    monthOrderCount,
  } = props.record;

  return (
    <pre className="m-2 cursor-pointer rounded border-2 border-[#C99400] p-2 hover:border-[#F64670]">
      <p className="bold text-lg text-[#F64670]">
        {fiatSymbol}. {fiatPrice}
      </p>
      <i className="text-[#EAECEF]">
        {(+fiatPrice / props.price).toFixed(4)} |{" "}
        <span className="text-[#EAECEF]/80">
          {(+fiatPrice / props.rate).toFixed(4)}
        </span>
      </i>
      <p className="mt-3 text-[#848E9C]">
        {minSingleTransAmount} - {maxSingleTransAmount}
      </p>
      <p className="text-base text-slate-400"></p>
      <p className="text-sm italic text-[#0ECB81]">
        {nickName}{" "}
        <span className="text-[#0ECB81]/60">
          (~{+monthFinishRate.toFixed(2) * 100}%/
          {monthOrderCount})
        </span>
      </p>
    </pre>
  );
};

export default RecordCard;
