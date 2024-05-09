import { useContext, useEffect, useState } from "react";
import {
  TEInput,
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
import { createBoard, deleteBoard } from "../../api/boards";
import { CreateButton } from "../CreateButton/CreateButton";
import { Link } from "react-router-dom";

export const BurgerMenu = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(BoardContext);
  const [isCreateBoard, setIsCreateBoard] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(boardsSlice.init(user?.id!));
  }, [user]);

  const boards = useAppSelector((state) => state.boards.boards);

  const handlerOnCreateClick = () => {
    setIsCreateBoard(true);
  };

  const handlerOnSubmit = async () => {
    await createBoard(newBoardTitle, user?.id!);
    setNewBoardTitle("");
    setIsCreateBoard(false);

    dispatch(boardsSlice.init(user?.id!));
  };

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
        <TEModalContent className="p-2">
          <TEModalHeader className="mb-2 !p-3">
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
          <CreateButton
            handlerOnCreateClick={handlerOnCreateClick}
            title="Create new board"
            classNames="mb-3"
          />
          {isCreateBoard && (
            <form onSubmit={handlerOnSubmit} className="mb-3">
              <TEInput
                value={newBoardTitle}
                autoFocus
                className="min-w-[80%]"
                onChange={(e) => setNewBoardTitle(e.target.value)}
                onBlur={() => setIsCreateBoard(false)}
                type="text"
                id="exampleFormControlInputText"
                label="Board name"
              />
            </form>
          )}
          {/* <!--Modal body--> */}
          <TEModalBody className="flex flex-col gap-3 !p-0">
            {boards.map((board) => (
              <div
                key={board.id}
                className="border border-solid border-dark flex justify-between items-center
      rounded-lg w-full pl-3 hover:bg-slate-200 transition-all text-xl min-h-[50px]"
              >
                <Link
                  to={`/board/${board.id}`}
                  className="w-full text-start h-[48px] items-center flex"
                  onClick={() => {
                    dispatch(boardsSlice.setActiveBoard(board));
                    setIsMenuOpen(false);
                  }}
                  type="button"
                >
                  {board.title}
                </Link>
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
                      dispatch(boardsSlice.init(user?.id!));
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
