import closeIcon from "../../assets/close.svg";
import editIcon from "../../assets/edit.svg";
import dotIcon from "../../assets/dot.svg";
import statusIcon from "../../assets/status.svg";
import priorityIcon from "../../assets/priority.svg";
import calendarGrayIcon from "../../assets/calendar-gray.svg";
import { useAppDispatch } from "../../app/hooks";
import { actions as taskActions } from "../../features/choosedTaskSlice";
import { actions as editActions } from "../../features/editedTask";

export const TaskInfo = () => {
  const dispatch = useAppDispatch();

  const handlerOnClick = () => {
    dispatch(
      editActions.setTask({
        id: 1,
        name: "string",
        description: "string",
        status: "string",
        dueDate: new Date(),
        priority: "string",
        createdAt: 12,
        updatedAt: 12,
      })
    );

    dispatch(
      taskActions.removeTask()
    );
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      w-[90%] h-[90%] sm:w-[80%] sm:h-[80%] xl:w-[70%] z-50 rounded-xl bg-white overflow-y-auto"
    >
      <div className="bg-slate-600 w-full h-10 rounded-t-xl absolute top-0 right-0">
        <button
          onClick={() => dispatch(taskActions.removeTask())}
          type="button"
          className="flex absolute right-3 top-2.5"
        >
          <img src={closeIcon} alt="close.svg" className="h-[20px]" />
        </button>
      </div>

      <div className="flex rounded-b-lg h-full pt-10 flex-col lg:flex-row">
        <div className="w-full p-7 flex flex-col gap-6 lg:w-[60%]">
          <div className="flex justify-between font-bold items-center">
            <div className="text-2xl">Task name</div>
            <button
              onClick={handlerOnClick}
              type="button"
              className="flex gap-2 items-center border 
            border-solid rounded-lg px-3 py-1"
            >
              <img src={editIcon} alt="edit.svg" className="h-[18px]" />
              Edit task
            </button>
          </div>

          <div className="flex flex-col gap-3 max-w-[350px]">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center w-[50%]">
                <img src={statusIcon} alt="status.svg" className="h-[20px]" />
                <span className="text-gray-400">Status</span>
              </div>
              <span className="font-semibold w-[50%]">In progress</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center w-[50%]">
                <img
                  src={calendarGrayIcon}
                  alt="calendar.svg"
                  className="h-[20px]"
                />
                <span className="text-gray-400 ">Due date</span>
              </div>
              <span className="font-semibold w-[50%]">Wed, 29 April</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center w-[50%]">
                <img
                  src={priorityIcon}
                  alt="priorityIcon"
                  className="h-[20px]"
                />
                <span className="text-gray-400">Proirity</span>
              </div>
              <span className="font-semibold w-[50%]">Low</span>
            </div>
          </div>

          <div className="">
            <div className="font-bold text-lg mb-3">Description</div>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              culpa commodi labore quae laudantium rem perspiciatis nostrum eos
              ut laboriosam.
            </p>
          </div>
        </div>

        <div
          className="w-full h-full bg-slate-200 rounded-b-lg 
        p-7 flex flex-col gap-3 sm:rounded-br-lg lg:w-[40%]"
        >
          <div className="font-semibold text-xl">Activity</div>
          <div className="text-gray-500">
            <ul className="">
              <li className="flex justify-between ">
                <div className="flex">
                  <img src={dotIcon} alt="dot.svg" className="h-[25px]" />
                  <span>You create this task</span>
                </div>
                <span className="text-right">Mar 5 at 5:10 pm</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
