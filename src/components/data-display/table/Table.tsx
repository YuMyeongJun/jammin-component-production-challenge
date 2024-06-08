import React, { ReactElement, Ref, UIEvent, useEffect, useRef } from 'react';
import { Checkbox, Flex, Pagination, Select, Spin } from '@components';
import { AnyObject } from '@models';
import classNames from 'classnames';

import { TableColGroup } from './col-group/ColGroup';
import { BodyRow } from './body';
import { HeaderRow } from './header';
import { convertChildrenToColumns, usePagenation, useSortDataSource } from './hooks';
import { ColumnsType, IColumn, ITableProps } from './Table.types';
import { tableClasses } from './TableClasses';

export const TableComp = <RecordType extends AnyObject = AnyObject>(
  {
    columns,
    dataSource,
    rounded,
    bordered,
    empty = '데이터가 존재하지 않습니다.',
    size = 'normal',
    loading,
    wrapClassName,
    children,
    rowClick,
    rowSelection,
    defaultSort,
    pagenation,
    onRow,
    tableHeight,
    serverSort,
    onSortChanged,
    isSingleSort,
    hideHeader,
    tableObserver,
    ...tableProps
  }: ITableProps<RecordType>,
  ref: Ref<HTMLTableElement>,
) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const baseColumns = React.useMemo(
    () => columns || convertChildrenToColumns<RecordType>(children),
    [columns, children],
  );

  const getColumns = (cols?: ColumnsType<RecordType>): IColumn<RecordType>[] => {
    if (!cols) {
      return [];
    }

    const result = cols.map((c) => {
      if ('children' in c) {
        return getColumns(c.children);
      } else {
        return [c];
      }
    });

    return result.flat();
  };

  const allColumns = getColumns(baseColumns);

  const { sortInfo, setSortColumn, sortItems } = useSortDataSource({
    columns: allColumns,
    dataSource,
    defaultSort,
    serverSort,
    onSortChanged,
    isSingleSort,
  });

  const { resultItems } = usePagenation(pagenation, sortItems);
  const {
    sizeChangers,
    sizeChangerWidth,
    showSizeChanger,
    onChange,
    ...pagenationProps
  } = pagenation ?? {};
  if (!!rowSelection && !rowSelection.selectionType) {
    rowSelection.selectionType = 'default';
  }

  if (rowSelection?.selectionType === 'checkbox') {
    rowSelection.selectedCell = ({ selected }) => <Checkbox checked={selected} />;
  }

  useEffect(() => {
    rowSelection?.onChange?.({ selectedItems: [], selectedItem: undefined });
  }, [sortInfo, dataSource]);

  return (
    <div
      className={classNames(tableClasses.wrap, wrapClassName, tableClasses.size[size], {
        [tableClasses.rounded]: rounded,
        [tableClasses.border]: bordered,
      })}
    >
      <div
        className="grow overflow-auto"
        onScroll={(e) => {
          const el = e.target as HTMLDivElement;
          if (el.scrollLeft !== 0) {
            el.classList.add('left-shadow');
          } else {
            el.classList.remove('left-shadow');
          }
        }}
      >
        <div className="relative">
          <table {...tableProps} ref={ref}>
            <TableColGroup
              allColumns={allColumns}
              selectedColWidth={rowSelection?.selectedColWidth}
              showSelectedCell={!!rowSelection?.selectedCell}
            />
            {!hideHeader && (
              <HeaderRow
                columns={baseColumns}
                sortInfo={sortInfo}
                dataSource={resultItems}
                setSortColumn={setSortColumn}
                rowSelection={rowSelection}
              />
            )}

            <BodyRow
              onRow={onRow}
              columns={allColumns}
              dataSource={resultItems}
              rowClick={rowClick}
              rowSelection={rowSelection}
            />
          </table>
          {!resultItems.length && !loading && (
            <div className={tableClasses.empty}>{empty}</div>
          )}
          {tableObserver}
        </div>
      </div>
      {loading && (
        <div className={tableClasses.loading}>
          <Spin type={loading === true ? 'spinningBubbles' : loading} spinning={true} />
        </div>
      )}
      {!!pagenation && !!resultItems.length && (
        <div className="flex items-center justify-between border-t bg-white p-1">
          <div style={{ width: sizeChangerWidth ?? 150 }}>
            {showSizeChanger && (
              <Select
                controlSize={pagenation.size}
                fullWidth
                options={(sizeChangers ?? [10, 30, 50]).map((x) => ({
                  label: `${String(x)}개씩 보기`,
                  value: String(x),
                }))}
                value={String(pagenation.perPage)}
                onChange={(v) =>
                  pagenation.onChange?.(null, 1, v ? Number(v) : undefined)
                }
              />
            )}
          </div>

          <Pagination
            {...pagenationProps}
            onChange={(e, p) => pagenation.onChange?.(e, p, pagenation.perPage)}
          />
          <div style={{ width: sizeChangerWidth ?? 150 }}></div>
        </div>
      )}
    </div>
  );
};

export const Table = React.forwardRef(TableComp) as <T extends AnyObject = AnyObject>(
  p: ITableProps<T> & { ref?: Ref<HTMLTableElement> },
) => ReactElement;
