import { useContext } from "react";
import { useAppSelector } from "../app/reduxHooks";
import { Board } from "../components/Board/Board";
import { BoardHeader } from "../components/BoardHeader/BoardHeader";
import { BoardContext } from "../context/board";
import TaskCreate from "../components/TaskCreate/TaskCreate";
import ModalToCreate from "../components/ModalToCreate/ModalToCreate";
import TaskInfo from "../components/TaskInfo/TaskInfo";
import { TaskEdit } from "../components/TaskEdit/TaskEdit";
import History from "../components/History/History";
import { BurgerMenu } from "../components/BurgerMenu/BurgerMenu";

export const BoardPage = () => {
  const { isCreateTask, isOpen, isCreate, isMenuOpen } =
    useContext(BoardContext);

  const choosedTask = useAppSelector((state) => state.choosedTask);
  const editedTask = useAppSelector((state) => state.editedTask);

  return (
    <div>
      <BoardHeader />
      <Board />

      {isMenuOpen && <BurgerMenu />}
      {isCreateTask && <TaskCreate />}
      {isCreate && <ModalToCreate />}
      {choosedTask && <TaskInfo />}
      {editedTask && <TaskEdit />}
      {isOpen && <History />}
    </div>
  );
};
