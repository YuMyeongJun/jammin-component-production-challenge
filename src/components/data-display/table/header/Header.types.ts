import { FunctionComponent, ReactNode } from 'react';
import { Path } from 'object-path';

import {
  ColumnsType,
  ISortInfo,
  ITableRowSelection,
  TableRowSelectionType,
  TextAlignType,
} from '../Table.types';

export interface IHeaderInfo {
  title?: ReactNode;
  path?: Path;
  align?: TextAlignType;
  rowSpan?: number;
  colSpan?: number;
  sortable?: boolean;
  width?: string | number;
  fixed?: 'left' | 'right';
  fixedPos?: number;
}

export interface IHeaderRowProps<RecordType> {
  columns?: ColumnsType<RecordType>;
  sortInfo: ISortInfo[];
  setSortColumn?: (args: { path?: Path; sortable?: boolean }) => void;
  rowSelection?: ITableRowSelection<RecordType>;
  dataSource?: RecordType[];
}

export interface IHeaderCellProps extends IHeaderInfo {
  sortInfo: ISortInfo[];
  setSortColumn?: (args: { path?: Path; sortable?: boolean }) => void;
}
