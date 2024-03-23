import { useState } from "react";
import { useAppSelector } from '../app/hooks';
import { Board } from '../components/Board/Board';
import { BoardHeader } from '../components/BoardHeader/BoardHeader';
import { TaskInfo } from '../components/TaskInfo/TaskInfo';
import { TaskEdit } from '../components/TaskEdit/TaskEdit';
import { History } from '../components/History/History';

export const BoardPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const choosedTask = useAppSelector((state) => state.choosedTask);
  const editedTask = useAppSelector((state) => state.editedTask);

  return (
    <div>
      {(isOpen || choosedTask || editedTask) && (
        <div
          className="fixed top-0 left-0 w-full h-full
      bg-black opacity-50 z-10"
        ></div>
      )}

      <div className="container m-auto px-1">
        <BoardHeader setIsOpen={setIsOpen} />
        <Board />
        {choosedTask && <TaskInfo />}
        {editedTask && <TaskEdit />}
      </div>

      {isOpen && <History setIsOpen={setIsOpen} />}
    </div>
  );
};
