import { useAppSelector } from "../../app/reduxHooks";
import { TaskList } from "../TaskList/TaskList";

export const Board = () => {
  const statuses = useAppSelector((state) => state.statuses.statuses);

  return (
    <div
      className="xl:grid-cols-12 sm:grid-cols-6 
    grid grid-cols-1 gap-3"
    >
      {statuses.map((board) => (
        <TaskList board={board} key={board.id} />
      ))}
    </div>
  );
};
