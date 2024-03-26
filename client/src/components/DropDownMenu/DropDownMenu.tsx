import { createHistory } from '../../api/history';
import { updateTask } from "../../api/tasks";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import * as boardsSlice from "../../features/boardsSlice";
import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
  TERipple,
} from "tw-elements-react";

interface Props {
  task: Task;
}

export const DropDownMenu: React.FC<Props> = ({ task }) => {
  const boards = useAppSelector((state) => state.boards.boards);
  const dispatch = useAppDispatch();

  const prevStatus = boards.find(board => board.id === task.statusId);

  const handlerOnChangeStatus = async (board: Board) => {
    await updateTask(task.id, { statusId: board.id });

    createHistory(task.id, {
      action: "Change status",
      description: [`${task.name}`, `${prevStatus?.title}`, `${board.title}`],
      createAt: new Date().toISOString(),
    });

    await dispatch(boardsSlice.init());
  };

  return (
    <TEDropdown>
      <TERipple rippleColor="light" className="w-full">
        <TEDropdownToggle
          className="flex items-center justify-between whitespace-nowrap rounded 
      bg-gray-300
      px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 
      ease-in-out hover:bg-gray-400
      focus:bg-gray-400
      focus:outline-none focus:ring-0 active:bg-gray-400 
      motion-reduce:transition-none w-full"
        >
          Move to:
          <span className="ml-2 [&>svg]:w-5 w-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </TEDropdownToggle>
      </TERipple>

      <TEDropdownMenu className="w-full">
        {boards.map((board) => (
          <TEDropdownItem
            className="bg-gray-300 divide-y divide-gray-100"
            key={board.id}
          >
            <button
              onClick={() => handlerOnChangeStatus(board)}
              type="button"
              className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent 
          px-4 py-2 text-sm text-left font-normal pointer-events-auto
          hover:bg-gray-400 active:text-neutral-800 active:bg-neutral-100 
          focus:bg-gray-400 focus:text-neutral-800 focus:outline-none active:no-underline"
            >
              {board.title}
            </button>
          </TEDropdownItem>
        ))}
      </TEDropdownMenu>
    </TEDropdown>
  );
};
