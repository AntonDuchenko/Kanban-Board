import { formatDateLog } from "../../utils/formateDateLog";
import record from "../../assets/record.svg";

interface Props {
  taskHistory: Action[];
}

export const TaskActivity: React.FC<Props> = ({ taskHistory }) => {
  return (
    <ol className="list-disc">
      {taskHistory.map((action) => {
        switch (action.action) {
          case "Added":
            return (
              <li className="p-2" key={action.createAt}>
                <div className="flex justify-between">
                  <div className="flex">
                    <span>You create this task</span>
                  </div>
                  <span className="text-right">
                    {formatDateLog(action.createAt.toString())}
                  </span>
                </div>
              </li>
            );

          case "Change status":
            return (
              <li className="p-2" key={action.createAt}>
                <div className="flex justify-between">
                  <div className="max-w-[270px]">
                    <span>You change status</span> from{" "}
                    <span className="text-black font-semibold">
                      <img
                        src={record}
                        alt="record.svg"
                        className="inline-block mr-1"
                      />
                      {action.description[1]}
                    </span>{" "}
                    to{" "}
                    <span className="text-black font-semibold">
                      <img
                        src={record}
                        alt="record.svg"
                        className="inline-block mr-1"
                      />
                      {action.description[2]}
                    </span>
                  </div>
                  <span className="text-right">
                    {formatDateLog(action.createAt.toString())}
                  </span>
                </div>
              </li>
            );

          case "Change name":
            return (
              <li className="p-2" key={action.createAt}>
                <div className="flex justify-between">
                  <div className="max-w-[280px]">
                    <span>You rename this task</span> from{" "}
                    <span className="text-black font-semibold">
                      <img
                        src={record}
                        alt="record.svg"
                        className="inline-block mr-1"
                      />
                      {action.description[1]}
                    </span>{" "}
                    to{" "}
                    <span className="text-black font-semibold">
                      <img
                        src={record}
                        alt="record.svg"
                        className="inline-block mr-1"
                      />
                      {action.description[2]}
                    </span>
                  </div>
                  <span className="text-right">
                    {formatDateLog(action.createAt.toString())}
                  </span>
                </div>
              </li>
            );

          case "Change priority":
            return (
              <li className="p-2" key={action.createAt}>
                <div className="flex justify-between">
                  <div className="max-w-[280px]">
                    <span>You priority this task</span> from{" "}
                    <span className="text-black font-semibold">
                      <img
                        src={record}
                        alt="record.svg"
                        className="inline-block mr-1"
                      />
                      {action.description[1]}
                    </span>{" "}
                    to{" "}
                    <span className="text-black font-semibold">
                      <img
                        src={record}
                        alt="record.svg"
                        className="inline-block mr-1"
                      />
                      {action.description[2]}
                    </span>
                  </div>
                  <span className="text-right">
                    {formatDateLog(action.createAt.toString())}
                  </span>
                </div>
              </li>
            );

          default:
            break;
        }
      })}
    </ol>
  );
};
