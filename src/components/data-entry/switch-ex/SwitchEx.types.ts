import { InputHTMLAttributes } from 'react';

export interface ISwitchExProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * 스위치의 사이즈
   * @default md
   */
  switchSize?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * 스위치의 색상을 지정합니다.
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
}
