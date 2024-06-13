import { Flex, Switch } from '@components';
import { Meta, StoryObj } from '@storybook/react';

import { ISwitchProps } from './Switch.types';

// 공통 props 정의
const commonProps: Partial<ISwitchProps> = {
  color: 'green',
  switchSize: 'md',
  switchType: 'outside',
  checked: true,
};

const meta: Meta<ISwitchProps> = {
  title: 'components/data-entry/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    switchType: {
      control: 'radio',
    },
    switchSize: {
      control: 'select',
    },
    color: {
      control: 'radio',
    },
  },
  parameters: {
    componentSubtitle: '스위치',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export default meta;

type Story = StoryObj<ISwitchProps>;

// 기본 스토리
export const Default: Story = {
  args: {
    ...commonProps,
    onChange: () => alert('on click'),
  },
};

// 색상 스토리
export const Color: Story = {
  render: () => (
    <Flex gap={20}>
      <Switch {...commonProps} checked color="blue" />
      <Switch {...commonProps} checked color="green" />
    </Flex>
  ),
};

// 스위치 타입 스토리
export const SwitchType: Story = {
  render: () => (
    <Flex gap={20}>
      <Switch {...commonProps} switchType="outside" />
      <Switch {...commonProps} switchType="inside" />
    </Flex>
  ),
};

// 스위치 크기 스토리
export const SwitchSize: Story = {
  render: () => (
    <>
      {['outside', 'inside'].map((type) => (
        <Flex key={type} gap={20} className={type === 'inside' ? 'mt-4' : 'mb-4'}>
          {['sm', 'md', 'lg', 'xl'].map((size) => (
            <Switch
              key={size}
              {...commonProps}
              switchSize={size as ISwitchProps['switchSize']}
              switchType={type as ISwitchProps['switchType']}
            />
          ))}
        </Flex>
      ))}
    </>
  ),
};
