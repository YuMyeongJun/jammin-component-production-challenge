import { Checkbox } from '@components';
import { AnyObject } from '@models';

import { useHeaderInfo } from '../hooks/useHeaderInfo';

import { IHeaderRowProps } from './Header.types';
import { HeaderCell } from './HeaderCell';

export const HeaderRow = <RecordType extends AnyObject = AnyObject>({
  columns,
  sortInfo,
  setSortColumn,
  dataSource,
  rowSelection,
}: IHeaderRowProps<RecordType>) => {
  const headerInfo = useHeaderInfo(columns);

  const handleChangeHeaderChecked = (value: boolean) => {
    if (value) {
      handleSelectAll();
    } else {
      handleUnselectAll();
    }
  };
  const handleSelectAll = () => {
    const selectedItem = !!dataSource && dataSource.length ? dataSource[0] : undefined;
    rowSelection?.onChange?.({
      selectedItems: dataSource ?? [],
      selectedItem: selectedItem,
    });
  };

  const handleUnselectAll = () => {
    rowSelection?.onChange?.({
      selectedItems: [],
      selectedItem: undefined,
    });
  };

  const calcFixedPos = (
    columns: { fixed?: 'left' | 'right'; width?: string | number }[],
    colIndex: number,
    fixed?: 'left' | 'right',
  ) => {
    if (!fixed) {
      return undefined;
    }

    if (fixed === 'left' && colIndex === 0) {
      return 0;
    }

    if (fixed === 'right' && colIndex === columns.length - 1) {
      return 0;
    }
    if (fixed === 'left') {
      return columns
        .map((c, i) => ({ column: c, index: i }))
        .filter((x) => x.column.fixed === fixed && x.index < colIndex)
        .map((x) => x.column.width)
        .reduce((sum: number, current) => {
          const currentWidth = current ? Number(current) : 0;
          return sum + currentWidth;
        }, 0);
    }
    if (fixed === 'right') {
      return columns
        .map((c, i) => ({ column: c, index: i }))
        .filter((x) => x.column.fixed === fixed && x.index > colIndex)
        .map((x) => x.column.width)
        .reduce((sum: number, current) => {
          const currentWidth = current ? Number(current) : 0;
          return sum + currentWidth;
        }, 0);
    }

    return undefined;
  };

  return (
    <>
      <thead>
        {headerInfo &&
          headerInfo.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {rowSelection?.selectionType && rowIndex === 0 && (
                <th rowSpan={headerInfo.length}>
                  {rowSelection.selectionType === 'checkbox' && (
                    <Checkbox
                      indeterminate={
                        (rowSelection.selectedItems?.length ?? 0) > 0 &&
                        rowSelection.selectedItems?.length !== dataSource?.length
                      }
                      checked={rowSelection.selectedItems?.length === dataSource?.length}
                      onChange={(e) => handleChangeHeaderChecked(e.target.checked)}
                    />
                  )}
                </th>
              )}
              {row.map((col, colIndex) => (
                <HeaderCell
                  {...col}
                  key={colIndex}
                  sortInfo={sortInfo}
                  fixed={col.fixed}
                  fixedPos={calcFixedPos(row, colIndex, col.fixed)}
                  setSortColumn={setSortColumn}
                />
              ))}
            </tr>
          ))}
      </thead>
    </>
  );
};
