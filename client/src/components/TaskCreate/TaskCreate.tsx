import { useContext, useState } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
  TEInput,
  TETextarea,
  TESelect,
} from "tw-elements-react";
import { BoardContext } from "../../context/board";
import { createTask } from "../../api/tasks";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import { createHistory } from "../../api/history";
import { toastSuccess } from "../../utils/toastSuccess";
import * as statusesSlice from "../../features/statusesSlice";
import { toastError } from "../../utils/toastError";
import { SelectData } from 'tw-elements-react/dist/types/forms/Select/types';

export default function TaskCreate(): JSX.Element {
  const { setIsCreateTask, isCreateTask, status, setStatus } =
    useContext(BoardContext);
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector((state) => state.boards.activeBoard);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const data = [
    { text: "Low", value: 1 },
    { text: "Medium", value: 2 },
    { text: "High", value: 3 },
  ];

  const handlerOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const handlerOnChangeDesc = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(event.target.value);

  const handlerOnChangeDate = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDueDate(event.target.value);

  const handlerOnChangePriority = (
    event: SelectData[] | SelectData
  ) => setPriority(Array.isArray(event) ? event[0].text! : event.text!);

  const handlerOnSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      event.preventDefault();

      const createdTask = await createTask({
        name,
        description,
        dueDate: new Date(dueDate).toISOString(),
        priority,
        statusId: status?.id as number,
      });

      createHistory(createdTask.id, {
        action: "Added",
        description: [`${createdTask.name}`, `${status?.title}`],
        createAt: new Date().toISOString(),
      });

      toastSuccess(`${createdTask.name} task created!`);

      setIsCreateTask(false);
      await dispatch(statusesSlice.init(activeBoard?.id!));
      setStatus(null);
    } catch (error) {
      toastError(`${error}`);
    }
  };

  const handlerOnCloseClick = () => setIsCreateTask(false);

  return (
    <div>
      <TEModal show={isCreateTask} setShow={setIsCreateTask}>
        <TEModalDialog className="sm:!max-w-[40%] sm:!h-[80%] sm:mb-7">
          <TEModalContent className="!h-full">
            <TEModalHeader>
              <h5 className="text-xl font-bold leading-normal text-neutral-800 dark:text-neutral-200">
                Task creating
              </h5>

              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={handlerOnCloseClick}
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

            <TEModalBody className="overflow-y-auto">
              <div>
                <form>
                  <div className="flex flex-col gap-6 mb-6">
                      <TEInput
                        required
                        onChange={handlerOnChangeName}
                        type="text"
                        id="exampleFormControlInputText"
                        label="Task name"
                        className=""
                      ></TEInput>

                      <TETextarea
                        className="resize-none"
                        onChange={handlerOnChangeDesc}
                        id="textareaExample"
                        label="Description"
                        rows={4}
                      ></TETextarea>

                    <div>
                      <label
                        htmlFor="due_date"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Due date
                      </label>
                      <input
                        onChange={handlerOnChangeDate}
                        type="date"
                        id="due_date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 
                text-sm rounded-lg focus:ring-black focus:border-black 
                block w-[220px] p-2.5"
                        required
                      />
                    </div>

                    <div className="relative">
                      <TESelect
                        defaultValue={priority}
                        onValueChange={handlerOnChangePriority}
                        data={data}
                        label="Priority"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </TEModalBody>

            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="text-white bg-slate-600 hover:bg-slate-800 
                  focus:ring-4 focus:outline-none focus:ring-blue-300 
                  font-medium rounded-lg text-sm w-full sm:w-auto 
                  px-10 py-2.5 text-center mr-2"
                  onClick={handlerOnCloseClick}
                >
                  Close
                </button>
              </TERipple>

              <TERipple rippleColor="light">
                <button
                  onClick={handlerOnSubmit}
                  type="button"
                  className="text-white bg-slate-500 hover:bg-slate-700 
            focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm w-full sm:w-auto 
            px-10 py-2.5 text-center"
                >
                  Create task
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}
