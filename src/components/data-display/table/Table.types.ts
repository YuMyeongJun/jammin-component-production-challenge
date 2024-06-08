import { HtmlHTMLAttributes, ReactNode } from 'react';
import { LoadingType } from 'react-loading';
import { PaginationProps } from '@components/navigation/pagination';
import { Path } from 'object-path';

export type SizeType = 'normal' | 'small';
export type SortDirectionType = 'ascending' | 'descending';

export type TextAlignType = 'left' | 'center' | 'right';

export type TableRowSelectionType = 'default' | 'checkbox';

export interface IExcelExtra {
  title?: string;
  wch: number;
  numFmt?: string;
}

export interface ISortInfo {
  /**
   * 정렬 할 컬럼의 Property Path
   */
  path: Path;
  /**
   * 정렬 방향 (ascending, descending)
   */
  direction: SortDirectionType;
}

export interface IColumn<RecordType> {
  /**
   * Data Property 이름
   */
  path?: Path;

  /**
   * 컬럼 헤더에 표시되는 노드
   */
  title: ReactNode;

  /**
   * 컬럼의 가로 사이즈
   */
  width?: number | string;

  /**
   * 컬럼에 적용되는 css 클래스
   */
  className?: string;

  /**
   * 헤더의 horizontal 정렬 (미정의 시 align 따라감)
   */
  titleAlign?: TextAlignType;

  /**
   * 컬럼의 horizontal 정렬
   */
  align?: TextAlignType;

  /**
   * 컬럼의 정렬 가능 여부
   */
  sortable?: boolean;

  /**
   * 엑셀 export 시 옵션
   */
  excelExtra?: IExcelExtra;
  /**
   * 컬럼에 표시될 노드 재정의
   * @param v 컬럼의 값
   * @param record 해당 row의 object
   * @returns 컬럼에 표시될 노드
   */
   
  render?: (v: any, record: RecordType) => React.ReactNode;
  /**
   * row의 클릭 이벤트를 수신에서 컬럼을 제외하는 옵션
   */
  ignoreRowClick?: boolean;
  /**
   * 컬럼 고정
   */
  fixed?: 'left' | 'right';
}

export interface IColumnGroup<RecordType> {
  /**
   * 헤더에 표시할 타이틀
   */
  title: string;
  /**
   * 타이틀 horizontal 정렬
   */
  titleAlign?: TextAlignType;
  /**
   * 그룹 하위 컬럼
   */
  children: ColumnsType<RecordType>;
}

export type ColumnType<T> = IColumn<T> | IColumnGroup<T>;
export type ColumnsType<T> = ColumnType<T>[];

export interface ITableRowSelection<RecordType> {
  /**
   * 선택된 Row
   */
  selectedItem?: RecordType;

  /**
   * 선택된 Row 배열
   */
  selectedItems?: RecordType[];

  /**
   * 선택된 Row에 추가할 className
   */
  selectedClass?: string;

  /**
   * 선택 타입 (기본:default, 체크박스:checkbox)
   */
  selectionType?: TableRowSelectionType;

  /**
   * 선택 컬럼 가로 사이즈
   */
  selectedColWidth?: number;

  /**
   * 선택 컬럼에 표시할 내용
   * @param props
   * @returns
   */
  selectedCell?: (props: { selected: boolean }) => React.ReactNode;

  /**
   * 선택 변경 이벤트
   * @param args
   * @returns
   */
  onChange?: (args: { selectedItem?: RecordType; selectedItems: RecordType[] }) => void;
}

export interface ITablePagination extends Omit<PaginationProps, 'onChange'> {
  /**
   * perPage 변경 셀렉트 표시여부
   */
  showSizeChanger?: boolean;

  /**
   * select에 표시할 size 목록
   */
  sizeChangers?: number[];

  /**
   * select가로 크기
   */
  sizeChangerWidth?: number;

  /**
   * select 변경 이벤트
   */
  onChange?: (
    event: React.ChangeEvent<unknown> | null,
    page: number,
    size?: number,
  ) => void;
}

export interface ITableColumnProps<RecordType> extends IColumn<RecordType> {
  children?: null;
}

export interface ITableColumnGroupProps<RecordType>
  extends Omit<IColumnGroup<RecordType>, 'children'> {
  children:
    | React.ReactElement<ITableColumnProps<RecordType>>
    | React.ReactElement<ITableColumnProps<RecordType>>[];
}

export interface ITableProps<RecordType> extends HtmlHTMLAttributes<HTMLTableElement> {
  /**
   * wrap 영역의 class
   */
  wrapClassName?: string;
  /**
   * Table 의 컬럼 정의
   */
  columns?: ColumnsType<RecordType>;

  /**
   * Table 의 내용
   */
  dataSource?: RecordType[];

  /**
   * 모서리 round여부
   */
  rounded?: boolean;

  /**
   * 외곽선 여부
   */
  bordered?: boolean;

  /**
   * dataSource 가 없을 시 보여 줄 element
   */
  empty?: React.ReactNode;

  /**
   * 테이블 내 텍스트 사이즈
   */
  size?: SizeType;

  /**
   * 로딩
   */
  loading?: boolean | LoadingType;

  /**
   * 초기 정렬 값
   */
  defaultSort?: ISortInfo[];

  tableHeight?: number | string;

  /**
   * row 클릭 이벤트
   */
  rowClick?: (row: RecordType) => void;

  /**
   * Row 선택 옵션
   */
  rowSelection?: ITableRowSelection<RecordType>;

  /**
   * tr 엘레멘트의 attribute를 설정할 수 있다.
   */
  onRow?: (row: RecordType) => Omit<HtmlHTMLAttributes<HTMLTableRowElement>, 'onClick'>;

  /**
   * 페이지네이션 설정
   */
  pagenation?: ITablePagination;

  /**
   * 정렬을 항상 한개만 사용 여부
   */
  isSingleSort?: boolean;

  /**
   * 서버 정렬 사용시 세팅
   */
  serverSort?: ISortInfo[];

  /**
   * 정렬 변경 이벤트
   */
  onSortChanged?: (sortInfo: ISortInfo[]) => void;

  /**
   * table header 숨김여부
   */
  hideHeader?: boolean;

  tableObserver?: ReactNode;
}
