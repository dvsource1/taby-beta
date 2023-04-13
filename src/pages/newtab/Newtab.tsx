import '@pages/newtab/Newtab.css';
import BankInfo from '../../components/BankInfo';
import BinanceP2P from '../../components/BinanceP2P';

const Newtab = () => {
  const handleScroll = (e) => {
    console.log(e);
  };

  return (
    <div>
      <main
        className="flex h-screen w-fit flex-col bg-[#181A20] py-2"
        onScroll={handleScroll}
      >
        <BankInfo />
        <BinanceP2P />
      </main>
    </div>
  );
};

export default Newtab;
