import { AnyObject } from '@models';

import { ITableColGroupProps } from './ColGroup.types';

export const TableColGroup = <RecordType extends AnyObject = AnyObject>({
  showSelectedCell,
  selectedColWidth,
  allColumns,
}: ITableColGroupProps<RecordType>) => {
  return (
    <>
      {allColumns && (
        <colgroup>
          {showSelectedCell && <col style={{ width: selectedColWidth ?? 80 }} />}
          {allColumns?.map((column, index) => {
            return <col key={index} width={column.width ?? 'auto'} />;
          })}
        </colgroup>
      )}
    </>
  );
};
