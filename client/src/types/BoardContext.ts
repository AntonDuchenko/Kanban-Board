type BoardContext = {
  isCreateTask: boolean;
  setIsCreateTask: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  status: Status | null;
  setStatus: React.Dispatch<React.SetStateAction<Status | null>>;
  isEditing: number;
  setIsEditing: React.Dispatch<React.SetStateAction<number>>;
};
