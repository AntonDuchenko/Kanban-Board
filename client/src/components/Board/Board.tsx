import { useAppSelector } from "../../app/hooks";
import { TaskList } from "../TaskList/TaskList";

export const Board = () => {
  const boards = useAppSelector((state) => state.boards.boards);

  return (
    <div
      className="xl:grid-cols-12 sm:grid-cols-6 
    grid grid-cols-1 gap-3"
    >
      {boards.map((board) => (
        <TaskList board={board} key={board.id}/>
      ))}
    </div>
  );
};
