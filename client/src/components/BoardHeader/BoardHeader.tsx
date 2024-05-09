import { useContext } from "react";
import historyLogo from "../../assets/history.svg";
import plusLogo from "../../assets/plus.svg";
import burgerMenu from "../../assets/burger-menu.svg";
import { BoardContext } from "../../context/board";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import { useNavigate } from 'react-router-dom';
import * as boardsSlice from '../../features/boardsSlice';
import * as statusesSlice from '../../features/statusesSlice';

export const BoardHeader = () => {
  const { setIsOpen, setIsCreate, setIsMenuOpen } = useContext(BoardContext);
  const activeBoard = useAppSelector((state) => state.boards.activeBoard);
  const navigat = useNavigate();
  const dispatch = useAppDispatch();  

  return (
    <div className="h-[60px] flex justify-between py-[10px] border-b-black border-b">
      <h1 className="capitalize text-2xl sm:text-4xl font-bold">
        {activeBoard?.title || "Select a board"}
      </h1>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          type="button"
          className="max-h-[40px] min-w-[50px] sm:min-w-[120px] border flex flex-row gap-1 justify-center items-center
          border-solid rounded-lg hover:bg-slate-200 transition-all"
        >
          <img src={historyLogo} alt="History-logo" />
          <span className="sm:block hidden">History</span>
        </button>

        <button
          onClick={() => {
            setIsCreate(true);
          }}
          type="button"
          className="max-h-[40px] min-w-[50px] sm:min-w-[180px] w-full border flex flex-row gap-1 justify-center items-center
          border-solid rounded-lg bg-slate-600 text-white hover:bg-slate-800 transition-all"
        >
          <img src={plusLogo} alt="History-logo" className="h-[20px]" />
          <span className="hidden sm:block">Create new status</span>
        </button>

        <button
          onClick={() => {
            setIsMenuOpen(true);
          }}
          type="button"
          className="border border-solid sm:min-w-[150px] w-full rounded-lg flex gap-1 justify-center items-center hover:bg-slate-200 transition-all px-1"
        >
          <span className="sm:block hidden">Your boards</span>
          <img src={burgerMenu} alt="burger-menu" className="h-[25px]" />
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("userToken");
            localStorage.removeItem("active_board");
            dispatch(boardsSlice.removeActiveBoard());
            dispatch(statusesSlice.removeStatuses());
            navigat("/login");
          }}
          type="button"
          className="inline-block rounded-lg bg-info px-6 pb-2 pt-2.5 text-xs 
        uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] 
        transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] 
        focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 
        active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] 
        dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] 
        dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] 
        dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
