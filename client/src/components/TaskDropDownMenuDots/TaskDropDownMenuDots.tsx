import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { actions as editActions } from "../../features/editedTaskSlice";
import classNames from "classnames";
import { deleteTask } from '../../api/tasks';
import * as boardsSlice from '../../features/boardsSlice';

interface Props {
  task: Task;
}

export const TaskDropDownMenuDots: React.FC<Props> = ({ task }) => {
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
    <>
      <button
        id={`dropdownMenuIconButton-task-${task.id}`}
        data-dropdown-toggle={`dropdownDots-task-${task.id}`}
        className="inline-flex items-center p-2 text-sm 
        font-medium text-center text-gray-900 bg-white 
        rounded-lg hover:bg-gray-100 focus:ring-4 
        focus:outline-none dark:text-white 
        focus:ring-gray-50 dark:bg-gray-800 
        dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
        onClick={toggleMenu}
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
      </button>

      {/* <!-- Dropdown menu --> */}
      <div
        id={`dropdownDots-task-${task.id}`}
        className={classNames(
          "z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 border-gray-300 border",
          {
            hidden: !menuOpen,
          }
        )}
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby={`dropdownMenuIconButton-task-${task.id}`}
        >
          <li>
            <button
              onClick={handlerOnEditClick}
              type="button"
              className="hover:bg-gray-100 dark:hover:bg-gray-600 w-full
              dark:hover:text-white flex items-center gap-2 px-4 py-2"
            >
              <img src={editIcon} alt="edit.svg" className="h-[16px]" />
              Edit
            </button>
          </li>
          <li>
            <button
              onClick={handlerOnDeleteClick}
              type="button"
              className="hover:bg-gray-10 flex items-center px-4 py-2 gap-2
               text-[#ff0000] hover:bg-gray-100 w-full"
            >
              <img src={deleteIcon} alt="delete.svg" className="h-[16px]" />
              Delete
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
