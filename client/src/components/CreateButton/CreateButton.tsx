import plusBlack from "../../assets/plus-black.svg";

interface Props {
  handlerOnCreateClick: () => void;
  title: string;
  classNames?: string;
}

export const CreateButton: React.FC<Props> = ({ handlerOnCreateClick, title, classNames }) => {
  return (
    <button
      onClick={handlerOnCreateClick}
      type="button"
      className={`border-dashed border-2 border-dark flex transition-all ${classNames}
      gap-2 justify-center items-center min-h-[40px] w-full rounded-lg hover:bg-slate-200`}
    >
      <img src={plusBlack} alt="plus.svg" />
      {title}
    </button>
  );
};
