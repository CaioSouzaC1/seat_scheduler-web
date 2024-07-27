import { IStore } from "@/interfaces/Store";
import { createContext, useContext, useState, ReactNode } from "react";

interface StoreContextType {
  store: IStore | null;
  setStore: (store: IStore) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [store, setStore] = useState<IStore | null>(null);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};
