import { createContext, useCallback, useEffect, useState } from 'react';
import { useControlled } from '@hooks';
import { datejs, datejsOrNull, dayjsOrNull, dayjsSame } from '@modules';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { ICalendarProviderProps } from '.';

dayjs.extend(isBetween);

export const CalendarContext = createContext<
  | {
      isRange?: boolean;
      range: [Dayjs | null, Dayjs | null];
      setRange: (date: [Dayjs | null, Dayjs | null]) => void;
      setHoverDate: (date: Dayjs | null) => void;
      today: Dayjs;
      selectedDate?: [Date | null, Date | null];
      hoverDate: Dayjs | null;
      calendarDate: Dayjs;
      calendarCount: number;
      locale: string;
      onChange: (date: [Dayjs | null, Dayjs | null]) => void;
      handlePrevMonth: () => void;
      handleNextMonth: () => void;
      handlePrevYear: () => void;
      handleNextYear: () => void;
      disableDates?: (date: Date) => boolean;
      hasItemDates?: Date[];
      maxLength?: number;
      maxLengthUnit?: 'd' | 'M' | 'y';
      quickButtons?: { label: string; start: Date; end: Date }[];
    }
  | undefined
>(undefined);

export const CalendarProvider = ({
  calendarCount = 1,
  isRange,
  selectedDate: selectedDateProp,
  defaultSelectedDate,
  locale,
  children,
  onChange,
  disableDates,
  hasItemDates,
  maxLength,
  maxLengthUnit,
  quickButtons,
  onMonthChange,
}: ICalendarProviderProps) => {
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [hoverDate, setHoverDate] = useState<Dayjs | null>(null);
  const [selectedDate, setSelectedDateState] = useControlled<[Date | null, Date | null]>({
    controlled: selectedDateProp,
    defaultValue: defaultSelectedDate ?? [null, null],
  });
  const [calendarDate, setCalendarDate] = useState(dayjs().startOf('D').startOf('M'));

  const today = dayjs().startOf('D');

  const handleChangeSelectedDate = (date: [Dayjs | null, Dayjs | null]) => {
    const selected: [Date | null, Date | null] = [
      date[0]?.toDate() ?? null,
      date[1]?.toDate() ?? null,
    ];

    if (!selectedDateProp) {
      setSelectedDateState(selected);
    }
    onChange?.(selected);
  };

  const handlePrevMonth = useCallback(() => {
    setCalendarDate((d) => {
      const date = d.add(-1, 'M');
      onMonthChange?.(date.toDate());
      return date;
    });
  }, [onMonthChange]);

  const handleNextMonth = useCallback(() => {
    setCalendarDate((d) => {
      const date = d.add(1, 'M');
      onMonthChange?.(date.toDate());
      return date;
    });
  }, [onMonthChange]);

  const handlePrevYear = useCallback(() => {
    setCalendarDate((d) => {
      const date = d.add(-1, 'y');
      onMonthChange?.(date.toDate());
      return date;
    });
  }, [onMonthChange]);

  const handleNextYear = useCallback(() => {
    setCalendarDate((d) => {
      const date = d.add(1, 'y');
      onMonthChange?.(date.toDate());
      return date;
    });
  }, [onMonthChange]);

  const reset = useCallback(
    (date: [Date | null, Date | null]) => {
      if (dayjsSame(range[0], date[0]) && dayjsSame(range[1], date[1])) {
        return;
      }

      if (date[0] || date[1]) {
        setCalendarDate((cDate) => {
          const endDate = cDate.add(calendarCount - 1, 'M').endOf('M');
          const sIn = dayjsOrNull(date[0])?.isBetween(cDate, endDate, 'D', '[]');
          const eIn = dayjsOrNull(date[1])?.isBetween(cDate, endDate, 'D', '[]');
          if (!sIn && !eIn) {
            const newDate = dayjs(date[0]).startOf('D').startOf('M');
            if (!dayjsSame(newDate, cDate)) {
              onMonthChange?.(newDate.toDate());
              return newDate;
            }
          }

          return cDate;
        });
      }
      setRange([datejsOrNull(date[0]), datejsOrNull(date[1])]);
    },
    [calendarCount, onMonthChange],
  );

  useEffect(() => {
    reset(selectedDate);
  }, [selectedDate, reset]);

  return (
    <CalendarContext.Provider
      value={{
        isRange,
        range,
        setRange,
        hoverDate,
        setHoverDate,
        today,
        selectedDate,
        onChange: handleChangeSelectedDate,
        calendarDate,
        calendarCount,
        locale,
        handlePrevMonth,
        handleNextMonth,
        handlePrevYear,
        handleNextYear,
        disableDates,
        hasItemDates,
        maxLength,
        maxLengthUnit,
        quickButtons,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
