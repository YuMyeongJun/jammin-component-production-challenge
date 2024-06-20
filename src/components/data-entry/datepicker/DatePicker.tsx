import { useEffect, useState } from 'react';
import { IcCalendar } from '@assets/icons';
import { Calendar } from '@components';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { Input } from '..';

import { IDatePickerProps } from './DatePicker.types';
import { datePickerClasses } from './DatePickerClasses';

export const DatePicker = ({
  selectedDate,
  onChange,
  hasItemDates,
  disableDates,
  hideNextYear,
  hidePrevYear,
  format = 'YYYY-MM-DD',
  calendarIcon = <IcCalendar width={16} height={16} />,
  controlSize = 'md',
  className,
  placeholder = 'YYYY-MM-DD',
  ...inputProps
}: IDatePickerProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const handleChangeDate = () => {
    if (inputValue === '') {
      onChange?.(null);
      return;
    }
    const date = dayjs(inputValue);
    if (date.isValid() && !disableDates?.(date.toDate())) {
      setInputValue(date.format(format));
      onChange?.(date.toDate());
    } else {
      setInputValue(selectedDate ? dayjs(selectedDate).format(format) : '');
    }
  };

  useEffect(() => {
    setInputValue(selectedDate ? dayjs(selectedDate).format(format) : '');
  }, [selectedDate, format]);

  return (
    <div
      className={classNames(
        datePickerClasses.wrap,
        datePickerClasses.size[controlSize],
        'group',
      )}
    >
      <Input
        value={inputValue}
        controlSize={controlSize}
        className={classNames(className, 'w-full')}
        {...inputProps}
        placeholder={placeholder}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onBlur={handleChangeDate}
        autoComplete="off"
        suffix={calendarIcon}
        onPressEnter={() => handleChangeDate()}
      />
      <Calendar
        className={classNames(datePickerClasses.calendar, {
          'group-focus-within:block': !inputProps.disabled,
          'group-active:block': !inputProps.disabled,
        })}
        selectedDate={selectedDate}
        hasItemDates={hasItemDates}
        disableDates={disableDates}
        hideNextYear={hideNextYear}
        hidePrevYear={hidePrevYear}
        onChange={onChange}
      />
    </div>
  );
};
