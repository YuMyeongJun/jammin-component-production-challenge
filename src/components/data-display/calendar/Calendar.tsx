import { useCallback } from 'react';
import { DateRangeType } from '@models';
import classNames from 'classnames';

import 'dayjs/locale/ko';

import { ICalendarProps } from './Calendar.types';
import { calendarExClasses } from './CalendarClasses';
import { CalendarProvider } from './CalendarContext';
import { CalendarDayView } from './CalendarDayView';
import { CalendarHeader } from './CalendarHeader';

export const Calendar = ({
  selectedDate,
  defaultSelectedDate,
  locale = 'ko',
  headerFormat = 'YYYY년 MMMM',
  className,
  onChange,
  hidePrevYear,
  hideNextYear,
  disableDates,
  hasItemDates,
  onMonthChange,
}: ICalendarProps) => {
  const handleDateChange = useCallback(
    (r: DateRangeType) => onChange?.(r?.[0] ?? null),
    [onChange],
  );

  return (
    <div className={classNames(calendarExClasses.wrap, className)}>
      <CalendarProvider
        selectedDate={selectedDate === undefined ? undefined : [selectedDate, null]}
        defaultSelectedDate={[defaultSelectedDate ?? null, null]}
        locale={locale}
        onChange={handleDateChange}
        disableDates={disableDates}
        hasItemDates={hasItemDates}
        onMonthChange={onMonthChange}
      >
        <div>
          <CalendarHeader
            headerFormat={headerFormat}
            hideNextYear={hideNextYear}
            hidePrevYear={hidePrevYear}
          />
          <CalendarDayView />
        </div>
      </CalendarProvider>
    </div>
  );
};
