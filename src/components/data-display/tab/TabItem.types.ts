import { ReactNode } from 'react';

/**
 * TabItem 컴포넌트의 속성을 정의하는 인터페이스
 */
export interface ITabItemProps {
  /**
   * 탭 아이템의 유형
   * @default 'solid'
   */
  variant: 'solid' | 'underline' | 'handle';

  /**
   * 탭의 색상 테마
   * @default 'primary'
   */
  color:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'gray'
    | 'dark';

  /**
   * 탭의 크기
   * @default 'sm'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * 탭의 모서리 둥글기
   * @default 'none'
   */
  rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;

  /**
   * 시작 탭 번호
   * @default 1
   */
  defaultTab: number;

  /**
   * 탭이 선택되었는지 여부
   */
  selected?: boolean;

  /**
   * 탭에 표시될 아이콘
   */
  tabIcon?: ReactNode | undefined;

  /**
   * 탭 닫기 아이콘
   * @default false
   */
  closeIcon?: ReactNode | undefined;

  /**
   * 탭 클릭 시 실행될 함수
   */
  onClick?: () => void;

  /**
   * 탭 닫기 시 실행될 함수
   * @param {MouseEvent<HTMLElement>} e - 마우스 이벤트 객체
   */
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}
