import { Flex, SwitchEx } from '@components';
import { Meta, StoryObj } from '@storybook/react';

import { ISwitchExProps } from './SwitchEx.types';

// 공통 props 정의
const commonProps: Partial<ISwitchExProps> = {
  color: 'primary',
};

const meta: Meta<ISwitchExProps> = {
  title: 'components/data-entry/SwitchEx',
  component: SwitchEx,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    switchSize: {
      control: 'select',
    },
    color: {
      control: 'select',
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

type Story = StoryObj<ISwitchExProps>;

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
    <Flex gap={20} vertical>
      {[
        'primary',
        'secondary',
        'success',
        'error',
        'info',
        'warning',
        'gray',
        'dark',
      ].map((color) => (
        <div>
          <p>{color}</p>
          <SwitchEx
            {...commonProps}
            checked
            color={color as ISwitchExProps['color']}
            key={color}
          />
        </div>
      ))}
    </Flex>
  ),
};

// 비활성화된 스토리
export const Disabled: Story = {
  render: () => (
    <Flex gap={20} vertical>
      {[
        'primary',
        'secondary',
        'success',
        'error',
        'info',
        'warning',
        'gray',
        'dark',
      ].map((color) => (
        <div>
          <p>{color} (disabled)</p>
          <SwitchEx
            {...commonProps}
            color={color as ISwitchExProps['color']}
            disabled
            key={color}
          />
        </div>
      ))}
    </Flex>
  ),
};

// 스위치 크기 스토리
export const SwitchSize: Story = {
  render: () => (
    <>
      <Flex gap={20} vertical className={'mb-4'}>
        {['sm', 'md', 'lg', 'xl'].map((size) => (
          <div>
            <p>{size}</p>
            <SwitchEx
              key={size}
              {...commonProps}
              switchSize={size as ISwitchExProps['switchSize']}
            />
          </div>
        ))}
      </Flex>
    </>
  ),
};
