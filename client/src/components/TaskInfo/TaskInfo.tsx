import { useEffect, useState } from "react";
import {
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
} from "tw-elements-react";
import { TaskActivity } from "../TaskActivity/TaskActivity";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { actions as taskActions } from "../../features/choosedTaskSlice";
import { getHistoryByTaskId } from "../../api/history";
import { actions as editActions } from "../../features/editedTaskSlice";

import editIcon from "../../assets/edit.svg";
import statusIcon from "../../assets/status.svg";
import priorityIcon from "../../assets/priority.svg";
import calendarGrayIcon from "../../assets/calendar-gray.svg";
import { formatDate } from "../../utils/formateDate";

export default function TaskInfo(): JSX.Element {
  const dispatch = useAppDispatch();
  const removeChangedTask = () => dispatch(taskActions.removeTask());

  const task = useAppSelector((state) => state.choosedTask) as Task;
  const [taskHistory, setTaskHistory] = useState<Action[]>([]);

  useEffect(() => {
    getHistoryByTaskId(task.id).then(setTaskHistory);
  }, []);

  const handlerOnClick = () => {
    dispatch(editActions.setTask(task));

    removeChangedTask();
  };

  return (
    <div>
      {/* <!-- Modal --> */}
      <TEModal show={!!task} setShow={removeChangedTask}>
        <TEModalDialog className="!max-w-[60%] !h-[80%] mb-7">
          <TEModalContent className="!h-full">
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-bold leading-normal text-neutral-800 dark:text-neutral-200">
                {task.name}
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={removeChangedTask}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody className="!p-0 overflow-auto">
              <div className="flex rounded-b-lg h-full flex-col lg:flex-row">
                <div className="w-full p-7 flex flex-col gap-6 lg:w-[60%]">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-3 max-w-[350px] w-full">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center w-[50%]">
                          <img
                            src={statusIcon}
                            alt="status.svg"
                            className="h-[20px]"
                          />
                          <span className="text-gray-400">Status</span>
                        </div>
                        <span className="font-semibold w-[50%]">
                          {task.status.title}
                        </span>
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
                        <span className="font-semibold w-[50%]">
                          {formatDate(task.dueDate as string)}
                        </span>
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
                        <span className="font-semibold w-[50%]">
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handlerOnClick}
                      type="button"
                      className="flex gap-2 items-center border 
            border-solid rounded-lg px-3 py-1 h-[40px]"
                    >
                      <img src={editIcon} alt="edit.svg" className="h-[18px]" />
                      Edit task
                    </button>
                  </div>

                  <div className="">
                    <div className="font-bold text-lg mb-3">Description</div>
                    <p className="text-gray-400">{task.description}</p>
                  </div>
                </div>

                <div
                  className="w-full h-fill bg-slate-200 rounded-b-lg 
        p-7 flex flex-col gap-3 sm:rounded-b-none sm:rounded-br-lg lg:w-[40%]"
                >
                  <div className="font-semibold text-xl">Activity</div>
                  <div className="text-gray-500">
                    <TaskActivity taskHistory={taskHistory} />
                  </div>
                </div>
              </div>
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}
