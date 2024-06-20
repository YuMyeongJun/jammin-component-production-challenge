import { useRef, useState } from 'react';
import { IcCalendar, IcDropdown } from '@assets/icons';
import { RangeCalendar } from '@components';
import { Button } from '@components/general';
import { useOutsideClick } from '@hooks';
import { dayjsOrNull } from '@modules';
import classNames from 'classnames';

import { Input } from '..';

import { IDateRangePickerProps } from './DatePicker.types';
import { datePickerClasses } from './DatePickerClasses';

export const DateRangePicker = ({
  selectedDate,
  onChange,
  hasItemDates,
  disableDates,
  format = 'YYYY-MM-DD',
  controlSize = 'md',
  calendarCount,
  isError,
  startPlaceholder = 'YYYY-MM-DD',
  endPlaceholder = 'YYYY-MM-DD',
  maxLength,
  maxLengthUnit,
  quickButtons,
  placement = 'left',
  className,
  calendarIcon = <IcCalendar width={16} height={16} />,
}: IDateRangePickerProps) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClick(rootRef, () => {
    if (showCalendar) {
      handleHideCalendar();
    }
  });

  const handleApply = () => {
    onChange?.(range);
    handleHideCalendar();
  };

  const handleHideCalendar = () => {
    setRange([null, null]);
    setShowCalendar(false);
  };

  const handleShowCalendar = () => {
    if (showCalendar) {
      return;
    }
    setShowCalendar(true);
    setRange(selectedDate ?? [null, null]);
  };

  return (
    <div
      className={classNames(
        className,
        datePickerClasses.wrap,
        datePickerClasses.size[controlSize],
      )}
      ref={rootRef}
    >
      <Input
        readOnly
        className={datePickerClasses.range}
        controlSize={controlSize}
        value={
          selectedDate?.[0] && selectedDate?.[1]
            ? `${dayjsOrNull(selectedDate?.[0])?.format(format) ?? ''} ~ ${dayjsOrNull(selectedDate?.[1])?.format(format) ?? ''}`
            : ''
        }
        placeholder={`${startPlaceholder} ~ ${endPlaceholder}`}
        autoComplete="off"
        customPrefix={calendarIcon}
        suffix={<IcDropdown />}
        isError={isError}
        onFocus={() => {
          handleShowCalendar();
        }}
      />
      <div
        className={classNames(datePickerClasses.calendar, {
          '!flex': showCalendar,
          'right-0': placement === 'right',
        })}
      >
        <RangeCalendar
          className="p-0"
          selectedDate={range}
          hasItemDates={hasItemDates}
          disableDates={disableDates}
          onChange={setRange}
          maxLength={maxLength}
          maxLengthUnit={maxLengthUnit}
          calendarCount={calendarCount}
          quickButtons={quickButtons}
        />
        <div className="flex justify-end">
          <div className="flex gap-3">
            <Button color="primary" onClick={() => handleHideCalendar()}>
              취소
            </Button>
            <Button color="primary" variant="contained" onClick={() => handleApply()}>
              적용
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
