import { IcHandle } from '@assets/icons';
import { Meta, StoryObj } from '@storybook/react';

import { ITabProps, Tab } from '.';

const meta: Meta = {
  title: 'components/data-display/Tab',
  component: Tab,
  tags: ['autodocs'],
};

const onChange = (key: string) => {
  console.log(key);
};

export default meta;
type Story = StoryObj<ITabProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <div style={{ background: '#f9f9f9' }}>
        <Tab {...args} items={args.items} onChange={() => onChange}></Tab>
      </div>
    );
  },
  args: {
    type: 'horizontal',
    placement: 'left',
    variant: 'solid',
    color: 'primary',
    defaultTab: 1,
    size: 'sm',
    items: [
      {
        key: 1,
        label: 'Tab 1',
        children: 'Tab 1 contents',
      },
      {
        key: 2,
        label: 'Tab 2',
        children: 'Tab 2 contents',
      },
      {
        key: 3,
        label: 'Tab 3',
        children: 'Tab 3 contents',
      },
    ],
  },
};

export const Underline: Story = {
  render: (args) => {
    return (
      <div>
        <Tab {...args} items={args.items} onChange={() => onChange}></Tab>
      </div>
    );
  },
  args: {
    type: 'horizontal',
    placement: 'left',
    variant: 'underline',
    defaultTab: 1,
    size: 'sm',
    gap: 3,
    items: [
      {
        key: 1,
        label: 'Tab 1',
        children: 'Tab 1 contents',
      },
      {
        key: 2,
        label: 'Tab 2',
        children: 'Tab 2 contents',
      },
      {
        key: 3,
        label: 'Tab 3',
        children: 'Tab 3 contents',
      },
    ],
  },
};

export const TabClose: Story = {
  render: (args) => {
    return (
      <div style={{ background: '#f9f9f9' }}>
        <Tab
          {...args}
          items={args.items}
          tabIcon={<IcHandle />}
          onChange={() => onChange}
        ></Tab>
      </div>
    );
  },
  args: {
    type: 'horizontal',
    placement: 'left',
    variant: 'handle',
    defaultTab: 1,
    size: 'sm',
    gap: 3,
    closeIcon: true,
    items: [
      {
        key: 1,
        label: 'Tab 1',
        children: 'Tab 1 contents',
      },
      {
        key: 2,
        label: 'Tab 2',
        children: 'Tab 2 contents',
      },
      {
        key: 3,
        label: 'Tab 3',
        children: 'Tab 3 contents',
      },
    ],
  },
};
