/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useState } from 'react';

type appContextType = {
  watched: boolean;
  onWatched: () => void;
};

const appContextDefaultValues: appContextType = {
  watched: false,
  onWatched: () => {},
};

const AppContext = createContext<appContextType>(appContextDefaultValues);

export function useAppCtx() {
  return useContext(AppContext);
}

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  const [watched, setWatched] = useState<boolean>(false);

  const onWatched = () => {
    setWatched(true);
  };

  const value = {
    watched,
    onWatched,
  };

  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}
