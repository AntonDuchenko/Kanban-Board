import { DropDownMenu } from "../DropDownMenu/DropDownMenu";
import calendar from "../../assets/calendar.svg";
import { useAppDispatch } from "../../app/hooks";
import { actions as taskActions } from "../../features/choosedTaskSlice";
import { TaskDropDownMenuDots } from '../TaskDropDownMenuDots/TaskDropDownMenuDots';

interface Props {
  id: string;
}

export const TaskCard: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();

  return (
    <section className="border-solid border-2 rounded-lg flex flex-col gap-4 p-3">
      <div className="flex justify-between items-center">
        <button
          onClick={() =>
            dispatch(
              taskActions.setTask({
                id: 1,
                name: "string",
                description: "string",
                status: "string",
                dueDate: new Date(),
                priority: "string",
                createdAt: 12,
                updatedAt: 12,
              })
            )
          }
          type="button"
          className="font-medium text-lg"
        >
          Task name
        </button>
        <TaskDropDownMenuDots id={`task-${id}`} />
      </div>
      <p className="text-slate-400 font-medium text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem.
      </p>
      <div className="text-slate-400 font-medium text-lg flex gap-2">
        <img src={calendar} alt="calendar.svg" />
        Wed, 19 Apr
      </div>
      <p
        className="rounded-full bg-gray-200 text-slate-400 px-[10px] py-[2px] 
    w-fit flex justify-center items-center gap-2"
      >
        <span className="relative flex h-3 w-3">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full 
        bg-slate-400 opacity-75"
          ></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-400"></span>
        </span>
        Medium
      </p>

      <DropDownMenu id={id} />
    </section>
  );
};
