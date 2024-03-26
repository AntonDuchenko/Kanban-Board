import { useContext, useEffect, useState } from "react";
import plusBlack from "../../assets/plus-black.svg";
import { DropDownDotsMenu } from "../DropDownDotsMenu/DropDownDotsMenu";
import { TaskCard } from "../TaskCard/TaskCard";
import classNames from "classnames";
import { updateBoard } from "../../api/boards";
import { useAppDispatch } from "../../app/hooks";
import * as boardsSlice from "../../features/boardsSlice";
import { BoardContext } from "../../context/board";

interface Props {
  board: Board;
}

export const TaskList: React.FC<Props> = ({ board }) => {
  const [newTitle, setNewTitle] = useState(board.title);
  const [tasks, setTasks] = useState<Task[]>([]);
  const dispatch = useAppDispatch();

  const { setIsCreateTask, setStatusId, setIsEditing, isEditing } = useContext(BoardContext);

  useEffect(() => setTasks(board.tasks), [board]);

  const handlerOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateBoard(+board.id, board.title, newTitle);
    setIsEditing(0);
    await dispatch(boardsSlice.init());
  };

  const handlerOnCreateClick = () => {
    setIsCreateTask(true);

    setStatusId(board.id);
  };

  const handlerOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewTitle(event.target.value);

  return (
    <div
      className="pt-5 flex flex-col gap-4 col-span-full 
    sm:col-span-2 xl:col-span-3 max-h-[700px] overflow-y-auto"
    >
      <div
        className="border-y-2 border-solid py-2 flex font-medium 
      text-lg justify-between items-center gap-2"
      >
        <p className={classNames({ hidden: isEditing === board.id })}>{board.title}</p>
        {isEditing === board.id && (
          <form className="max-w-[65%]" onSubmit={handlerOnSubmit}>
            <input
              onChange={handlerOnChangeTitle}
              onBlur={() => setIsEditing(0)}
              defaultValue={board.title}
              autoFocus
              type="text"
              className="p-1 border-slate-300 rounded-lg 
            focus:ring-0 focus:border-black focus:ring-black"
            />
          </form>
        )}
        <div className="flex gap-1 justify-center items-center">
          <p>{board.tasks.length}</p>
          <DropDownDotsMenu id={board.id} />
        </div>
      </div>
      <button
        onClick={handlerOnCreateClick}
        type="button"
        className="border-dashed border-2 border-dark flex transition-all 
      gap-2 justify-center items-center min-h-[40px] w-full rounded-lg hover:bg-slate-200"
      >
        <img src={plusBlack} alt="plus.svg" />
        Add new card
      </button>

      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
};
