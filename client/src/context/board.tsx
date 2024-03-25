import React, { createContext, useMemo, useState } from "react";

export const BoardContext = createContext<BoardContext>({
  isCreateTask: false,
  setIsCreateTask: () => {},
  isOpen: false,
  setIsOpen: () => {},
  isCreate: false,
  setIsCreate: () => {},
  statusId: 0,
  setStatusId: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const BoardProvider: React.FC<Props> = ({ children }) => {
  const [isCreateTask, setIsCreateTask] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [statusId, setStatusId] = useState(0);

  const preparedValue = useMemo(
    () => ({
      isCreateTask,
      setIsCreateTask,
      isOpen,
      setIsOpen,
      isCreate,
      setIsCreate,
      statusId,
      setStatusId,
    }),
    [isCreateTask, statusId, isOpen, isCreate]
  );

  return (
    <BoardContext.Provider value={preparedValue}>
      {children}
    </BoardContext.Provider>
  );
};
