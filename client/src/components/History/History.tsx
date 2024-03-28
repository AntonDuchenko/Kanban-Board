import { useContext, useEffect, useState } from "react";
import {
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
} from "tw-elements-react";
import { BoardContext } from '../../context/board';
import { getHistory } from '../../api/history';
import { HistoryItem } from '../HistoryItem/HistoryItem';

export default function History(): JSX.Element {
  const { setIsOpen, isOpen } = useContext(BoardContext);
  const [history, setHistory] = useState<Action[]>([]);

  useEffect(() => {
    getHistory().then(setHistory);
  }, []);

  return (
    <>
      {/* <!-- Modal --> */}
      <TEModal show={isOpen} setShow={setIsOpen} scrollable>
        <TEModalDialog position="top-right" className="!mt-0 !right-0 !h-[100vh]">
          <TEModalContent className="h-full">
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                History
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setIsOpen(false)}
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
            {/* <!--Modal body--> */}
            <TEModalBody>
              <div>
                <ol className="list-disc p-4 flex flex-col gap-3 max-h-screen">
                  {history.map((action) => (
                    <HistoryItem key={action.createAt} action={action} />
                  ))}
                </ol>
              </div>
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </>
  );
}
