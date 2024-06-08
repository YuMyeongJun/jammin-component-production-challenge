import { useState } from 'react';
import { AnyObject } from '@models';
import { datejs } from '@modules';
import { Meta, StoryObj } from '@storybook/react';

import { ICalendarProps } from './Calendar.types';
import { Calendar } from '.';

const meta: Meta<ICalendarProps> = {
  title: 'components/data-display/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ICalendarProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <Calendar {...args} />
      </>
    );
  },
  argTypes: {},
  args: {},
};

export const DisableDates: Story = {
  render: (args) => {
    return (
      <>
        <Calendar {...args} />
      </>
    );
  },
  argTypes: {},
  args: {
    disableDates: (date) => datejs(date).isBefore(datejs(), 'day'),
  },
};

export const HasItems: Story = {
  render: (args) => {
    return (
      <>
        <Calendar {...args} />
      </>
    );
  },
  argTypes: {},
  args: {
    hasItemDates: [datejs().toDate()],
  },
};
