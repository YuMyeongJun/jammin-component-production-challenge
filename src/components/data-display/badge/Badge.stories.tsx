import { Badge } from '@components/data-display/badge';
import { Flex } from '@components/layout/flex';
import { Meta, StoryObj } from '@storybook/react';

import { IBadgeProps } from './Badge.types';

const meta: Meta = {
  title: 'components/data-display/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: 'Badge 적용 컴포넌트',
  },
};

export default meta;
type Story = StoryObj<IBadgeProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <Flex style={{ height: 100, border: '1px solid' }} justify="center" align="center">
        <Badge
          count={args.count}
          overflowCount={args.overflowCount}
          color={args.color}
          dot={args.dot}
          showZero={args.showZero}
          direction={args.direction}
        >
          <div style={{ border: '1px solid' }}>test</div>
        </Badge>
      </Flex>
    );
  },
  args: {
    color: '',
    count: 1,
    dot: false,
    overflowCount: 99,
    showZero: false,
    direction: 'right',
  },
};

export const Dot: Story = {
  render: () => {
    return (
      <Flex style={{ height: 100, border: '1px solid' }} justify="center" align="center">
        <Badge dot>
          <div style={{ border: '1px solid' }}>test</div>
        </Badge>
      </Flex>
    );
  },
};

export const ShowZero: Story = {
  render: () => {
    return (
      <Flex style={{ height: 100, border: '1px solid' }} justify="center" align="center">
        <Badge showZero count={0}>
          <div style={{ border: '1px solid' }}>test</div>
        </Badge>
      </Flex>
    );
  },
};

export const overflowCount: Story = {
  render: () => {
    return (
      <Flex style={{ height: 100, border: '1px solid' }} justify="center" align="center">
        <Badge count={1900} overflowCount={1000}>
          <div style={{ border: '1px solid' }}>test</div>
        </Badge>
      </Flex>
    );
  },
};
