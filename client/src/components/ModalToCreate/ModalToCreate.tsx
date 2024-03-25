import { useContext, useState } from "react";
import { createBoard } from "../../api/boards";
import closeIcon from "../../assets/close.svg";
import { useAppDispatch } from "../../app/hooks";
import * as boardsSlice from "../../features/boardsSlice";
import { BoardContext } from "../../context/board";

export const ModalToCreate = () => {
  const [title, setTitle] = useState("");
  const handlerOnCreateClick = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const dispatch = useAppDispatch();
  const { setIsCreate } = useContext(BoardContext);

  const handlerOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createBoard(title);
    setIsCreate(false);
    await dispatch(boardsSlice.init());
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
  w-[90%] h-[185px] sm:w-[60%] xl:w-[40%] z-50 rounded-xl bg-white overflow-y-auto"
    >
      <div className="bg-slate-600 w-full h-10 rounded-t-xl absolute top-0 right-0">
        <button
          onClick={() => setIsCreate(false)}
          type="button"
          className="flex absolute right-3 top-2.5"
        >
          <img src={closeIcon} alt="close.svg" className="h-[20px]" />
        </button>
      </div>
      <form className="pt-9" onSubmit={handlerOnSubmit}>
        <div className="p-4">
          <label
            htmlFor="task_name"
            className="block mb-3 font-medium text-gray-900 text-xl"
          >
            Board name
          </label>
          <input
            onChange={handlerOnCreateClick}
            autoFocus
            type="text"
            placeholder="Type board name"
            id="task_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 
                text-sm rounded-lg focus:ring-black focus:border-black 
                block w-full p-2.5"
            required
          />
        </div>
      </form>
    </div>
  );
};
