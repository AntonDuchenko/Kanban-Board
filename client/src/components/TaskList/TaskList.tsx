import { useContext, useEffect, useState } from "react";
import plusBlack from "../../assets/plus-black.svg";
import { DropDownDotsMenu } from "../DropDownDotsMenu/DropDownDotsMenu";
import { TaskCard } from "../TaskCard/TaskCard";
import classNames from "classnames";
import { updateStatus } from "../../api/statuses";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import * as statusesSlice from "../../features/statusesSlice";
import { BoardContext } from "../../context/board";
import { toastSuccess } from "../../utils/toastSuccess";
import { toastError } from "../../utils/toastError";
import { TEInput } from "tw-elements-react";

interface Props {
  board: Status;
}

export const TaskList: React.FC<Props> = ({ board }) => {
  const [newTitle, setNewTitle] = useState(board.title);
  const [tasks, setTasks] = useState<Task[]>([]);
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector((state) => state.boards.activeBoard);

  const { setIsCreateTask, setStatus, setIsEditing, isEditing } =
    useContext(BoardContext);

  useEffect(() => setTasks(board.tasks || []), [board]);

  const handlerOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      await updateStatus(+board.id, newTitle);
      setIsEditing(0);
      toastSuccess(`${board.title} was updated!`);
      await dispatch(statusesSlice.init(activeBoard?.id!));
    } catch (error) {
      toastError(`${error}`);
    }
  };

  const handlerOnCreateClick = () => {
    setIsCreateTask(true);

    setStatus(board);
  };

  const handlerOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewTitle(event.target.value);

  return (
    <div
      className="pt-5 flex flex-col gap-4 col-span-full 
    sm:col-span-3 lg:col-span-2 xl:col-span-3 max-h-[700px] overflow-y-auto"
    >
      <div
        className="border-y-2 border-solid p-2 flex font-medium 
      text-lg justify-between items-center gap-2"
      >
        <p className={classNames({ hidden: isEditing === board.id })}>
          {board.title}
        </p>
        {isEditing === board.id && (
          <form className="max-w-[70%]" onSubmit={handlerOnSubmit}>
            <TEInput
              value={newTitle}
              autoFocus
              onChange={handlerOnChangeTitle}
              onBlur={() => setIsEditing(0)}
              type="text"
              id="exampleFormControlInputText"
              label="Task name"
            ></TEInput>
          </form>
        )}
        <div className="flex gap-1 justify-center items-center">
          <p>{board.tasks?.length}</p>
          <DropDownDotsMenu board={board} />
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
