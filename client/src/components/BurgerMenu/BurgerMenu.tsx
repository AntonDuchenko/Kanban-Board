import { useContext, useEffect } from "react";
import {
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
  TEModalHeader,
} from "tw-elements-react";
import { BoardContext } from "../../context/board";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import * as boardsSlice from "../../features/boardsSlice";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import * as statusesSlice from "../../features/statusesSlice";
import { deleteBoard } from '../../api/boards';

export const BurgerMenu = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(BoardContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(boardsSlice.init());
  }, []);

  const boards = useAppSelector((state) => state.boards.boards);

  return (
    <TEModal show={isMenuOpen} setShow={setIsMenuOpen}>
      <TEModalDialog
        position="top-right"
        className="transition-all !right-0 sm:!right-7"
        theme={{
          show: "translate-x-0 opacity-100",
          hidden: "translate-x-[100%] opacity-0",
        }}
      >
        <TEModalContent>
          <TEModalHeader>
            {/* <!--Modal title--> */}
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
              Your boards
            </h5>
            {/* <!--Close button--> */}
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
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
          <TEModalBody className="flex flex-col gap-3">
            {boards.map((board) => (
              <div
                key={board.id}
                className="border border-solid border-dark flex justify-between items-center
      rounded-lg w-full pl-3 hover:bg-slate-200 transition-all text-xl min-h-[50px]"
              >
                <button
                  className="w-full text-start h-[48px]"
                  onClick={() => {
                    dispatch(statusesSlice.init(board.id));
                    dispatch(boardsSlice.setActiveBoard(board));
                    setIsMenuOpen(false);
                  }}
                  type="button"
                >
                  {board.title}
                </button>
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="hover:bg-slate-400 transition-all p-3 rounded-lg"
                  >
                    <img src={editIcon} alt="edit-icon" className="w-[35px]" />
                  </button>
                  <button
                    onClick={async () => {
                      await deleteBoard(board.id);
                      dispatch(boardsSlice.init());
                    }}
                    type="button"
                    className="hover:bg-slate-400 transition-all p-3 rounded-lg"
                  >
                    <img
                      src={deleteIcon}
                      alt="delete-icon"
                      className="w-[35px]"
                    />
                  </button>
                </div>
              </div>
            ))}
          </TEModalBody>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
};
