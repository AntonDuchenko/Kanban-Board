import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Board } from "../components/Board/Board";
import { BoardHeader } from "../components/BoardHeader/BoardHeader";
import * as statusesSlice from "../features/statusesSlice";
import { BoardContext } from "../context/board";
import { ToastContainer } from "react-toastify";
import TaskCreate from '../components/TaskCreate/TaskCreate';
import ModalToCreate from '../components/ModalToCreate/ModalToCreate';
import TaskInfo from '../components/TaskInfo/TaskInfo';
import { TaskEdit } from '../components/TaskEdit/TaskEdit';
import History from '../components/History/History';
import { BurgerMenu } from '../components/BurgerMenu/BurgerMenu';

export const BoardPage = () => {
  const { isCreateTask, isOpen, isCreate, isMenuOpen } = useContext(BoardContext);

  const choosedTask = useAppSelector((state) => state.choosedTask);
  const editedTask = useAppSelector((state) => state.editedTask);

  return (
    <>
      <div>
        <div className="container m-auto px-1 h-svh">
          <BoardHeader />
          <Board />
        </div>

        {isMenuOpen && <BurgerMenu />}
        {isCreateTask && <TaskCreate />}
        {isCreate && <ModalToCreate />}
        {choosedTask && <TaskInfo />}
        {editedTask && <TaskEdit />}
        {isOpen && <History />}
      </div>
      <ToastContainer newestOnTop/>
    </>
  );
};
