import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  /** 루트 요소에 적용된 스타일. */
  root: '',
  /** 루트 요소에 적용된 스타일. `disabled="true"` */
  disabled: 'disabled',
  /** 루트 요소에 적용된 스타일. `overlay="true"` */
  overlay: 'overlay',
  /** `underline="none"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  underlineNone: 'underline-none',
  /** `underline="hover"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  underlineHover: 'underline-hover',
  /** `underline="always"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  underlineAlways: 'underline-always',
  /** `color="primary"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorPrimary: 'primary',
  /** `color="secondary"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorSecondary: 'secondary',
  /** `color="success"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorSuccess: 'success',
  /** `color="error"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorError: 'error',
  /** `color="info"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorInfo: 'info',
  /** `color="warning"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorWarning: 'warning',
  /** `color="dark"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorDark: 'dark',
  /** `size="xs"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeXs: 'xs',
  /** `size="sm"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeSm: 'sm',
  /** `size="md"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeMd: 'md',
  /** `size="lg"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeLg: 'lg',
  /** hover시 색상 변경 여부입니다. */
  hover: 'hover',
};

export const linkExClasses = attachPrefixClasses(classes, 'linkEx', false);

export type LinkExClasses = typeof linkExClasses;
