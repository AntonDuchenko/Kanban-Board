import { useContext } from "react";
import closeIcon from "../../assets/close.svg";
import { HistoryItem } from "../HistoryItem/HistoryItem";
import { getTasks } from '../../api/tasks';
import { BoardContext } from '../../context/board';

export const History = () => {
  const { setIsOpen } = useContext(BoardContext);

  const handlerOnclick = async () => {
    setIsOpen(false);
    try {
      await getTasks().then(res => console.log(res))
    } catch (error) {
      
    };
  }

  return (
    <div
      className="w-[320px] absolute top-0 right-0 shadow-md bg-gray-100 h-screen 
    translate-x-0 transition-all z-50"
    >
      <div className="bg-slate-700 flex justify-between items-center p-5">
        <h3 className="text-white text-xl font-semibold">History</h3>
        <button className="text-white" onClick={handlerOnclick}>
          <img src={closeIcon} alt="close.svg" />
        </button>
      </div>
      <div className="p-5">
        <ol className="list-disc p-5 flex flex-col gap-3">
          <HistoryItem />
          <HistoryItem />
          <HistoryItem />
        </ol>
      </div>
    </div>
  );
};
