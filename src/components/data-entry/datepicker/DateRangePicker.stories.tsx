import { useState } from 'react';
import { Flex } from '@components/layout/flex';
import { DateRangeType } from '@models';
import { Meta, StoryObj } from '@storybook/react';

import { IDateRangePickerProps } from './DatePicker.types';
import { DateRangePicker } from '.';

const meta: Meta<IDateRangePickerProps> = {
  title: 'components/data-entry/DateRangePicker',
  component: DateRangePicker,

  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<IDateRangePickerProps>;

export const Default: Story = {
  render: function Render(args) {
    const [selectedDate, setSelectedDate] = useState<DateRangeType>([null, null]);
    return (
      <Flex className="h-[400px]">
        <DateRangePicker
          selectedDate={selectedDate}
          onChange={(v) => {
            console.log('v', v);
            setSelectedDate(v);
          }}
        />
      </Flex>
    );
  },
  args: {},
};
