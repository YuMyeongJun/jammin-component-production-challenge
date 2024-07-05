import { createContext, useRef } from 'react';

export interface IMenuContext {
  navigate?: (path: string) => void;
  collapse?: boolean;
  selectedMenuKey?: string;
  isLight?: boolean;
  popContainerClassName?: string;
}

export const MenuContext = createContext<IMenuContext | undefined>(undefined);

export interface IMenuProviderProps {
  navigate?: (path: string) => void;
  collapse?: boolean;
  selectedMenuKey?: string;
  children: React.ReactNode;
  isLight?: boolean;
  popContainerClassName?: string;
}

export const MenuProvider = ({
  navigate,
  collapse,
  selectedMenuKey,
  children,
  isLight,
  popContainerClassName,
}: IMenuProviderProps) => {
  return (
    <MenuContext.Provider
      value={{ navigate, collapse, selectedMenuKey, isLight, popContainerClassName }}
    >
      {children}
    </MenuContext.Provider>
  );
};
