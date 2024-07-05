/**
 * Menu 컴포넌트의 props를 위한 인터페이스
 */
export interface IMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Menu의 자식 요소 */
  children?: React.ReactNode;
  /** 경로 이동을 위한 함수 */
  navigate?: (path: string) => void;
  /** Menu를 접을지 여부 */
  collapse?: boolean;
  /** 현재 선택된 메뉴 항목의 키 */
  selectedMenuKey?: string;
  /** 라이트 모드인지 여부 */
  isLight?: boolean;
  /** 확장된 너비 */
  extendWidth?: number;
  /** 접힌 너비 */
  collapseWidth?: number;
  /** 팝업 컨테이너의 클래스명 */
  popContainerClassName?: string;
}

/**
 * MenuItem 컴포넌트의 props를 위한 인터페이스
 */
export interface IMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** 메뉴 항목의 고유 키 */
  menuKey: string;
  /** 메뉴 항목의 경로 */
  path: string;
  /** 메뉴 항목의 제목 */
  title: string;
  /** 기본적으로 열려있는지 여부 */
  defaultOpen?: boolean;
  /** 메뉴 항목의 아이콘 */
  icon?: React.ReactNode;
  /** 메뉴 항목의 자식 요소 */
  children?: React.ReactNode;
}
