import { DragDropContext } from "react-beautiful-dnd";
import { BoardPage } from "./pages/Board";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import { ToastContainer } from "react-toastify";
import { useOnDragEnd } from "./app/hooks";
import { useAppSelector } from "./app/reduxHooks";

function App() {
  const onDragEnd = useOnDragEnd();
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const activeBoard = useAppSelector((state) => state.boards.activeBoard);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container m-auto px-1 h-svh">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate to={activeBoard ? `/board/${activeBoard.id}` : "/board"} />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route
              path="/board"
              element={isAuth ? <BoardPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/board/:boardId?"
              element={isAuth ? <BoardPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </HashRouter>
        <ToastContainer newestOnTop />
      </div>
    </DragDropContext>
  );
}

export default App;
