import { Meta, StoryObj } from '@storybook/react';

import { IRangeCalendarProps } from './Calendar.types';
import { RangeCalendar } from '.';

const meta: Meta<IRangeCalendarProps> = {
  title: 'components/data-display/RangeCalendar',
  component: RangeCalendar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<IRangeCalendarProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <RangeCalendar {...args} />
      </>
    );
  },
  argTypes: {},
  args: {},
};
