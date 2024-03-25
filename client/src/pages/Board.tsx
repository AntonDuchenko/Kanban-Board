import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Board } from "../components/Board/Board";
import { BoardHeader } from "../components/BoardHeader/BoardHeader";
import { TaskInfo } from "../components/TaskInfo/TaskInfo";
import { TaskEdit } from "../components/TaskEdit/TaskEdit";
import { History } from "../components/History/History";
import * as boardsSlice from "../features/boardsSlice";
import { ModalToCreate } from "../components/ModalToCreate/ModalToCreate";
import { TaskCreate } from "../components/TaskCreate/TaskCreate";
import { BoardContext } from "../context/board";

export const BoardPage = () => {
  const { isCreateTask, isOpen, isCreate } = useContext(BoardContext);

  const dispatch = useAppDispatch();
  const choosedTask = useAppSelector((state) => state.choosedTask);
  const editedTask = useAppSelector((state) => state.editedTask);

  const isModalOpen =
    isOpen || !!choosedTask || !!editedTask || isCreate || isCreateTask;

  useEffect(() => {
    dispatch(boardsSlice.init());
  }, []);

  return (
    <div>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full
      bg-black opacity-50 z-10"
        ></div>
      )}

      <div className="container m-auto px-1 h-svh">
        <BoardHeader />
        <Board />
      </div>

      {choosedTask && <TaskInfo />}
      {editedTask && <TaskEdit />}
      {isOpen && <History />}
      {isCreateTask && <TaskCreate />}
      {isCreate && <ModalToCreate />}
    </div>
  );
};
