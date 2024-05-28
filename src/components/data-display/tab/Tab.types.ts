import { ReactNode } from 'react';

import { ITabItemProps } from './TabItem.types';

export interface ITabProps extends ITabItemProps {
  /**
   * tab 방향(정렬)
   * @default horizontal
   */
  type?: 'horizontal' | 'vertical';
  /**
   * tab 위치
   * @default left
   */
  placement?: 'left' | 'center' | 'right';
  /**
   * tab과 tab 사이 간격
   * @default 0
   * @type number
   */
  gap?: React.CSSProperties['gap'];
  /**
   * tab Item (tab contents)
   */
  items?: Array<{ key: number; label: string; children: ReactNode | string }>;
  onChange?: () => void;
  onClose?: () => void;
}
