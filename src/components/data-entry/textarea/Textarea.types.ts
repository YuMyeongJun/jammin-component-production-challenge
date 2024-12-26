import { InputHTMLAttributes } from 'react';

import { useFocus } from './../select/Select.stories';

export interface ITextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  /**
   * 숫자 카운터의 최대 길이('showCount' true일때만 확인 가능)
   * @type number
   */
  maxLength?: number;

  /**
   * 숫자 카운터 노출 유무
   * @type boolean
   * @default false
   */
  showCount?: boolean;

  /**
   * Textarea의 최대 길이(길이 제한)
   * @type number
   */
  maxRows?: number;

  /**
   * Textarea의 최소 길이
   * @type number
   */
  minRows?: number;

  /**
   * Input의 에러 유무
   * @default false;
   */
  isError?: boolean;

  /**
   * Input에서 노출되는 title과 counter의 위치(label은 값이 없을 경우 노출되지 않음)
   * @type "top" | "bottom" | "inside"
   */
  direction?: 'top' | 'bottom' | 'inside';

  /**
   * Input 높이 조절
   * sm: 미정
   * md: 32px
   * lg: 38px
   * @default md
   * @type "sm" | "md" | "lg"
   */
  controlSize?: 'sm' | 'md' | 'lg';

  /**
   * Textarea counter
   */
  textLength?: number;

  /**
   * focus되었을 때 로직을 위한 flag
   */
  useFocus?: boolean;

  /**
   * children의 class name
   */
  childrenClassName?: string;
}
