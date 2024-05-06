import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { BoardPage } from "./pages/Board";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from './app/hooks';
import { updateTask } from './api/tasks';
import * as statusesSlice from './features/statusesSlice';

function App() {
  const columns = useAppSelector((state) => state.statuses.statuses);
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector((state) => state.boards.activeBoard);

  const onDragEnd = async (result: DropResult) => {
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

    // if (
    //   destinationStatusId === sourceStatusId &&
    //   destination.index !== source.index
    // ) {
    //   const foundColumnIndex = columns.findIndex(
    //     (col) => col.id === +sourceStatusId
    //   );

    //   const foundColumn = columns[foundColumnIndex];
    //   const tasks = Array.from(foundColumn.tasks!);
    //   const [removed] = tasks.splice(source.index, 1);

    //   tasks.splice(destination.index, 0, removed);

    //   const newColumns = Array.from(columns);

    //   newColumns[foundColumnIndex] = { ...foundColumn, tasks };

    //   dispatch(statusesSlice.actions.setStatuses(newColumns));
    // }

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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardPage />
    </DragDropContext>
  );
}

export default App;
