import { calendarExClasses } from './CalendarClasses';
import { useCalendar } from './useCalendar';

export const CalendarWeekNames = ({ index = 0 }: { index?: number }) => {
  const { calendarDate, locale } = useCalendar(index);

  const start = calendarDate.day(0);

  return (
    <div className={calendarExClasses.weeknames.wrap}>
      <div className={calendarExClasses.weeknames.item}>
        {start.locale(locale).format('ddd')}
      </div>
      <div className={calendarExClasses.weeknames.item}>
        {start.add(1, 'day').locale(locale).format('ddd')}
      </div>
      <div className={calendarExClasses.weeknames.item}>
        {start.add(2, 'day').locale(locale).format('ddd')}
      </div>
      <div className={calendarExClasses.weeknames.item}>
        {start.add(3, 'day').locale(locale).format('ddd')}
      </div>
      <div className={calendarExClasses.weeknames.item}>
        {start.add(4, 'day').locale(locale).format('ddd')}
      </div>
      <div className={calendarExClasses.weeknames.item}>
        {start.add(5, 'day').locale(locale).format('ddd')}
      </div>
      <div className={calendarExClasses.weeknames.item}>
        {start.add(6, 'day').locale(locale).format('ddd')}
      </div>
    </div>
  );
};
