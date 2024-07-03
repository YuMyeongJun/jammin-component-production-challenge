import { Divider } from '@components/layout/divider';
import { Flex } from '@components/layout/flex';
import { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from './Dropdown';
import { IDropdownProps } from './Dropdown.types';

const meta: Meta<IDropdownProps> = {
  title: 'components/navigation/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '드롭다운 리스트',
  },
};

export default meta;
type Story = StoryObj<IDropdownProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <Flex
        style={{ height: '600px', border: '1px solid' }}
        justify="space-evenly"
        align="center"
      >
        <Dropdown
          boxClassName={args.boxClassName}
          className={args.className}
          placement={args.placement}
          menu={args.menu}
          trigger={args.trigger}
          boxColor={args.boxColor}
        >
          <div>click</div>
        </Dropdown>
      </Flex>
    );
  },
  argTypes: {},
  args: {
    trigger: 'click',
    boxClassName: 'p-0',
    className: 'bg-red-400',
    placement: 'bottom',
    boxColor: 'yellow',
    menu: (
      <>
        <div>test</div>
        <Divider />
        <div>test2</div>
      </>
    ),
  },
};
