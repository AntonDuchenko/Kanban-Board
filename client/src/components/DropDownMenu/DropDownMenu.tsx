interface Props {
  id: number;
}

export const DropDownMenu: React.FC<Props> = ({ id }) => {
  return (
    <div className="relative inline-block">
      <button
        id={`dropdownDefaultButton-${id}`}
        data-dropdown-toggle={`dropdown-${id}`}
        className="justify-between bg-gray-300 hover:bg-gray-400 
        focus:outline-none transition-all font-medium w-full
        rounded-lg px-3 py-2 text-center inline-flex items-center"
        type="button"
      >
        Move to:
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id={`dropdown-${id}`}
        className="z-10 hidden bg-gray-300 divide-y divide-gray-100 w-full
        rounded-lg shadow absolute left-0 mt-2"
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby={`dropdownDefaultButton-${id}`}
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-400"
            >
              To Do
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-400"
            >
              Planned
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-400"
            >
              In Progress
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-400"
            >
              Closed
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
