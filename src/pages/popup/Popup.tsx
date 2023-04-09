import {
  ArrowDownOnSquareIcon,
  ArrowUpOnSquareIcon,
  BeakerIcon,
} from "@heroicons/react/24/solid";
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

  const moveTabDown = async () => {
    enum WindowPosion {
      TOP,
      BOTTOM,
    }
    const displays = await chrome.system.display.getInfo();
    if (displays.length !== 2) {
      return;
    }

    console.log(displays);
    const windows = await chrome.windows.getAll();
    console.log(windows);
    const screenToWindowsMap = new Map<
      chrome.system.display.DisplayInfo,
      any[]
    >();
    _.forEach(windows, (window) => {
      const { top: x, left: y, width: w, height: h } = window;
      const centerX = x + w / 2;
      const centerY = y + h / 2;
      const screen = _.find(displays, (display) => {
        const { top, left, height, width } = display.bounds;
        return (
          _.inRange(centerX, left, left + width) &&
          _.inRange(centerY, top, top + height)
        );
      });
      if (!_.isNil(screen)) {
        if (!screenToWindowsMap.has(screen)) {
          screenToWindowsMap.set(screen, []);
        }
        screenToWindowsMap.get(screen).push({ ...window, centerX, centerY });
      }
    });
    console.log(screenToWindowsMap);
  };

  const moveTabUp = () => {};

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
            onClick={moveTabDown}
          >
            <ArrowDownOnSquareIcon />
          </button>
          <button
            className="m-1 h-8 w-8 rounded bg-slate-400 px-1 py-0.5 text-slate-800"
            onClick={moveTabUp}
          >
            <ArrowUpOnSquareIcon />
          </button>
        </div>
        <main className="w-60"></main>
      </div>
    </div>
  );
};

export default Popup;
