import { useState } from "react";
import plusBlack from "../../assets/plus-black.svg";
import { DropDownDotsMenu } from "../DropDownDotsMenu/DropDownDotsMenu";
import { TaskCard } from "../TaskCard/TaskCard";
import classNames from "classnames";

interface Props {
  id: string;
}

export const TaskList: React.FC<Props> = ({ id }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handlerOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditing(false);
  };

  return (
    <div
      className="pt-5 flex flex-col gap-4 col-span-full 
    sm:col-span-2 xl:col-span-3 max-h-[800px] overflow-y-auto"
    >
      <div
        className="border-y-2 border-solid py-2 flex font-medium 
      text-lg justify-between items-center gap-2"
      >
        <p className={classNames({ hidden: isEditing })}>To Do</p>
        {isEditing && (
          <form
            className="max-w-[65%]"
            onSubmit={handlerOnSubmit}
          >
            <input
              onBlur={() => setIsEditing(false)}
              defaultValue="To Do"
              autoFocus
              type="text"
              className="p-1 border-slate-300 rounded-lg 
            focus:ring-0 focus:border-black focus:ring-black"
            />
          </form>
        )}
        <div className="flex gap-1 justify-center items-center">
          <p>45</p>
          <DropDownDotsMenu id={`list-${id}`} setIsEditing={setIsEditing} />
        </div>
      </div>
      <button
        type="button"
        className="border-dashed border-2 border-dark flex transition-all 
      gap-2 justify-center items-center h-[40px] w-full rounded-lg hover:bg-slate-200"
      >
        <img src={plusBlack} alt="plus.svg" />
        Add new card
      </button>

      <TaskCard id={id} />
    </div>
  );
};
