import React from "react";
import historyLogo from "../../assets/history.svg";
import plusLogo from "../../assets/plus.svg";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BoardHeader: React.FC<Props> = ({ setIsOpen }) => {
  return (
    <div className="h-[60px] flex justify-between py-[10px] border-b-black border-b">
      <h1 className="capitalize text-2xl sm:text-4xl font-bold">
        My task board
      </h1>
      <div className="flex gap-2">
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="max-h-[40px] min-w-[50px] sm:min-w-[120px] border flex flex-row gap-1 justify-center items-center
          border-solid rounded-lg hover:bg-slate-200 transition-all"
        >
          <img src={historyLogo} alt="History-logo" />
          <span className="sm:block hidden">History</span>
        </button>
        <button
          type="button"
          className="max-h-[40px] min-w-[50px] sm:min-w-[180px] w-full border flex flex-row gap-1 justify-center items-center
          border-solid rounded-lg bg-slate-600 text-white hover:bg-slate-800 transition-all"
        >
          <img src={plusLogo} alt="History-logo" className="h-[20px]" />
          <span className="hidden sm:block">Create new list</span>
        </button>
      </div>
    </div>
  );
};
