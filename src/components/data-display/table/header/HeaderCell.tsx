import classNames from 'classnames';

import { tableClasses } from '../TableClasses';

import { IHeaderCellProps } from './Header.types';
import { HeaderSortIcon } from './HeaderSortIcon';

export const HeaderCell = ({
  title,
  path,
  colSpan,
  rowSpan,
  align,
  sortable,
  sortInfo,
  fixed,
  fixedPos,
  setSortColumn,
}: IHeaderCellProps) => {
  return (
    <th
      className={classNames(tableClasses['text-align'][align ?? 'left'], {
        [tableClasses.sortable.root]: sortable,
        'th-fixed': !!fixed,
        'th-fixed-left': fixed === 'left',
        'th-fixed-right': fixed === 'right',
      })}
      style={
        fixed && {
          left: fixed === 'left' ? fixedPos ?? 0 : undefined,
          right: fixed === 'right' ? fixedPos ?? 0 : undefined,
        }
      }
      colSpan={colSpan}
      rowSpan={rowSpan}
      onClick={() => setSortColumn?.({ path, sortable })}
    >
      {title}
      <HeaderSortIcon path={path} sortInfo={sortInfo} sortable={sortable} />
    </th>
  );
};
