export interface ICardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * 카드의 타이틀 영역
   * @type React.ReactNode
   */
  title?: React.ReactNode;
  /**
   * 카드 타이틀 영역 오른쪽 영역
   * @type React.ReactNode
   */
  extra?: React.ReactNode;
  /**
   * 카드에 라운드를 줄지 선택
   * @default false
   * @type boolean
   */
  rounded?: boolean;
  /**
   * 카드 크기
   * @type 'small' | 'default'
   */
  size?: 'small' | 'default';
  /**
   * 타이틀 영역 색상
   * @type string
   */
  titleBgColor?: string;
  /**
   * 타이틀 색상
   * @type string
   */
  titleColor?: string;
  /**
   * 카드 테두리선 선택 여부
   * @default true
   * @type boolean
   */
  bordered?: boolean;
  /**
   * component를 전달
   * @type React.ReactNode | React.ReactNode[]
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * 카드에 로딩(skeleton) 표시할지 선택
   * @default
   * @type boolean
   */
  loading?: boolean;

  /**
   * 카드 높이를 부모의 높이에 100%로 맞출지 선택
   * @type boolean
   */

  fullHight?: boolean;

  /**
   * 카드 헤더의 padding값 조절
   * @type number | [number, number];
   */
  headPadding?: number | [number, number];

  /**
   * 카드 헤더속 extra padding값 조절
   * @type number | [number, number];
   */
  extraPadding?: number | [number, number];

  /**
   * 카드 헤더 정렬
   * `flex-start` `space-between` `center` `space-around` `space-evenly`
   * @default space-between
   *
   */
  headAlign?: React.CSSProperties['justifyContent'];
}
