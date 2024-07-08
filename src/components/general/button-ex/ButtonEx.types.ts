import { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * ButtonEx 컴포넌트의 속성을 정의하는 인터페이스입니다.
 */
export interface IButtonExProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'prefix'> {
  /**
   * 버튼의 스타일 타입을 지정합니다.
   * @default 'fill'
   */
  type?: 'fill' | 'twotone' | 'text' | 'bordered' | 'dashed';

  /**
   * 버튼의 모양을 지정합니다.
   * @default 'rect'
   */
  shape?: 'round' | 'rect' | 'round-full' | 'circle';

  /**
   * HTML 버튼 타입을 지정합니다.
   * @default 'button'
   */
  htmlType?: 'submit' | 'reset' | 'button';

  /**
   * 버튼의 색상을 지정합니다.
   * @default 'primary'
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'gray'
    | 'dark';

  /**
   * 버튼의 크기를 지정합니다.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 버튼 앞에 표시할 요소를 지정합니다.
   */
  prefix?: ReactNode;

  /**
   * 버튼 뒤에 표시할 요소를 지정합니다.
   */
  suffix?: ReactNode;

  /**
   * 버튼을 블록 형태로 표시할지 여부를 지정합니다.
   * @default false
   */
  block?: boolean;
}
