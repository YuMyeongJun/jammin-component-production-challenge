import { useContext } from 'react';

import { MenuContext } from './MenuContext';

export const useMenuContext = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('MenuProvider를 감싸줘야 합니다.');
  }
  return context;
};
