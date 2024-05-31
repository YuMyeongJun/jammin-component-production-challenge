import { Flex } from '@components/layout/flex';
import { AnyObject } from '@models/types/AnyObject';
import { Meta, StoryObj } from '@storybook/react';

import { MultiSelectGroup } from './MultiSelectGroup';
import { IMultipleSelectGroupProp } from './Select.types';

const meta: Meta = {
  title: 'components/data-entry/Select/MultiSelectGroup',
  component: MultiSelectGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '',
  },
};

export default meta;
type Story = StoryObj<IMultipleSelectGroupProp<AnyObject>>;

export const Default: Story = {
  render: (args) => {
    return (
      <div style={{ height: 100, border: '1px solid' }}>
        <MultiSelectGroup
          items={args.items}
          vertical={false}
          groupLabel={args.groupLabel}
          value={args.value}
          itemsLabel={args.itemsLabel}
          displayLabel={args.displayLabel}
          valuePath={args.valuePath}
          isCheckbox
          gap={16}
          tagFontColor="#239696"
          tagStyle={{
            display: 'flex',
            padding: '6px 12px',
            alignItems: 'center',
            gap: '4px',
            borderRadius: '100px',
          }}
          tagBgColor={'var(--fill-tertiaryFill, rgba(140, 140, 156, 0.12))'}
          placeholder="선택하세요"
        ></MultiSelectGroup>
      </div>
    );
  },
  args: {
    items: [
      {
        test: 'manager',
        item: [
          { key: 'jack ', values: 'Jack ' },
          { key: 'data ', values: 'Lucy ' },
        ],
      },
      {
        test: 'manager2',
        item: [
          { key: 'jack2 ', values: 'Jack2 ' },
          { key: 'data2 ', values: 'Lucy2 ' },
        ],
      },
    ],
    groupLabel: 'test',
    value: ['Jack22', 'Lucy '],
    itemsLabel: 'item',
    displayLabel: 'key',
    valuePath: 'values',
  },
};
