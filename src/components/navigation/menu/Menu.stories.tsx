import { IcCalendar } from '@assets/icons';
import { Meta, StoryObj } from '@storybook/react';

import { IMenuProps, Menu, MenuItem } from '.';

const meta: Meta<IMenuProps> = {
  title: 'components/navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<IMenuProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="flex h-[400px] w-full border border-gray-200">
        <div className="m-2 overflow-y-auto rounded-lg bg-primary-dark p-4">
          <Menu {...args} />
        </div>
        <div></div>
      </div>
    );
  },
  argTypes: {},
  args: {
    popContainerClassName: 'bg-primary-dark',
    selectedMenuKey: '1',
    children: (
      <>
        <MenuItem
          icon={<IcCalendar className="fill-gray-100" />}
          menuKey="1"
          path="/"
          title="Dashboard"
        />
        <MenuItem
          menuKey="2"
          path="/"
          title="Tasks"
          icon={<IcCalendar className="fill-gray-100" />}
        >
          <MenuItem
            menuKey="2-1"
            path="/"
            title="Tasks1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
          />
          <MenuItem
            menuKey="2-2"
            path="/"
            title="22222222222222222222222222222222222222222222222222222222222222"
          >
            <MenuItem menuKey="2-2-1" path="/" title="Tasks22">
              <MenuItem menuKey="2-2-1-1" path="/" title="Tasks22">
                <MenuItem menuKey="2-2-1-1-1" path="/" title="Tasks22" />
              </MenuItem>
            </MenuItem>
          </MenuItem>
        </MenuItem>
        <MenuItem
          menuKey="3"
          path="/"
          title="Settings"
          icon={<IcCalendar className="fill-gray-100" />}
        >
          <MenuItem menuKey="3-1" path="/" title="Settings" />
          <MenuItem menuKey="3-2" path="/" title="Settings" />
        </MenuItem>
      </>
    ),
  },
};
