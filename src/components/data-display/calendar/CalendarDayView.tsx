import { calendarExClasses } from './CalendarClasses';
import { CalendarDay } from './CalendarDay';
import { CalendarWeekNames } from './CalendarWeekNames';
import { useCalendar } from './useCalendar';

export const CalendarDayView = ({ index = 0 }: { index?: number }) => {
  const { calendarDate } = useCalendar(index);

  return (
    <>
      <CalendarWeekNames index={index} />
      {Array.from({ length: 6 }).map((r, rIndex) => (
        <div className={calendarExClasses.week.root} key={rIndex}>
          {Array.from({ length: 7 }).map((c, cIndex) => {
            const date = calendarDate.day(0).add(rIndex * 7 + cIndex, 'days');
            return <CalendarDay index={index} date={date} key={cIndex} />;
          })}
        </div>
      ))}
    </>
  );
};
