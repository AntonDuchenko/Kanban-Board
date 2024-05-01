import React, { createContext, useMemo, useState } from "react";

export const BoardContext = createContext<BoardContext>({
  isCreateTask: false,
  setIsCreateTask: () => {},
  isOpen: false,
  setIsOpen: () => {},
  isCreate: false,
  setIsCreate: () => {},
  status: null,
  setStatus: () => {},
  isEditing: 0,
  setIsEditing: () => {},
  isMenuOpen: false,
  setIsMenuOpen: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const BoardProvider: React.FC<Props> = ({ children }) => {
  const [isEditing, setIsEditing] = useState(0);
  const [isCreateTask, setIsCreateTask] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const preparedValue = useMemo(
    () => ({
      isCreateTask,
      setIsCreateTask,
      isOpen,
      setIsOpen,
      isCreate,
      setIsCreate,
      status,
      setStatus,
      isEditing,
      setIsEditing,
      isMenuOpen,
      setIsMenuOpen,
    }),
    [isCreateTask, status, isOpen, isCreate, isEditing, isMenuOpen]
  );

  return (
    <BoardContext.Provider value={preparedValue}>
      {children}
    </BoardContext.Provider>
  );
};
