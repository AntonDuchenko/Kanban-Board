import { useContext, useState } from "react";
import closeIcon from "../../assets/close.svg";
import { BoardContext } from "../../context/board";
import { createTask } from "../../api/tasks";
import { useAppDispatch } from "../../app/hooks";
import * as boardsSlice from "../../features/boardsSlice";
import { createHistory } from '../../api/history';

export const TaskCreate = () => {
  const { setIsCreateTask, status, setStatus } = useContext(BoardContext);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const handlerOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const handlerOnChangeDesc = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(event.target.value);

  const handlerOnChangeDate = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDueDate(event.target.value);

  const handlerOnChangePriority = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => setPriority(event.target.value);

  const handlerOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    setIsCreateTask(false);
    await dispatch(boardsSlice.init());
    setStatus(null);
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
  w-[90%] h-[90%] sm:w-[60%] sm:h-[80%] xl:w-[40%] z-50 rounded-xl bg-white overflow-y-auto"
    >
      <div className="bg-slate-600 w-full h-10 rounded-t-xl top-0 right-0">
        <button
          onClick={() => setIsCreateTask(false)}
          type="button"
          className="flex absolute right-3 top-2.5"
        >
          <img src={closeIcon} alt="close.svg" className="h-[20px]" />
        </button>
      </div>

      <div className="p-6">
        <h3 className="mb-6 font-bold text-2xl">Create Task</h3>
        <form onSubmit={handlerOnSubmit}>
          <div className="flex flex-col gap-6 mb-6">
            <div>
              <label
                htmlFor="task_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Task name
              </label>
              <input
                onChange={handlerOnChangeName}
                type="text"
                id="task_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 
                text-sm rounded-lg focus:ring-black focus:border-black 
                block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                onChange={handlerOnChangeDesc}
                id="description"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 
                bg-gray-50 rounded-lg border border-gray-300 focus:ring-black
                 focus:border-black resize-none"
              ></textarea>
            </div>

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
                block w-full p-2.5"
                required
              />
            </div>

            <div className="">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Priority
              </label>
              <select
                defaultValue={priority}
                onChange={handlerOnChangePriority}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 
                text-sm rounded-lg focus:ring-black focus:border-black block 
                w-full p-2.5"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-slate-600 hover:bg-slate-800 
            focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm w-full sm:w-auto 
            px-10 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
