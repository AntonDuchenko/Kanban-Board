import { useContext, useState } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
  TEInput,
} from "tw-elements-react";
import { BoardContext } from "../../context/board";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import { createStatus} from "../../api/statuses";
import { toastSuccess } from "../../utils/toastSuccess";
import * as statusesSlice from "../../features/statusesSlice";
import { toastError } from "../../utils/toastError";

export default function ModalToCreate(): JSX.Element {
  const { isCreate, setIsCreate } = useContext(BoardContext);

  const [title, setTitle] = useState("");
  const activeBoard = useAppSelector((state) => state.boards.activeBoard);

  const handlerOnCreateClick = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const dispatch = useAppDispatch();

  const handlerOnSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const newBoard = await createStatus(title, activeBoard?.id!);
      toastSuccess(`${newBoard.title} board created!`);
      setIsCreate(false);
      dispatch(statusesSlice.init(activeBoard?.id!));
      setTitle("");
    } catch (error) {
      toastError(`${error}`);
    }
  };

  const handlerOnCloseClick = () => setIsCreate(false);

  return (
    <div>
      <TEModal show={isCreate} setShow={setIsCreate}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Status name
              </h5>

              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={handlerOnCloseClick}
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

            <TEModalBody>
              <form onSubmit={handlerOnSubmit}>
                <div className="p-4">
                  <TEInput
                    autoFocus
                    onChange={handlerOnCreateClick}
                    required
                    type="text"
                    id="exampleFormControlInputText"
                    label="Status name"
                  ></TEInput>
                </div>
              </form>
            </TEModalBody>

            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block bg-stale-200 px-6 pb-2 pt-2.5 mr-3
                  text-xs font-medium uppercase leading-normal border rounded-lg
                   transition duration-150 ease-in-out 
                   hover:bg-slate-200 focus:bg-slate-200 
                  focus:outline-none focus:ring-0 active:bg-slate-200"
                  onClick={handlerOnCloseClick}
                >
                  Close
                </button>
              </TERipple>

              <TERipple rippleColor="light">
                <button
                  onClick={handlerOnSubmit}
                  type="button"
                  className="text-white bg-slate-500 hover:bg-slate-700 
            focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm w-full sm:w-auto 
            px-10 py-2.5 text-center"
                >
                  Create status
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}
