import { useState } from 'react';
import { Flex } from '@components/layout/flex';
import { Meta, StoryObj } from '@storybook/react';

import { IDatePickerProps } from './DatePicker.types';
import { DatePicker } from '.';

const meta: Meta<IDatePickerProps> = {
  title: 'components/data-entry/DatePicker',
  component: DatePicker,

  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<IDatePickerProps>;

export const Default: Story = {
  render: function Render(args) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
      <Flex className="h-[400px]">
        <DatePicker {...args} selectedDate={selectedDate} onChange={setSelectedDate} />
      </Flex>
    );
  },
  args: {},
};
