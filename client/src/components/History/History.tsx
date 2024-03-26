import { useContext, useEffect, useState } from "react";
import closeIcon from "../../assets/close.svg";
import { HistoryItem } from "../HistoryItem/HistoryItem";
import { getTasks } from "../../api/tasks";
import { BoardContext } from "../../context/board";
import { getHistory } from "../../api/history";

export const History = () => {
  const { setIsOpen } = useContext(BoardContext);
  const [history, setHistory] = useState<Action[]>([]);

  useEffect(() => {
    getHistory().then(setHistory);
  }, []);

  const handlerOnclick = async () => {
    setIsOpen(false);
    try {
      await getTasks().then((res) => console.log(res));
    } catch (error) {}
  };

  return (
    <div
      className="w-[320px] absolute top-0 right-0 shadow-md bg-gray-100
    translate-x-0 transition-all z-50 h-[100vh] overflow-y-auto"
    >
      <div className="bg-slate-700 flex justify-between items-center p-5">
        <h3 className="text-white text-xl font-semibold">History</h3>
        <button className="text-white" onClick={handlerOnclick}>
          <img src={closeIcon} alt="close.svg" />
        </button>
      </div>
      <div className="p-4">
        <ol className="list-disc p-4 flex flex-col gap-3 max-h-screen">
          {history.map((action) => (
            <HistoryItem key={action.createAt} action={action} />
          ))}
        </ol>
      </div>
    </div>
  );
};
