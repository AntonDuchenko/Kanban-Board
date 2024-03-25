import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import plusBlackIcon from "../../assets/plus-black.svg";
import { useContext, useState } from "react";
import classNames from "classnames";
import { deleteBoard } from "../../api/boards";
import { useAppDispatch } from "../../app/hooks";
import * as boardsSlice from "../../features/boardsSlice";
import { BoardContext } from '../../context/board';

interface Props {
  id: number;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DropDownDotsMenu: React.FC<Props> = ({ id, setIsEditing }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { setIsCreateTask, setStatusId } = useContext(BoardContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handlerOnEditClick = () => {
    setIsEditing(true);
    toggleMenu();
  };

  const handlerOnDeleteClick = async () => {
    try {
      await deleteBoard(+id);

      dispatch(boardsSlice.init());
    } catch (error) {}
  };

  const handlerOnCreateClick = () => {
    setIsCreateTask(true);
    toggleMenu();
    setStatusId(id);
  }

  return (
    <>
      <button
        onClick={toggleMenu}
        id={`dropdownMenuIconButton-list-${id}`}
        data-dropdown-toggle={`dropdownDots-list-${id}`}
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
      </button>

      {/* <!-- Dropdown menu --> */}
      <div
        id={`dropdownDots-list-${id}`}
        className={classNames(
          "z-10 bg-white divide-y divide-gray-100 rounded-lg",
          "shadow w-44 border-gray-300 border",
          {
            hidden: !menuOpen,
          }
        )}
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby={`dropdownMenuIconButton-list-${id}`}
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
              onClick={handlerOnCreateClick}
              type="button"
              className="hover:bg-gray-100 flex items-center px-4 py-2 gap-2 w-full"
            >
              <img
                src={plusBlackIcon}
                alt="plus-black.svg"
                className="h-[16px]"
              />
              Add new card
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
