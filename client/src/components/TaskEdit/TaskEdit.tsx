import { useAppDispatch } from "../../app/hooks";
import closeIcon from "../../assets/close.svg";
import { actions as editActions } from "../../features/editedTask";

export const TaskEdit = () => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
  w-[90%] h-[90%] sm:w-[60%] sm:h-[80%] xl:w-[40%] z-50 rounded-xl bg-white overflow-y-auto"
    >
      <div className="bg-slate-600 w-full h-10 rounded-t-xl top-0 right-0">
        <button
          onClick={() => dispatch(editActions.removeTask())}
          type="button"
          className="flex absolute right-3 top-2.5"
        >
          <img src={closeIcon} alt="close.svg" className="h-[20px]" />
        </button>
      </div>

      <div>
        <form className="p-6">
          <div className="flex flex-col gap-6 mb-6">
            <div>
              <label
                htmlFor="task_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Task name
              </label>
              <input
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
