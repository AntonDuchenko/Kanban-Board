import { useAppSelector } from "../app/reduxHooks";
import { Board } from "../components/Board/Board";
import { BoardHeader } from "../components/BoardHeader/BoardHeader";
import TaskCreate from "../components/TaskCreate/TaskCreate";
import ModalToCreate from "../components/ModalToCreate/ModalToCreate";
import TaskInfo from "../components/TaskInfo/TaskInfo";
import { TaskEdit } from "../components/TaskEdit/TaskEdit";
import History from "../components/History/History";
import { BurgerMenu } from "../components/BurgerMenu/BurgerMenu";

export const BoardPage = () => {
  const choosedTask = useAppSelector((state) => state.choosedTask);
  const editedTask = useAppSelector((state) => state.editedTask);

  return (
    <div>
      <BoardHeader />
      <Board />

      <BurgerMenu />
      <TaskCreate />
      <ModalToCreate />
      {choosedTask && <TaskInfo />}
      {editedTask && <TaskEdit />}
      <History />
    </div>
  );
};
