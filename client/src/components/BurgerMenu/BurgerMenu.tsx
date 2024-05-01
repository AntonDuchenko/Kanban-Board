import { useContext } from "react";
import {
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
  TEModalHeader,
} from "tw-elements-react";
import { BoardContext } from "../../context/board";

export const BurgerMenu = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(BoardContext);
  console.log(isMenuOpen);
  
  return (
    <TEModal show={isMenuOpen} setShow={setIsMenuOpen}>
      <TEModalDialog
        position="top-right"
        className="transition-all !right-0 sm:!right-7"
        theme={{
          show: "translate-x-0 opacity-100",
          hidden: "translate-x-[100%] opacity-0",
        }}
      >
        <TEModalContent>
          <TEModalHeader>
            {/* <!--Modal title--> */}
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
              Your boards
            </h5>
            {/* <!--Close button--> */}
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
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
          <TEModalBody>Modal body text goes here.</TEModalBody>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
};
