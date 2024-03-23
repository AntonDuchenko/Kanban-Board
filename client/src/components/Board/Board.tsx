import { TaskList } from "../TaskList/TaskList";

export const Board = () => {
  return (
    <div className="xl:grid-cols-12 sm:grid-cols-6 
    grid grid-cols-1 gap-3">
      <TaskList id="1" />
      <TaskList id="2" />
      <TaskList id="3" />
      <TaskList id="4" />
      <TaskList id="5" />
    </div>
  );
};
