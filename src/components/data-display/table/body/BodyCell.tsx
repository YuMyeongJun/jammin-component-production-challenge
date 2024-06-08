import { AnyObject } from '@models';
import classNames from 'classnames';
import * as objectPath from 'object-path';

import { tableClasses } from '../TableClasses';

import { IBodyCellProps } from './Body.types';

export const BodyCell = <RecordType extends AnyObject = AnyObject>({
  row,
  column,
  fixedPos,
  onClick,
}: IBodyCellProps<RecordType>) => {
  const getSafeRender = (value: unknown) => {
    if (value === undefined || value === null) {
      return undefined;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return <>{value}</>;
  };

  return (
    <td
      className={classNames(
        tableClasses['text-align'][column.align ?? 'left'],
        column.className,
        {
          'td-fixed': !!column.fixed,
          'td-fixed-left': column.fixed === 'left',
          'td-fixed-right': column.fixed === 'right',
        },
      )}
      style={
        column.fixed && {
          left: column.fixed === 'left' ? fixedPos ?? 0 : undefined,
          right: column.fixed === 'right' ? fixedPos ?? 0 : undefined,
        }
      }
      onClick={onClick}
    >
      {column.render
        ? column.render(column.path ? objectPath.get(row, column.path) : undefined, row)
        : column.path
          ? getSafeRender(objectPath.get(row, column.path))
          : undefined}
    </td>
  );
};
