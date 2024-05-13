import { useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import { updateTask } from "../api/tasks";
import * as statusesSlice from "../features/statusesSlice";
import { AppDispatch } from "./store";
import { toastSuccess } from "../utils/toastSuccess";
import { toastError } from "../utils/toastError";
import { useAppSelector } from './reduxHooks';

export const useOnDragEnd = (columns: Status[], dispatch: AppDispatch) => {
  const activeBoard = useAppSelector(state => state.boards.activeBoard);

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

        const newColumns = Array.from(columns);

        newColumns[foundSourceColumnIndex] = {
          ...sourceColumn,
          tasks: sourceTasks,
        };

        newColumns[foundDestinationColumnIndex] = {
          ...destinationColumn,
          tasks: destinationTasks,
        };

        dispatch(statusesSlice.updateStatuses(newColumns));

        try {
          await updateTask(+removed.id, { statusId: +destinationStatusId! });
          toastSuccess(`Status of task ${removed.name} was updated`);
        } catch (error) {
          toastError("Something went wrong");
        }

        dispatch(statusesSlice.init(activeBoard?.id!));
      }
    },
    [dispatch, columns]
  );

  return onDragEnd;
};
