import { DropDownMenu } from "../DropDownMenu/DropDownMenu";
import calendar from "../../assets/calendar.svg";
import { useAppDispatch } from "../../app/hooks";
import { actions as taskActions } from "../../features/choosedTaskSlice";
import { TaskDropDownMenuDots } from "../TaskDropDownMenuDots/TaskDropDownMenuDots";
import { formatDate } from "../../utils/formateDate";
import { getTaskById } from "../../api/tasks";
import classNames from "classnames";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  task: Task;
  index: number;
}

export const TaskCard: React.FC<Props> = ({ task, index }) => {
  const dispatch = useAppDispatch();

  const handlerOnNameClick = async () => {
    const choosedTask = await getTaskById(task.id);

    dispatch(taskActions.setTask(choosedTask));
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <section
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="border-solid border-2 rounded-lg flex flex-col gap-4 p-3"
        >
          <div className="flex justify-between items-center">
            <button
              onClick={handlerOnNameClick}
              type="button"
              className="font-medium text-lg"
            >
              {task.name}
            </button>
            <TaskDropDownMenuDots task={task} />
          </div>
          <p className="text-slate-400 font-medium text-sm">
            {task.description}
          </p>
          <div className="text-slate-400 font-medium text-lg flex gap-2">
            <img src={calendar} alt="calendar.svg" />
            {formatDate(task.dueDate as string)}
          </div>
          <p
            className={classNames(
              "rounded-full bg-gray-200 px-[10px] py-[2px]",
              "w-fit flex justify-center items-center gap-2 font-medium",
              { "text-red-600": task.priority === "High" },
              { "text-yellow-400": task.priority === "Medium" },
              { "text-lime-500": task.priority === "Low" }
            )}
          >
            <span className="relative flex h-3 w-3">
              <span
                className={classNames(
                  "animate-ping absolute inline-flex rounded-full",
                  "opacity-75 h-full w-full",
                  { "bg-red-400": task.priority === "High" },
                  { "bg-yellow-300": task.priority === "Medium" },
                  { "bg-lime-400": task.priority === "Low" }
                )}
              ></span>
              <span
                className={classNames(
                  "relative inline-flex rounded-full h-3 w-3",
                  { "bg-red-600": task.priority === "High" },
                  { "bg-yellow-400": task.priority === "Medium" },
                  { "bg-lime-500": task.priority === "Low" }
                )}
              ></span>
            </span>
            {task.priority}
          </p>

          <DropDownMenu task={task} />
        </section>
      )}
    </Draggable>
  );
};
