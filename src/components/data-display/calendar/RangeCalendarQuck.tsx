import { dayjsOrNull } from '@modules';

import { calendarExClasses } from './CalendarClasses';
import { useCalendar } from './useCalendar';

export const RangeCalendarQuck = () => {
  const { quickButtons, onChange } = useCalendar();
  return (
    <>
      {quickButtons?.length && (
        <div className={calendarExClasses.quick.wrap}>
          {quickButtons.map((q, index) => (
            <div
              key={index}
              className={calendarExClasses.quick.item}
              onClick={() => onChange?.([dayjsOrNull(q.start), dayjsOrNull(q.end)])}
            >
              {q.label}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
