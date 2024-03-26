import { useAppDispatch } from "../../app/hooks";
import * as boardsSlice from "../../features/boardsSlice";
import editIcon from "../../assets/edit.svg";
import plusBlackIcon from "../../assets/plus-black.svg";
import deleteIcon from "../../assets/delete.svg";
import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
  TERipple,
} from "tw-elements-react";
import { useContext } from "react";
import { BoardContext } from "../../context/board";
import { deleteBoard } from '../../api/boards';

interface Props {
  board: Status;
}

export const DropDownDotsMenu: React.FC<Props> = ({ board }) => {
  const dispatch = useAppDispatch();

  const { setIsCreateTask, setStatus, setIsEditing } = useContext(BoardContext);

  const handlerOnEditClick = () => {
    setIsEditing(board.id);
  };

  const handlerOnDeleteClick = async () => {
    try {
      await deleteBoard(+board.id);

      dispatch(boardsSlice.init());
    } catch (error) {}
  };

  const handlerOnCreateClick = () => {
    setIsCreateTask(true);
    setStatus(board);
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

      <TEDropdownMenu className="w-full !min-w-[200px]">
        <TEDropdownItem>
          <button
            onClick={handlerOnEditClick}
            type="button"
            className="hover:bg-gray-300 w-full
              bg-gray-200 flex items-center gap-2 px-4 py-2"
          >
            <img src={editIcon} alt="edit.svg" className="h-[16px]" />
            Edit
          </button>
        </TEDropdownItem>
        <TEDropdownItem>
          <button
            onClick={handlerOnCreateClick}
            type="button"
            className="hover:bg-gray-300 dark:hover:bg-gray-600 w-full
            bg-gray-200 flex items-center gap-2 px-4 py-2"
          >
            <img
              src={plusBlackIcon}
              alt="plus-black.svg"
              className="h-[16px]"
            />
            Add new card
          </button>
        </TEDropdownItem>
        <TEDropdownItem>
          <button
            onClick={handlerOnDeleteClick}
            type="button"
            className="hover:bg-gray-300 flex items-center px-4 py-2 gap-2
               text-[#ff0000] w-full bg-gray-200"
          >
            <img src={deleteIcon} alt="delete.svg" className="h-[16px]" />
            Delete
          </button>
        </TEDropdownItem>
      </TEDropdownMenu>
    </TEDropdown>
  );
};
