import { InputHTMLAttributes } from 'react';

export interface IRadioOption extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * 라디오 title
   */
  label: string;

  /**
   * 라디오 value
   */
  value: string | number;

  /**
   * 라디오 미사용 여부
   * @default false
   */
  disabled?: boolean;

  /**
   * 라디오 버튼의 checked 되어야 할 조건
   */
  checked?: boolean;

  /**
   * 라디오 버튼의 defaultChecked 되어야 할 조건
   */
  defaultChecked?: boolean;
}

export interface IRadioOptionsProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * 라디오 옵션사항
   */
  options: IRadioOption[];

  /**
   * 수평, 수직 여부
   * @default false
   */
  vertical?: boolean;

  /**
   * Radio 사이의 gap
   * @type number
   * @default 0
   */
  gap?: React.CSSProperties['gap'];

  /**
   * Radio 입력 에러
   */
  isError?: boolean;
}
