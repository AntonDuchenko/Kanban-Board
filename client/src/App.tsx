import { DragDropContext } from "react-beautiful-dnd";
import { BoardPage } from "./pages/Board";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import { ToastContainer } from "react-toastify";
import { useOnDragEnd } from './app/hooks';

function App() {
  const onDragEnd = useOnDragEnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container m-auto px-1 h-svh">
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/board" element={<BoardPage />} />
          </Routes>
        </HashRouter>
        <ToastContainer newestOnTop />
      </div>
    </DragDropContext>
  );
}

export default App;
