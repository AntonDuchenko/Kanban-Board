import record from "../../assets/record.svg";
import { formatDateLog } from "../../utils/formateDateLog";

interface Props {
  action: Action;
}

export const HistoryItem: React.FC<Props> = ({ action }) => {
  return (
    <li className="text-gray-500">
      {action.action === "Added" && (
        <>
          <p className="mb-2">
            You added{" "}
            <span>
              <img
                src={record}
                alt="record.svg"
                className="inline-block mr-1"
              />
              <span className="text-black font-semibold">
                {action.description[0]}
              </span>
            </span>{" "}
            to the{" "}
            <span className="font-semibold">{action.description[1]}</span>
          </p>
          <i>{formatDateLog(action.createAt)}</i>
        </>
      )}

      {action.action === "Change status" && (
        <>
          <p className="mb-2">
            You moved{" "}
            <span>
              <img
                src={record}
                alt="record.svg"
                className="inline-block mr-1"
              />
              <span className="text-black font-semibold">
                {action.description[0]}
              </span>
            </span>{" "}
            from <span className="font-semibold">{action.description[1]}</span>{" "}
            to <span className="font-semibold">{action.description[2]}</span>
          </p>
          <i>{formatDateLog(action.createAt)}</i>
        </>
      )}

      {action.action === "Change name" && (
        <>
          <p className="mb-2">
            You renamed{" "}
            <span>
              <img
                src={record}
                alt="record.svg"
                className="inline-block mr-1"
              />
              <span className="text-black font-semibold">
                {action.description[1]}
              </span>
            </span>{" "}
            to{" "}
            <span>
              <img
                src={record}
                alt="record.svg"
                className="inline-block mr-1"
              />
              <span className="font-semibold text-black">
                {action.description[2]}
              </span>
            </span>
          </p>
          <i>{formatDateLog(action.createAt)}</i>
        </>
      )}

      {action.action === "Change priority" && (
        <>
          <p className="mb-2">
            You changed the priority{" "}
            <span>
              <img
                src={record}
                alt="record.svg"
                className="inline-block mr-1"
              />
              <span className="text-black font-semibold">
                {action.description[0]}
              </span>
            </span>{" "}
            from{" "}
            <span>
              <img
                src={record}
                alt="record.svg"
                className="inline-block mr-1"
              />
              <span className="font-semibold text-black">
                {action.description[1]}
              </span>
            </span>
            {" "}to{" "}
            <span>
              <img
                src={record}
                alt="record.svg"
                className="inline-block mr-1"
              />
              <span className="font-semibold text-black">
                {action.description[2]}
              </span>
            </span>
          </p>
          <i>{formatDateLog(action.createAt)}</i>
        </>
      )}

      {action.action === "Deleted" && (
        <>
          <p className="mb-2">
            You deleted{" "}
            <span>
              <img
                src={record}
                alt="record.svg"
                className="inline-block mr-1"
              />
              <span className="text-black font-semibold">
                {action.description[0]}
              </span>
            </span>{" "}
            from{" "}
            <span className="font-semibold">{action.description[1]}</span>
          </p>
          <i>{formatDateLog(action.createAt)}</i>
        </>
      )}
    </li>
  );
};
