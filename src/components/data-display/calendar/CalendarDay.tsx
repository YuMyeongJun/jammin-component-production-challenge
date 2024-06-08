import { useCallback } from 'react';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';

import { calendarExClasses } from './CalendarClasses';
import { useCalendar } from './useCalendar';
import { useCalendarDay } from './useCalendarDay';
import { ICalendarDayProps } from '.';

export const CalendarDay = ({ date, index = 0 }: ICalendarDayProps) => {
  const { isRange, range, setRange, setHoverDate, onChange, hasItemDates } =
    useCalendar(index);

  const { disabled, ended, hasItem, isOutOfMonth, isToday, ranged, selected, started } =
    useCalendarDay(date, index);

  const handleChange = () => {
    if (disabled) {
      return;
    }

    if (isRange) {
      if (range[0] === null || (range[0] && range[1])) {
        setRange([date, null]);
      } else {
        setRange([null, null]);
        if (range[0].isAfter(date)) {
          onChange([date, range[0]]);
        } else {
          onChange([range[0], date]);
        }
      }
    } else {
      onChange([date, null]);
    }
  };

  const handleSetHoverDate = (d: Dayjs | null) => {
    if (isRange && range[0] && !range[1] && !disabled) {
      setHoverDate(d);
    } else {
      setHoverDate(null);
    }
  };

  return (
    <div
      key={date.format('YYYYMMDD')}
      className={classNames(calendarExClasses.week.dayEx.wrap, {
        [calendarExClasses.week.dayEx.expandWrap]: !!hasItemDates,
      })}
      onClick={handleChange}
      onMouseEnter={() => handleSetHoverDate(date)}
      onMouseLeave={() => handleSetHoverDate(null)}
    >
      <div
        className={classNames({
          [calendarExClasses.week.dayEx.ranged.base]:
            (ranged || started || ended) && !(started && ended) && !isOutOfMonth,
          [calendarExClasses.week.dayEx.ranged.start]: started && !ended,
          [calendarExClasses.week.dayEx.ranged.end]: ended && !started,
        })}
      >
        <div
          aria-selected={selected}
          aria-disabled={disabled}
          className={classNames(calendarExClasses.week.dayEx.item.base, {
            [calendarExClasses.week.dayEx.item.today]: isToday,
            [calendarExClasses.week.dayEx.item.outOfMonth]: isOutOfMonth,
          })}
        >
          {date.format('D')}
        </div>
      </div>
      {!!hasItemDates && (
        <div className="flex h-2 items-center justify-center">
          {hasItem && (
            <div
              className={classNames(calendarExClasses.week.dayEx.hasitem.root, {
                [calendarExClasses.week.dayEx.hasitem.selected]: selected,
              })}
            ></div>
          )}
        </div>
      )}
    </div>
  );
};
