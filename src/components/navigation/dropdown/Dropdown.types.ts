import { Placement } from '@popperjs/core';

export interface IDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * dropdown에 표시할 내용
   * @default
   * @type IMenuItem[]
   */
  // menu: IMenuItem[];
  menu: React.ReactNode;

  /**
   * dropdown 표시 위치 지정
   * @default 'bottom'
   * @type 'top' | 'bottom' | 'right' | 'left'
   */
  placement?: Placement;

  /**
   * tooltip 보여줄지 선택
   * @default false
   * @type boolean
   */
  disabled?: boolean;

  /**
   *
   * @default 'click'
   */
  trigger?: 'click' | 'hover' | 'both';

  /**
   *
   * @default 200
   * @type number
   */
  boxWidth?: number;

  /**
   * @type string
   */
  boxClassName?: string;

  /**
   * @type string
   */
  boxColor?: string;

  /**
   * component를 전달
   */
  children?: React.ReactNode | React.ReactNode[];

  offset?: [number, number];
}
