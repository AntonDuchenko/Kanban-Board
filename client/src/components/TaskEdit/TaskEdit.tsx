import { useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { formatDateCalendar } from "../../utils/formateDateCalendar";
import { updateTask } from "../../api/tasks";
import { formateDateToDB } from "../../utils/formateDateToDB";
import { createHistory } from "../../api/history";
import { toastSuccess } from "../../utils/toastSuccess";
import { actions as editActions } from "../../features/editedTaskSlice";
import * as statusesSlice from "../../features/statusesSlice";
import { toastError } from "../../utils/toastError";
import { SelectData } from 'tw-elements-react/dist/types/forms/Select/types';

export const TaskEdit = () => {
  const dispatch = useAppDispatch();
  const editingTask = useAppSelector((state) => state.editedTask) as Task;
  const activeBoard = useAppSelector((state) => state.boards.activeBoard);

  const removeEditingTask = () => dispatch(editActions.removeTask());

  const data = [
    { text: "Low", value: 1 },
    { text: "Medium", value: 2 },
    { text: "High", value: 3 },
  ];

  const [newName, setNewName] = useState(editingTask.name);
  const [newDescription, setNewDescription] = useState(editingTask.description);
  const [newDueDate, setNewDueDate] = useState(
    formatDateCalendar(editingTask.dueDate as string)
  );
  const [newPriority, setNewPriority] = useState(editingTask.priority);

  const handlerOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewName(event.target.value);

  const handlerOnChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => setNewDescription(event.target.value);

  const handlerOnChangeDPriority = (
    event: SelectData[] | SelectData
  ) => {
    setNewPriority(Array.isArray(event) ? event[0].text! : event.text!);
  };

  const handlerOnChangeDueDate = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewDueDate(event.target.value);

  const handlerOnSubmit = async () => {
    try {
      await updateTask(editingTask.id, {
        name: newName,
        description: newDescription,
        dueDate: formateDateToDB(newDueDate),
        priority: newPriority,
      });

      if (editingTask.name !== newName) {
        await createHistory(editingTask.id, {
          action: "Change name",
          description: [
            `${editingTask.name}`,
            `${editingTask.name}`,
            `${newName}`,
          ],
          createAt: new Date().toISOString(),
        });
      }

      if (editingTask.priority !== newPriority) {
        await createHistory(editingTask.id, {
          action: "Change priority",
          description: [
            `${editingTask.name}`,
            `${editingTask.priority}`,
            `${newPriority}`,
          ],
          createAt: new Date().toISOString(),
        });
      }
      toastSuccess(`Task ${editingTask.name} was updated!`);

      dispatch(editActions.removeTask());
      await dispatch(statusesSlice.init(activeBoard?.id!));
    } catch (error) {
      toastError(`${error}`);
    }
  };

  return (
    <div>
      {/* <!-- Modal --> */}
      <TEModal show={!!editingTask} setShow={removeEditingTask}>
        <TEModalDialog className="!max-w-[40%] !h-[80%] mb-7">
          <TEModalContent className="!h-full">
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-bold leading-normal text-neutral-800 dark:text-neutral-200">
                Edit Task
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={removeEditingTask}
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
            <TEModalBody className="overflow-y-auto">
              <div>
                <form onSubmit={handlerOnSubmit}>
                  <div className="flex flex-col gap-6 mb-6">
                    <TEInput
                      value={newName}
                      required
                      onChange={handlerOnChangeName}
                      type="text"
                      id="exampleFormControlInputText"
                      label="Task name"
                      className=""
                    ></TEInput>

                    <TETextarea
                      value={newDescription}
                      className="resize-none"
                      onChange={handlerOnChangeDescription}
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
                        onChange={handlerOnChangeDueDate}
                        value={newDueDate}
                        type="date"
                        id="due_date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 
                text-sm rounded-lg focus:ring-black focus:border-black 
                block marker:w-[220px] p-2.5"
                        required
                      />
                    </div>

                    <div className="relative">
                      <TESelect
                        defaultValue={newPriority}
                        onValueChange={handlerOnChangeDPriority}
                        onChange={handlerOnChangeDPriority}
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
                  onClick={removeEditingTask}
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
                  Save changes
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
};
