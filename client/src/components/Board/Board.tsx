import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import { TaskList } from "../TaskList/TaskList";
import * as statusesSlice from "../../features/statusesSlice";
import { useParams } from "react-router-dom";

export const Board = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  useEffect(() => {
    if (!boardId) return;

    dispatch(statusesSlice.init(+boardId));
  }, [boardId]);

  const statuses = useAppSelector((state) => state.statuses.statuses);  

  return (
    <div
      className="xl:grid-cols-12 sm:grid-cols-6 
    grid grid-cols-1 gap-3"
    >
      {statuses.map((board) => (
        <TaskList board={board} key={board.id} />
      ))}
    </div>
  );
};
