import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

// 체크박스 컴포넌트에 사용될 클래스 정의
const classes = {
  /** 루트 요소에 적용된 스타일. */
  root: '',
  /** 체크박스 요소에 적용되는 클래스 이름입니다. */
  checkbox: 'checkbox',
  /** 입력 요소에 적용되는 클래스 이름입니다. */
  input: 'input',
  /** 라벨 요소에 적용되는 클래스 이름입니다. */
  label: 'label',
  /** 입력 구성 요소의 `checked` 클래스에 적용되는 상태 클래스입니다. */
  checked: 'checked',
  /** 입력 구성 요소의 비활성화된 클래스에 적용되는 상태 클래스입니다. */
  disabled: 'disabled',
  /** 입력 구성 요소의 비활성화된 라벨 클래스에 적용되는 상태 클래스입니다. */
  disabledLabel: 'disabled-label',
  /** `indeterminate={true}`인 경우 루트 요소에 적용되는 상태 클래스입니다. */
  indeterminate: 'indeterminate',

  // 색상 관련 클래스
  /** `color="primary"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  primary: 'primary',
  /** `color="secondary"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  secondary: 'secondary',
  /** `color="success"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  success: 'success',
  /** `color="error"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  error: 'error',
  /** `color="info"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  info: 'info',
  /** `color="warning"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  warning: 'warning',
  /** `color="gray"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  gray: 'gray',
  /** `color="dark"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  dark: 'dark',

  // 크기 관련 클래스
  /** `size="sm"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeSmall: 'sm',
  /** `size="md"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeMedium: 'md',
  /** `size="lg"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeLarge: 'lg',

  // 체크박스 그룹 관련 클래스
  /** 체크박스 그룹에서 사용되는 클래스 이름입니다. */
  group: {
    root: '',
    /** 전체 옵션 체크박스에 적용되는 클래스 이름입니다. */
    allOptions: 'all-option',
    /** 체크박스 그룹의 자식 체크박스에 적용되는 클래스 이름입니다. */
    children: 'children',
    /** 전체 옵션 체크박스의 input에 적용되는 클래스 이름입니다. */
    allOptionsInput: 'all-option-input',
    /** 전체 옵션 체크박스의 label에 적용되는 클래스 이름입니다. */
    allOptionsLabel: 'all-option-label',
    /** 체크박스 그룹의 자식 체크박스에 적용되는 클래스 이름입니다. */
    child: 'child',
    /** 체크박스 그룹의 자식 체크박스의 input에 적용되는 클래스 이름입니다. */
    childInput: 'children-input',
    /** 체크박스 그룹의 자식 체크박스의 label에 적용되는 클래스 이름입니다. */
    childLabel: 'children-label',
  },
} as const;

// 'checkbox-ex' 접두사를 클래스에 추가
export const checkboxExClasses = attachPrefixClasses(classes, 'checkbox-ex', true);

// 체크박스 클래스의 타입 정의
export type CheckboxExClasses = typeof checkboxExClasses;
