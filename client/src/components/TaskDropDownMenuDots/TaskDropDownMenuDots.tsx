import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import * as statusesSlice from "../../features/statusesSlice";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
  TERipple,
} from "tw-elements-react";
import { useState } from "react";
import { deleteTask } from "../../api/tasks";
import { actions as editActions } from "../../features/editedTaskSlice";
import { createHistory } from "../../api/history";
import { getStatusById } from "../../api/statuses";
import { toastSuccess } from "../../utils/toastSuccess";
import { toastError } from "../../utils/toastError";

interface Props {
  task: Task;
}

export const TaskDropDownMenuDots: React.FC<Props> = ({ task }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector((state) => state.boards.activeBoard);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handlerOnEditClick = () => {
    dispatch(editActions.setTask(task));
    toggleMenu();
  };

  const handlerOnDeleteClick = async () => {
    try {
      await deleteTask(task.id);
      const board = await getStatusById(task.statusId);
      await createHistory(task.id, {
        action: "Deleted",
        description: [`${task.name}`, `${board.title}`],
        createAt: new Date().toISOString(),
      });
      toastSuccess(`Task ${task.name} deleted!`);
      await dispatch(statusesSlice.init(activeBoard?.id!));
    } catch (error) {
      toastError(`${error}`);
    }
  };

  return (
    <TEDropdown>
      <TERipple rippleColor="light" className="w-full">
        <TEDropdownToggle
          className="inline-flex items-center p-2 text-sm 
        font-medium text-center text-gray-900 bg-white 
        rounded-lg hover:bg-gray-100 
        focus:outline-none"
          type="button"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </TEDropdownToggle>
      </TERipple>

      <TEDropdownMenu className="w-full !min-w-[150px]">
        <TEDropdownItem>
          <button
            onClick={handlerOnEditClick}
            type="button"
            className="hover:bg-gray-300 bg-gray-200 w-full
              flex items-center gap-2 px-4 py-2"
          >
            <img src={editIcon} alt="edit.svg" className="h-[16px]" />
            Edit
          </button>
        </TEDropdownItem>
        <TEDropdownItem>
          <button
            onClick={handlerOnDeleteClick}
            type="button"
            className="hover:bg-gray-300 bg-gray-200 flex items-center px-4 py-2 gap-2
               text-[#ff0000] w-full"
          >
            <img src={deleteIcon} alt="delete.svg" className="h-[16px]" />
            Delete
          </button>
        </TEDropdownItem>
      </TEDropdownMenu>
    </TEDropdown>
  );
};
