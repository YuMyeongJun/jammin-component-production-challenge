import { AnyObject } from '@models';
import classNames from 'classnames';

import { IBodyRowProps } from './Body.types';
import { BodyCell } from './BodyCell';

export const BodyRow = <RecordType extends AnyObject = AnyObject>({
  columns,
  onRow,
  dataSource,
  rowClick,
  rowSelection,
}: IBodyRowProps<RecordType>) => {
  const handleRowClick = (
    rowSelected: boolean,
    item: RecordType,
    ignoreRowClick: boolean = false,
  ) => {
    if (!ignoreRowClick) {
      rowClick?.(item);
    }

    if (rowSelection?.onChange) {
      const selectedItems = rowSelection.selectedItems
        ? [...rowSelection.selectedItems]
        : [];

      if (rowSelected) {
        selectedItems.splice(selectedItems.indexOf(item), 1);
        rowSelection.onChange({
          selectedItem: undefined,
          selectedItems,
        });
      } else {
        selectedItems.push(item);
        rowSelection.onChange({
          selectedItem: item,
          selectedItems,
        });
      }
    }
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
      <tbody>
        {dataSource &&
          dataSource.map((row, rowIndex) => {
            const rowSelected =
              rowSelection?.selectedItem === row ||
              !!rowSelection?.selectedItems?.find((x) => x === row);

            const { className, ...attributes } = onRow
              ? onRow(row) ?? { className: undefined }
              : { className: undefined };
            return (
              columns && (
                <tr
                  {...attributes}
                  key={rowIndex}
                  aria-selected={rowSelected}
                  className={classNames(className, {
                    'cursor-pointer': !!rowSelection || !!rowClick,
                    [rowSelection?.selectedClass ?? '']: rowSelected,
                  })}
                >
                  {rowSelection?.selectedCell && (
                    <td
                      className="text-center"
                      onClick={() => handleRowClick(rowSelected, row, true)}
                    >
                      {rowSelection.selectedCell({ selected: rowSelected })}
                    </td>
                  )}
                  {columns.map((col, colIndex) => (
                    <BodyCell
                      column={col}
                      row={row}
                      key={colIndex}
                      fixedPos={calcFixedPos(columns, colIndex, col.fixed)}
                      onClick={() => handleRowClick(rowSelected, row, col.ignoreRowClick)}
                    />
                  ))}
                </tr>
              )
            );
          })}
      </tbody>
    </>
  );
};
