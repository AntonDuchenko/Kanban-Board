import { useContext } from "react";
import historyLogo from "../../assets/history.svg";
import plusLogo from "../../assets/plus.svg";
import { BoardContext } from '../../context/board';

export const BoardHeader = () => {
  const { setIsOpen, setIsCreate, isOpen, isCreate } = useContext(BoardContext);

  return (
    <div className="h-[60px] flex justify-between py-[10px] border-b-black border-b">
      <h1 className="capitalize text-2xl sm:text-4xl font-bold">
        My task board
      </h1>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setIsOpen(true);
            console.log(isOpen);
          }}
          type="button"
          className="max-h-[40px] min-w-[50px] sm:min-w-[120px] border flex flex-row gap-1 justify-center items-center
          border-solid rounded-lg hover:bg-slate-200 transition-all"
        >
          <img src={historyLogo} alt="History-logo" />
          <span className="sm:block hidden">History</span>
        </button>
        <button
          onClick={() => {
            setIsCreate(true);
            console.log(isCreate);
          }}
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
