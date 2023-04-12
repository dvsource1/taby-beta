const BankCard = (props: { name?: string; rate?: number; pre?: string }) => {
  return (
    <div className="m-2 max-h-full min-h-fit flex-1 rounded border-0 border-slate-500 bg-slate-700 p-2 text-indigo-300">
      <div className="group relative">
        <div className="bold text-xl underline">{props.name}</div>
        <span className="absolute right-0 top-0 scale-0 bg-green-400 p-2 text-xs text-white transition-all group-hover:scale-100">
          Tooltip
        </span>
      </div>
      <pre className="">{props.pre}</pre>
      <div className="mt-6 text-lg">{props.rate}</div>
    </div>
  );
};

export default BankCard;
