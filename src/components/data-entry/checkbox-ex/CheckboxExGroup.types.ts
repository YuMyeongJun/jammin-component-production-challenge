import { ICheckboxExProps } from '@components';

/**
 * 체크박스 그룹의 옵션을 정의하는 인터페이스입니다.
 */
export interface CheckboxExOptionType {
  /**
   * 체크박스의 레이블입니다.
   */
  label: React.ReactNode;

  /**
   * 체크박스의 값입니다.
   */
  value: string | number | boolean;

  /**
   * 체크박스의 비활성화 여부입니다.
   */
  disabled?: boolean;

  /**
   * 체크박스의 체크 여부입니다.
   */
  checked?: boolean;

  /**
   * 체크박스의 기본 선택 상태를 설정합니다.
   * @default 'false'
   */
  defaultChecked?: boolean;
}

/**
 * 체크박스 그룹의 속성을 정의하는 인터페이스입니다.
 */
export interface ICheckboxExGroupProps {
  /**
   * 체크박스 그룹의 추가 클래스명입니다.
   */
  className?: string;

  /**
   * 체크박스 전체 선택 부분의 추가 클래스명입니다.
   */
  allOptionsClassName?: string;

  /**
   * 체크박스 전체 선택 부분의 input 추가 클래스명입니다.
   */
  allOptionsInputClassName?: string;

  /**
   * 체크박스 전체 선택 부분의 label 추가 클래스명입니다.
   */
  allOptionsLabelClassName?: string;

  /**
   * 체크박스 그룹의 자식 체크박스 추가 클래스명입니다.
   */
  childrenClassName?: string;

  /**
   * 체크박스 그룹의 자식 개별 체크박스 추가 클래스명입니다.
   */
  childClassName?: string;

  /**
   * 체크박스 그룹의 자식 체크박스의 input 추가 클래스명입니다.
   */
  childInputClassName?: string;

  /**
   * 체크박스 그룹의 자식 체크박스의 label 추가 클래스명입니다.
   */
  childLabelClassName?: string;

  /**
   * 체크박스 그룹의 추가 스타일입니다.
   */
  style?: React.CSSProperties;

  /**
   * readonly 여부입니다.
   */
  readOnly?: boolean;

  /**
   * 체크박스 그룹의 기본 선택 값들입니다.
   */
  defaultValue?: Array<string | number | boolean>;

  /**
   * 체크박스 그룹의 비활성화 여부입니다.
   */
  disabled?: boolean;

  /**
   * 체크박스 그룹의 이름입니다.
   */
  name?: string;

  /**
   * 체크박스 그룹의 옵션들입니다.
   */
  options?: Array<CheckboxExOptionType | string | number | boolean>;

  /**
   * 체크박스 그룹의 선택 값들입니다.
   */
  value?: Array<string | number | boolean>;

  /**
   * 체크박스 그룹의 색상입니다.
   */
  color?: ICheckboxExProps['color'];

  /**
   * 체크박스 그룹의 정렬 방향입니다.
   */
  isVertical?: boolean;

  /**
   * 체크박스 그룹의 간격입니다.
   */
  gap?: number;

  /**
   * 체크박스를 부모 그룹으로 관리할지 여부입니다.(하나 클릭 시 전체클릭, 자식 전체를 체크하지 경우 부모의 체크박스 모양 변경)
   */
  useIndeterminate?: boolean;

  /**
   * 체크박스 그룹의 전체 선택 레이블입니다.
   */
  indeterminateLabel?: string;

  /**
   * parent가 존재할 경우 들여쓰기 값입니다.
   */
  indent?: number;

  /**
   * label과 checkbox의 gap 값입니다.
   */
  labelGap?: number;

  /**
   * 체크박스 그룹의 값이 변경될 때 호출되는 콜백 함수입니다.
   * @param checkedValues 선택된 값들의 배열
   */
  onChange?: (checkedValues: Array<string | number | boolean>) => void;
}
