import { createContext, useContext, useState } from 'react';

interface UserContextType {
  currentId: number | null;
  userIdProvider: (id: number) => void;
  userIdClear: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserIdProvider({ children }: { children }) {
  const [currentId, setCurrentId] = useState<number | null>(1);

  const userIdProvider = (id: number) => {
    setCurrentId(id);
  };

  const userIdClear = () => {
    setCurrentId(null);
  };

  return (
    <UserContext.Provider value={{ currentId, userIdProvider, userIdClear }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserIdProvider');
  }
  return context;
}
