import { useState } from 'react';
import { CheckboxExGroup, Flex } from '@components';
import { Meta, StoryObj } from '@storybook/react';

import { ICheckboxExGroupProps } from './CheckboxExGroup.types';

const meta: Meta<typeof CheckboxExGroup> = {
  title: 'components/data-entry/CheckboxExGroup',
  component: CheckboxExGroup,
  tags: ['autodocs'],
  args: {
    options: [
      { label: '옵션 A', value: 'a' },
      { label: '옵션 B', value: 'b' },
      { label: '옵션 C', value: 'c' },
    ],
  },
  argTypes: {
    labelGap: { control: { type: 'range', min: 0, max: 24, step: 1 } },
    gap: { control: { type: 'range', min: 0, max: 24, step: 1 } },
    indent: { control: { type: 'range', min: 0, max: 50, step: 1 } },
    color: {
      control: 'select',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxExGroup>;

// 클릭 가능한 체크박스를 위한 래퍼 컴포넌트
const CheckboxExGroupWrapper = (args: any) => {
  const [value, setValue] = useState<ICheckboxExGroupProps['value']>([]);
  return (
    <CheckboxExGroup
      {...args}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        console.log('선택된 값:', newValue);
      }}
      color={args.color}
    />
  );
};

// 기본 체크박스 그룹 예시
export const Default: Story = {
  render: (args) => <CheckboxExGroupWrapper {...args} />,
};

// 라벨과 체크박스 사이의 간격을 보여주는 예시
export const LabelGap: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>{args.labelGap! * 1}px</h3>
        <CheckboxExGroupWrapper
          options={['옵션 1', '옵션 2', '옵션 3']}
          labelGap={args.labelGap! * 1}
        />
      </div>
      <div>
        <h3>{args.labelGap! * 2}px</h3>
        <CheckboxExGroupWrapper
          options={['옵션 1', '옵션 2', '옵션 3']}
          labelGap={args.labelGap! * 2}
        />
      </div>
      <div>
        <h3>{args.labelGap! * 3}px</h3>
        <CheckboxExGroupWrapper
          options={['옵션 1', '옵션 2', '옵션 3']}
          labelGap={args.labelGap! * 3}
        />
      </div>
      <div>
        <h3>{args.labelGap! * 4}px</h3>
        <CheckboxExGroupWrapper
          options={['옵션 1', '옵션 2', '옵션 3']}
          labelGap={args.labelGap! * 4}
        />
      </div>
    </div>
  ),
  args: {
    labelGap: 8,
  },
};

// 들여쓰기 값을 보여주는 예시
export const Indent: Story = {
  render: (args) => <CheckboxExGroupWrapper {...args} />,
  args: {
    useIndeterminate: true,
    indeterminateLabel: '전체 선택',
    isVertical: true,
    indent: 20,
    gap: 16,
  },
};

// 다양한 타입의 값을 가진 옵션들을 보여주는 예시
export const VariantValueOptions: Story = {
  render: (args) => <CheckboxExGroupWrapper {...args} />,
  args: {
    options: [
      { label: '숫자1', value: 1 },
      { label: '숫자2', value: 2 },
      { label: '문자열1', value: '1' },
      { label: '문자열2', value: '2' },
      { label: '불리언 false', value: false },
      { label: '불리언 true', value: true },
      { label: '문자열 false', value: 'false' },
      { label: '문자열 true', value: 'true' },
    ],
  },
};

// 비활성화된 옵션을 포함한 체크박스 그룹 예시
export const Disabled: Story = {
  render: (args) => <CheckboxExGroupWrapper {...args} />,
  args: {
    options: [
      { label: '옵션 A', value: 'a' },
      { label: '옵션 B disabled', value: 'b', disabled: true },
      { label: '옵션 C', value: 'c' },
      { label: '옵션 D checked and disabled', value: 'd', disabled: true, checked: true },
      { label: '옵션 F checked', value: 'f', checked: true },
      { label: '옵션 G defaultChecked', value: 'g', defaultChecked: true },
    ],
    useIndeterminate: true,
    indeterminateLabel: '전체 선택',
    isVertical: true,
    indent: 20,
    gap: 16,
  },
};

// 사용자 지정 색상을 적용한 체크박스 그룹 예시
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
      <Flex vertical gap={24}>
        {colors.map(({ label, color }) => (
          <div key={color}>
            <CheckboxExGroupWrapper
              {...args}
              color={color}
              options={[
                { label: `${label} 1`, value: `${label} 1`, checked: true },
                { label: `${label} 2`, value: `${label} 2` },
                { label: `${label} 3`, value: `${label} 3` },
              ]}
            />
          </div>
        ))}
      </Flex>
    );
  },
  args: {
    value: ['옵션 1'],
    onChange: (newValue) => console.log('선택된 값:', newValue),
  },
};

// 수직 정렬된 체크박스 그룹 예시
export const Vertical: Story = {
  render: (args) => <CheckboxExGroupWrapper {...args} />,
  args: {
    isVertical: true,
  },
};

// 체크박스 간의 간격을 조절하는 예시
export const CustomGap: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>gap 8px</h3>
        <CheckboxExGroupWrapper options={['옵션 1', '옵션 2', '옵션 3']} gap={8} />
      </div>
      <div>
        <h3>gap 16px</h3>
        <CheckboxExGroupWrapper options={['옵션 1', '옵션 2', '옵션 3']} gap={16} />
      </div>
      <div>
        <h3>gap 24px</h3>
        <CheckboxExGroupWrapper options={['옵션 1', '옵션 2', '옵션 3']} gap={24} />
      </div>
      <div>
        <h3>gap 32px</h3>
        <CheckboxExGroupWrapper options={['옵션 1', '옵션 2', '옵션 3']} gap={32} />
      </div>
    </div>
  ),
};

// 전체 선택 레이블을 포함한 체크박스 그룹 예시
export const Indeterminate: Story = {
  render: (args) => <CheckboxExGroupWrapper {...args} />,
  args: {
    useIndeterminate: true,
    indeterminateLabel: '전체 선택',
    isVertical: true,
  },
};
