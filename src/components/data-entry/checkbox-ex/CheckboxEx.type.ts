import React from 'react';

/**
 * CheckboxEx 컴포넌트의 속성을 정의하는 인터페이스입니다.
 */

export interface ICheckboxExProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
  /**
   * 체크박스의 선택 상태를 나타냅니다.
   * @default 'false'
   */
  checked?: boolean;

  /**
   * 체크박스의 기본 선택 상태를 설정합니다.
   * @default 'false'
   */
  defaultChecked?: boolean;

  /**
   * 체크박스가 비활성화되었는지 여부를 나타냅니다.
   * @default 'false'
   */
  disabled?: boolean;

  /**
   * 체크박스가 읽기 전용인지 여부를 나타냅니다.
   * @default 'false'
   */
  readOnly?: boolean;

  /**
   * 중간 상태를 나타냅니다. 주로 체크박스 그룹에서 사용됩니다.
   * @default 'false'
   */
  indeterminate?: boolean;

  /**
   * 체크박스의 값이 변경될 때 호출되는 콜백 함수입니다.
   * @param checked 새로운 체크 상태
   * @param event 원본 변경 이벤트
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * 체크박스에 적용할 추가 클래스명입니다  .
   */
  className?: string;

  /**
   * 체크박스의 추가 스타일을 지정합니다.
   */
  style?: React.CSSProperties;

  /**
   * 체크박스의 이름 속성을 지정합니다.
   */
  name?: string;

  /**
   * 체크박스의 자동 포커스 여부를 설정합니다.
   */
  autoFocus?: boolean;

  /**
   * 체크박스의 값을 지정합니다.
   */
  value?: any;

  /**
   * 체크박스의 레이블입니다.
   */
  label?: React.ReactNode;

  /**
   * label과 checkbox의 gap 값입니다.
   */
  labelGap?: number;

  /**
   * 체크박스의 기본값 입니다.
   */
  defaultValue?: any;

  /**
   * 체크박스가 필요한지 여부를 나타냅니다.
   */
  required?: boolean;

  /**
   * 체크박스의 색상을 지정합니다.
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
   * 체크박스 내부의 input 요소에 적용되는 추가 클래스명입니다.
   */
  inputClassName?: string;

  /**
   * 체크박스의 라벨에 적용되는 추가 클래스명입니다.
   */
  labelClassName?: string;
}
