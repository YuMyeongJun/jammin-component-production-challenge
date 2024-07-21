import { CheckboxEx, Flex } from '@components';
import { Meta, StoryObj } from '@storybook/react';

import '../../../index.css';

const meta: Meta<typeof CheckboxEx> = {
  title: 'components/data-entry/CheckboxEx',
  component: CheckboxEx,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    color: {
      control: 'select',
    },
    label: { control: 'text' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    onChange: { action: 'changed' },
    labelGap: { control: { type: 'range', min: 0, max: 24, step: 1 } },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxEx>;

// 기본 체크박스 예시
export const Default: Story = {
  args: {
    checked: true,
  },
};

// 체크박스 label 예시
export const Label: Story = {
  args: {
    label: '체크된 체크박스',
    checked: true,
  },
};

// defaultChecked 체크박스 예시
export const checked: Story = {
  args: {
    defaultChecked: true,
  },
  render: (args) => (
    <Flex vertical>
      <CheckboxEx label={`checked`} checked />
      <CheckboxEx label={'default checked'} defaultChecked />
    </Flex>
  ),
};

// 비활성화된 체크박스 예시
export const Disabled: Story = {
  args: {
    label: '비활성화된 체크박스',
    disabled: true,
  },
};

// 라벨과 체크박스 사이의 간격을 보여주는 예시
export const LabelGap: Story = {
  args: {
    labelGap: 8,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CheckboxEx label="labelGap 0px (기본값)" />
      <CheckboxEx
        label={`labelGap ${args.labelGap! * 1}px`}
        labelGap={args.labelGap! * 1}
      />
      <CheckboxEx
        label={`labelGap ${args.labelGap! * 2}px`}
        labelGap={args.labelGap! * 2}
      />
      <CheckboxEx
        label={`labelGap ${args.labelGap! * 3}px`}
        labelGap={args.labelGap! * 3}
      />
      <CheckboxEx
        label={`labelGap ${args.labelGap! * 4}px`}
        labelGap={args.labelGap! * 4}
      />
    </div>
  ),
};

// 사용자 지정 색상을 적용한 체크박스 예시
export const CustomColor: Story = {
  render: (args) => {
    const colors = [
      { label: 'Primary', color: 'primary', value: 'primary' },
      { label: 'Secondary', color: 'secondary', value: 'secondary' },
      { label: 'Error', color: 'error', value: 'error' },
      { label: 'Info', color: 'info', value: 'info' },
      { label: 'Dark', color: 'dark', value: 'dark' },
      { label: 'Gray', color: 'gray', value: 'gray' },
      { label: 'Success', color: 'success', value: 'success' },
      { label: 'Warning', color: 'warning', value: 'warning' },
    ];

    return (
      <Flex vertical gap={8}>
        {colors.map(({ label, color, value }) => (
          <div key={color}>
            <CheckboxEx
              {...args}
              color={
                color as
                  | 'primary'
                  | 'secondary'
                  | 'success'
                  | 'error'
                  | 'info'
                  | 'warning'
                  | 'gray'
                  | 'dark'
              }
              label={label}
              checked
            />
          </div>
        ))}
      </Flex>
    );
  },
  args: {
    checked: true,
  },
};
