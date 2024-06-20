import { InputHTMLAttributes, ReactNode } from 'react';
import { ICalendarProps, IRangeCalendarProps } from '@components';

export interface IDatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>,
    ICalendarProps {
  format?: string;
  calendarIcon?: ReactNode;
  /**
   * Input 높이 조절
   * sm: 미정
   * md: 32px
   * lg: 38px
   * @default md
   * @type "sm" | "md" | "lg"
   */
  controlSize?: 'sm' | 'md' | 'lg';
  isError?: boolean;
}

export interface IDateRangePickerProps extends IRangeCalendarProps {
  format?: string;
  calendarIcon?: ReactNode;
  /**
   * Input 높이 조절
   * sm: 미정
   * md: 32px
   * lg: 38px
   * @default md
   * @type "sm" | "md" | "lg"
   */
  controlSize?: 'sm' | 'md' | 'lg';
  startPlaceholder?: string;
  endPlaceholder?: string;
  isError?: boolean;
  placement?: 'left' | 'right';
}
