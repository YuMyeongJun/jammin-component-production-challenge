import * as React from 'react';
import { To } from 'react-router-dom';

// ILinkEx 인터페이스는 링크 구성 요소의 속성을 정의합니다.
export interface ILinkEx<DefaultComponent extends React.ElementType = 'a'> {
  /**
   * 구성품의 내용입니다.
   */
  children?: React.ReactNode;

  /**
   * 구성 요소의 색상입니다.
   * @default 'primary'
   */
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'dark';

  /**
   * `true`인 경우 구성요소가 비활성화됩니다.
   * @default false
   */
  disabled?: boolean;

  /**
   * `react-router-dom`의 `Link` 컴포넌트와 함께 사용할 수 있는 경로입니다.
   */
  to?: To;

  /**
   * 클릭하면 링크되는 URL입니다.
   */
  href?: string;

  /**
   * `true`인 경우 상호작용 영역을 포함하기 위해 ::after 의사 요소가 추가됩니다.
   * 오버레이 링크의 상위에는 `relative` CSS position이 있어야 합니다.
   * @default false
   */
  overlay?: boolean;

  /**
   * 링크에 밑줄을 표시해야 하는 경우를 제어합니다.
   * @default 'always'
   */
  underline?: 'none' | 'hover' | 'always';

  /**
   * 구성 요소의 크기입니다.
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  // 기본 구성 요소 유형을 정의합니다.
  defaultComponent?: DefaultComponent;

  // 추가적인 CSS 클래스 이름을 지정할 수 있습니다.
  className?: string;

  /**
   * `a` 태그의 `target` 속성을 지정합니다.
   */
  target?: '_self' | '_blank' | '_parent' | '_top';

  /**
   * `a` 태그의 `rel` 속성을 지정합니다.
   */
  rel?:
    | 'noopener'
    | 'noreferrer'
    | 'nofollow'
    | 'noopener noreferrer'
    | 'noreferrer nofollow';

  /**
   * hover시 색상 변경을 여부를 지정합니다.
   */
  useHover?: boolean;
}

// LinkProps 타입은 ILinkEx 인터페이스를 확장하여 추가적인 구성 요소 속성을 정의합니다.
export type ILinkExProps<RootComponentType extends React.ElementType = 'a'> =
  ILinkEx<RootComponentType> & {
    // 구성 요소를 대체할 수 있는 React 요소 유형을 지정할 수 있습니다.
    component?: React.ElementType;
    // defaultComponent가 없을 경우를 대비한 대체 로직 추가
    defaultComponent?: RootComponentType;
  };
