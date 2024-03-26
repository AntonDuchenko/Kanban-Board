type BoardContext = {
  isCreateTask: boolean;
  setIsCreateTask: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  statusId: number;
  setStatusId: React.Dispatch<React.SetStateAction<number>>;
  isEditing: number;
  setIsEditing: React.Dispatch<React.SetStateAction<number>>;
};
