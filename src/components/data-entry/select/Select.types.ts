import { InputHTMLAttributes, ReactNode } from "react";

export interface ISelectProp<T extends object>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  /**
   * select의 선 표시 여부
   * @default false
   * @type boolean
   */
  bordered?: boolean;
  /**
   * select 옵션을 처음에 표시할지 선택
   * @default false
   * @type boolean
   */
  defaultOpen?: boolean;
  /**
   * select 옵션을 처음에 표시할지 선택
   * @default false
   * @type boolean
   */
  disabled?: boolean;
  /**
   * select 표시 위치 지정
   * @default 'right'
   * @type 'top' | 'bottom' | 'right' | 'left'
   */
  placement?: "top" | "bottom" | "right" | "left";
  /**
   * select 옵션을 표시할지 선택
   * @default false
   * @type boolean
   */
  open?: boolean;
  /**
   * select 오류 또는 경고를 테두리 색으로 표시
   * @default
   * @type 'error' | 'warning'
   */
  status?: "error" | "warning";
  /**
   * select 오른쪽 끝 화살표 대신 아이콘 삽입
   * @default
   * @type ReactNode
   */
  suffixIcon?: ReactNode;
  /**
   * select placeholder 작성
   * @default
   * @type string
   */
  placeholder?: string;
  /**
   * select default 값 지정
   * @default
   * @type string
   */
  defaultValue?: string;

  /**
   * items과 세트로 사용
   * select에 보여지는 값
   * @default
   * @type keyof T
   */
  displayLabel?: keyof T;
  /**
   * items과 세트로 사용
   * select에서 사용되는 value 값
   * @default
   * @type keyof T
   */
  valuePath?: keyof T;
  /**
   * displayLabel,valuePath와 같이 사용
   * option으로 지정되지 않은 api에서 보내준 값을 바로 사용할 수 있음
   * @default
   * @type T[]
   */
  items?: T[];
  /**
   * select의 옵션값 위치 변경(위/아래, 왼/오)
   * @default [0,0]
   * @type [number, number]
   */
  offset?: [number, number];
  /**
   * select width 지정
   * 크기를 넣으면 px로 적용
   * 최소값 150px
   * @default '150px'
   * @type string | number;
   */
  selectWidth?: string | number;
  /**
   * select option 값 지정
   * @default
   * @type Array<{ label: string; value: string; disabled?: boolean }>
   */
  options?: Array<{ label: string; value: string; disabled?: boolean }>;
  /**
   * select error 여부 지정
   * @default
   * @type boolean
   */
  isError?: boolean;
  /**
   * select에 입력을 해서 선택할지 여부 결정
   * @default false
   * @type boolean
   */
  filterOption?: boolean;
  /**
   * select의 width를 부모의 width 100% 맞출지 선택
   * @type boolean
   */
  fullWidth?: boolean;
  /**
   * select의 list width 지정
   * @type string | number;
   */
  listWidth?: string | number;
  /**
   * select의 컨트롤 크기와 글자 크기 지정
   * @type 'sm' | 'md' | 'lg'
   */
  controlSize?: "sm" | "md" | "lg";
  /**
   * select 앞에 추가로 데이터 삽입
   * @type ReactNode
   */
  preSuffixIcon?: ReactNode;
  /**
   * select boarder 사용 여부 선택
   * @type boolean
   */
  useBorder?: boolean;
  /**
   * select focus 사용 여부 선택
   * @type boolean
   */
  useFocus?: boolean;
  /**
   * select value값 지정
   * @type string
   */
  value?: string;
  /**
   * select list의 class 지정
   * @type string
   */
  listClassName?: string;
  useEllipsis?: boolean;
  /**
   * select onChange 함수 사용
   * @type (value: string | null) => void;
   */
  onChange?: (value: string | null) => void;
}

export interface IMultipleSelectProp<T extends object>
  extends Omit<
    ISelectProp<T>,
    "defaultValue" | "filterOption" | "onChange" | "value"
  > {
  /**
   * select default 값 지정
   * @default
   * @type string
   */
  defaultValue?: string | Array<string>;
  /**
   * select 선택 갯수 제한
   * @type number
   */
  limitNumber?: number;
  /**
   * select에 체크박스 보여줄지 여부 선택
   * @type boolean
   */
  isCheckbox?: boolean;
  /**
   * select value값 지정
   * @type string | Array<string>;
   */
  value?: string | Array<string>;

  /**
   * select onChange 함수 사용
   * @type (value: string[] | null) => void;
   */
  onChange?: (value: string[] | null) => void;
}
