import { useContext } from 'react';

import { CalendarContext } from './CalendarContext';

export const useCalendar = (index: number = 0) => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('CalendarProvider를 감싸줘야 합니다.');
  }
  return { ...context, calendarDate: context.calendarDate.add(index, 'M') };
};
