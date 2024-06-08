import { useMemo } from 'react';
import { dayjsOrNull } from '@modules';
import dayjs, { Dayjs } from 'dayjs';

import { useCalendar } from './useCalendar';

export const useCalendarDay = (date: Dayjs, index: number) => {
  const {
    isRange,
    range,
    today,
    calendarDate,
    hoverDate,
    disableDates,
    hasItemDates,
    maxLength,
    maxLengthUnit,
  } = useCalendar(index);

  const isToday = today.isSame(date);
  const isOutOfMonth = !calendarDate.isSame(date, 'M');
  const r0 = dayjsOrNull(range[0])?.startOf('D');
  const r1 = dayjsOrNull(range[1])?.startOf('D');
  const selected = date.isSame(r0) || date.isSame(r1) || date.isSame(hoverDate);

  const disabled =
    (disableDates?.(date.toDate()) ?? false) ||
    (maxLength && range[0] && !range[1]
      ? !date.isBetween(
          range[0].add(maxLength, maxLengthUnit),
          range[0].add(-maxLength, maxLengthUnit),
          'd',
          '()',
        )
      : false);

  const hasItem = !!hasItemDates?.find((d) => dayjs(d).isSame(date));

  const started = useMemo(() => {
    if (!isRange || isOutOfMonth) {
      return false;
    }

    if (range[0]) {
      if (!range[1] && hoverDate) {
        if (range[0].isSame(hoverDate)) {
          return false;
        }
        return hoverDate.isAfter(range[0])
          ? date.isSame(range[0])
          : date.isSame(hoverDate);
      }

      if (range[1]) {
        return date.isSame(range[0]);
      }
    }

    return false;
  }, [date, hoverDate, isRange, range]);

  const ended = useMemo(() => {
    if (!isRange || isOutOfMonth) {
      return false;
    }

    if (range[0]) {
      if (!range[1] && hoverDate) {
        if (range[0].isSame(hoverDate)) {
          return false;
        }
        return hoverDate.isAfter(range[0])
          ? date.isSame(hoverDate)
          : date.isSame(range[0]);
      }

      if (range[1]) {
        return date.isSame(range[1]);
      }
    }

    return false;
  }, [isRange, date, hoverDate, range]);

  const ranged = useMemo(() => {
    if (!isRange) {
      return false;
    }

    if (!range[1] && hoverDate) {
      return hoverDate.isAfter(range[0])
        ? date.isAfter(range[0]) && date.isBefore(hoverDate)
        : date.isAfter(hoverDate) && date.isBefore(range[0]);
    } else {
      return date.isAfter(range[0]) && date.isBefore(range[1]);
    }
  }, [isRange, range, hoverDate, date]);

  return {
    isToday,
    isOutOfMonth,
    selected,
    disabled,
    hasItem,
    started,
    ended,
    ranged,
  };
};
