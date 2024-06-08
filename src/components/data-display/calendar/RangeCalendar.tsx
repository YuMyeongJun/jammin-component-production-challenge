import classNames from 'classnames';

import { calendarExClasses } from './CalendarClasses';
import { CalendarProvider } from './CalendarContext';
import { CalendarDayView } from './CalendarDayView';
import { CalendarHeader } from './CalendarHeader';
import { RangeCalendarQuck } from './RangeCalendarQuck';
import { IRangeCalendarProps } from '.';

export const RangeCalendar = ({
  calendarCount = 2,
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
  maxLength,
  maxLengthUnit = 'd',
  quickButtons,
}: IRangeCalendarProps) => {
  return (
    <div className={classNames(calendarExClasses.wrap, className)}>
      <CalendarProvider
        isRange={true}
        selectedDate={selectedDate}
        defaultSelectedDate={defaultSelectedDate}
        locale={locale}
        onChange={onChange}
        disableDates={disableDates}
        hasItemDates={hasItemDates}
        calendarCount={calendarCount}
        maxLength={maxLength}
        maxLengthUnit={maxLengthUnit}
        quickButtons={quickButtons}
      >
        <RangeCalendarQuck />
        <div className="inline-flex">
          {Array.from({ length: calendarCount }).map((r, index) => (
            <div key={index}>
              <CalendarHeader
                index={index}
                headerFormat={headerFormat}
                hideNextYear={hideNextYear || calendarCount > index + 1}
                hidePrevYear={hidePrevYear || index > 0}
                hideNextMonth={calendarCount > index + 1}
                hidePrevMonth={index > 0}
              />
              <CalendarDayView index={index} />
            </div>
          ))}
        </div>
      </CalendarProvider>
    </div>
  );
};
