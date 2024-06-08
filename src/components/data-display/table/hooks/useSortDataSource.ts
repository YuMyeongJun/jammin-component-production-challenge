import { useEffect, useState } from 'react';
import { AnyObject } from '@models';
import * as objectPath from 'object-path';
import { Path } from 'object-path';

import { IColumn, ISortInfo } from '../Table.types';

export const useSortDataSource = <T extends AnyObject = AnyObject>(args: {
  columns?: IColumn<T>[];
  defaultSort?: ISortInfo[];
  dataSource?: T[];
  serverSort?: ISortInfo[];
  isSingleSort?: boolean;
  onSortChanged?: (sortInfo: ISortInfo[]) => void;
}) => {
  const [sortInfo, setSortInfo] = useState<ISortInfo[]>(
    args.serverSort ?? args.defaultSort ?? [],
  );
  const isSort = !!args.columns?.find((x) => x.sortable) && sortInfo.length > 0;
  const isServerSort = !!args.serverSort;

  useEffect(() => {
    if (args.serverSort) {
      setSortInfo(args.serverSort);
    }
  }, [args.serverSort]);

  const setSortColumn = ({ path, sortable }: { path?: Path; sortable?: boolean }) => {
    if (!sortable || !path) {
      return;
    }

    const sortResult: ISortInfo[] = [];
    const found = sortInfo.find((x) => x.path === path);

    if (!found) {
      if (args.isSingleSort) {
        sortResult.push({ path: path, direction: 'ascending' });
      } else {
        sortResult.push(...sortInfo, { path: path, direction: 'ascending' });
      }
    } else if (found.direction === 'descending') {
      sortInfo.splice(sortInfo.indexOf(found), 1);
      sortResult.push(...sortInfo);
    } else {
      found.direction = found.direction === 'ascending' ? 'descending' : 'ascending';
      sortResult.push(...sortInfo);
    }

    if (!isServerSort) {
      setSortInfo(sortResult);
    }

    args.onSortChanged?.(sortResult);
  };

  const sortItems = [...(args.dataSource ?? [])];
  if (isSort && !isServerSort) {
    sortItems?.sort((a, b) => {
      const sortValue = sortInfo.reduce((result, si) => {
        if (result !== 0) {
          return result;
        }

        const av = si.direction === 'ascending' ? 1 : -1;
        const dv = si.direction === 'ascending' ? -1 : 1;
        const v =
          objectPath.get(a, si.path) === objectPath.get(b, si.path)
            ? 0
            : objectPath.get(a, si.path) > objectPath.get(b, si.path)
              ? av
              : dv;

        return v;
      }, 0);
      return sortValue;
    });
  }

  return { sortInfo, setSortColumn, sortItems };
};
