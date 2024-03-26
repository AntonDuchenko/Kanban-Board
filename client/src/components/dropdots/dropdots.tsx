import { useAppDispatch } from "../../app/hooks";
import * as boardsSlice from "../../features/boardsSlice";
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
import { deleteTask } from '../../api/tasks';
import { actions as editActions } from "../../features/editedTaskSlice";

interface Props {
  task: Task;
}

export const Dropdots: React.FC<Props> = ({ task }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handlerOnEditClick = () => {
    dispatch(editActions.setTask(task));
    toggleMenu();
  };

  const handlerOnDeleteClick = async () => {
    await deleteTask(task.id)
    await dispatch(boardsSlice.init())
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

      <TEDropdownMenu className="w-full">
        <TEDropdownItem>
          <button
            onClick={handlerOnEditClick}
            type="button"
            className="hover:bg-gray-100 dark:hover:bg-gray-600 w-full
              dark:hover:text-white flex items-center gap-2 px-4 py-2"
          >
            <img src={editIcon} alt="edit.svg" className="h-[16px]" />
            Edit
          </button>
        </TEDropdownItem>
        <TEDropdownItem>
          <button
            onClick={handlerOnDeleteClick}
            type="button"
            className="hover:bg-gray-10 flex items-center px-4 py-2 gap-2
               text-[#ff0000] hover:bg-gray-100 w-full"
          >
            <img src={deleteIcon} alt="delete.svg" className="h-[16px]" />
            Delete
          </button>
        </TEDropdownItem>
      </TEDropdownMenu>
    </TEDropdown>
  );
};
