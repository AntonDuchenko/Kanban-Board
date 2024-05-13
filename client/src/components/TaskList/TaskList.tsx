import { useContext, useEffect, useState } from "react";
import { DropDownDotsMenu } from "../DropDownDotsMenu/DropDownDotsMenu";
import { TaskCard } from "../TaskCard/TaskCard";
import classNames from "classnames";
import { updateStatus } from "../../api/statuses";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import * as statusesSlice from "../../features/statusesSlice";
import { BoardContext } from "../../context/board";
import { toastSuccess } from "../../utils/toastSuccess";
import { toastError } from "../../utils/toastError";
import { TEInput } from "tw-elements-react";
import { Droppable } from "react-beautiful-dnd";
import { CreateButton } from '../CreateButton/CreateButton';

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

  const handlerOnCloseClick = () => setIsEditing(0);

  return (
    <div
      className="pt-5 flex flex-col gap-4 col-span-full min-h-[200px]
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
          <form onSubmit={handlerOnSubmit}>
            <TEInput
              value={newTitle}
              autoFocus
              onChange={handlerOnChangeTitle}
              onBlur={handlerOnCloseClick}
              type="text"
              id="exampleFormControlInputText"
              label="Task name"
            />
          </form>
        )}

        <div className="flex gap-1 justify-center items-center h-[39px]">
          <p>{board.tasks?.length}</p>
          <DropDownDotsMenu board={board} />
        </div>
      </div>
      <CreateButton handlerOnCreateClick={handlerOnCreateClick} title="Create task" />

      <Droppable droppableId={board.id.toString()}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-4 h-svh"
          >
            {tasks.map((task, index) => (
              <TaskCard task={task} key={task.id} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
