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
      <header className="p-2 border-b border-black">
        <h1 className="text-2xl text-slate-800">Taby</h1>
      </header>
      <div className="flex h-80">
        <div className="flex flex-col w-10 px-2 items-center border-r-2 border-black">
          <button
            className="px-1 py-0.5 m-1 w-8 h-8 text-slate-800 rounded bg-slate-400"
            onClick={closeAll}
          >
            <BeakerIcon />
          </button>
          <button
            className="px-1 py-0.5 m-1 w-8 h-8 text-slate-800 rounded bg-slate-400"
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
