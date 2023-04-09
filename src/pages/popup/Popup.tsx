import { BeakerIcon } from "@heroicons/react/24/solid";
import "@pages/popup/Popup.css";
import _ from "lodash";

const Popup = () => {
  const closeAll = () => {
    chrome.tabs.query({}, (tabs) => {
      _.forEach(tabs, (tab: chrome.tabs.Tab) => {
        if (tab.active) {
          chrome.tabs.update(tab.id, { url: "chrome://newtab" });
        } else {
          chrome.tabs.remove(tab.id);
        }
      });
    });
  };

  return (
    <div className="">
      <header className="border-b border-black p-2">
        <h1 className="text-2xl text-slate-800">Taby</h1>
      </header>
      <div className="flex h-80">
        <div className="flex w-10 flex-col items-center border-r-2 border-black px-2">
          <button
            className="m-1 h-8 w-8 rounded bg-slate-400 px-1 py-0.5 text-slate-800"
            onClick={closeAll}
          >
            <BeakerIcon />
          </button>
          <button
            className="m-1 h-8 w-8 rounded bg-slate-400 px-1 py-0.5 text-slate-800"
            onClick={closeAll}
          >
            <BeakerIcon />
          </button>
        </div>
        <main className="w-60"></main>
      </div>
    </div>
  );
};

export default Popup;
