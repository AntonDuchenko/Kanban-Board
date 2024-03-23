import record from "../../assets/record.svg";

export const HistoryItem = () => {
  return (
    <li className="text-gray-500">
      <p className="mb-2">
        You added{" "}
        <span className="inline-flex justify-center items-center gap-1">
          <img src={record} alt="record.svg" className="inline-block" />
          <span className="text-black font-semibold">Document Review</span>
        </span>{" "}
        to the <span className="font-semibold">Planned</span>
      </p>
      <i>Mar 5 at 5:10 pm</i>
    </li>
  );
};
