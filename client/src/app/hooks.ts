import { useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { updateTask } from '../api/tasks';
import * as statusesSlice from '../features/statusesSlice';

export const useOnDragEnd = () => {
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.statuses.statuses);
  const activeBoard = useAppSelector((state) => state.boards.activeBoard);

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const { destination, source } = result;

      const sourceStatusId = source.droppableId;
      const destinationStatusId = destination?.droppableId;

      if (!destination) {
        return;
      }

      if (
        destinationStatusId === sourceStatusId &&
        destination.index === source.index
      ) {
        return;
      }

      if (destinationStatusId !== sourceStatusId) {
        const foundSourceColumnIndex = columns.findIndex(
          (col) => col.id === +sourceStatusId
        );

        const foundDestinationColumnIndex = columns.findIndex(
          (col) => col.id === +destinationStatusId!
        );

        const sourceColumn = columns[foundSourceColumnIndex];
        const destinationColumn = columns[foundDestinationColumnIndex];

        const sourceTasks = Array.from(sourceColumn.tasks!);
        const destinationTasks = Array.from(destinationColumn.tasks!);

        const [removed] = sourceTasks.splice(source.index, 1);

        destinationTasks.splice(destination.index, 0, removed);

        await updateTask(+removed.id, { statusId: +destinationStatusId! });
        dispatch(statusesSlice.init(activeBoard?.id!));
      }
    },
    [dispatch, columns, activeBoard]
  );

  return onDragEnd;
};
