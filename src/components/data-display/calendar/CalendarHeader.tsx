import {
  IcArrowLeft,
  IcArrowLeftDouble,
  IcArrowRight,
  IcArrowRightDouble,
} from '@assets/icons';
import { Button } from '@components/general';
import classNames from 'classnames';

import { ICalendarHeaderProps } from './Calendar.types';
import { calendarExClasses } from './CalendarClasses';
import { useCalendar } from './useCalendar';

export const CalendarHeader = ({
  headerFormat,
  hideNextYear,
  hidePrevYear,
  hideNextMonth,
  hidePrevMonth,
  index = 0,
}: ICalendarHeaderProps) => {
  const {
    calendarDate,
    locale,
    handlePrevYear,
    handlePrevMonth,
    handleNextMonth,
    handleNextYear,
  } = useCalendar(index);

  return (
    <div className={calendarExClasses.header.wrap}>
      <div className={classNames(calendarExClasses.header.buttonWrap, 'justify-end')}>
        {!hidePrevYear && (
          <Button size="sm" shape="circle" variant="text" onClick={handlePrevYear}>
            <IcArrowLeftDouble />
          </Button>
        )}
        {!hidePrevMonth && (
          <Button size="sm" shape="circle" variant="text" onClick={handlePrevMonth}>
            <IcArrowLeft />
          </Button>
        )}
      </div>
      <div className={calendarExClasses.header.title}>
        <span>{calendarDate.locale(locale).format(headerFormat)}</span>
      </div>
      <div className={classNames(calendarExClasses.header.buttonWrap, 'justify-start')}>
        {!hideNextMonth && (
          <Button size="sm" shape="circle" variant="text" onClick={handleNextMonth}>
            <IcArrowRight />
          </Button>
        )}
        {!hideNextYear && (
          <Button size="sm" shape="circle" variant="text" onClick={handleNextYear}>
            <IcArrowRightDouble />
          </Button>
        )}
      </div>
    </div>
  );
};
