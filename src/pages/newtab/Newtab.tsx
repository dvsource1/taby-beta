import "@pages/newtab/Newtab.css";
import BinanceP2P from "./BinanceP2P";

const Newtab = () => {
  const handleScroll = (e) => {
    console.log(e);
  };

  return (
    <div>
      <main
        className="h-screen w-fit bg-slate-800 py-2"
        onScroll={handleScroll}
      >
        <BinanceP2P />
      </main>
    </div>
  );
};

export default Newtab;
