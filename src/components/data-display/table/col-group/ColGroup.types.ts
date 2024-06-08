import { IColumn } from '../Table.types';

export interface ITableColGroupProps<T> {
  showSelectedCell?: boolean;
  selectedColWidth?: number;
  allColumns?: IColumn<T>[];
}
