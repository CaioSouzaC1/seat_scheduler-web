import { IStore } from "@/interfaces/Store";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
  const [store, setStoreState] = useState<IStore | null>(null);

  useEffect(() => {
    const storedStore = localStorage.getItem("SeatSchedulerActualstore");
    if (storedStore) {
      setStoreState(JSON.parse(storedStore));
    }
  }, []);

  const setStore = (store: IStore) => {
    setStoreState(store);
    localStorage.setItem("SeatSchedulerActualstore", JSON.stringify(store));
  };

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};
