import { Flex } from '@components/layout/flex';
import { AnyObject } from '@models/types/AnyObject';
import { Meta, StoryObj } from '@storybook/react';

import { ISelectGroupProp } from './Select.types';
import { SelectGroup } from './SelectGroup';

const meta: Meta = {
  title: 'components/data-entry/Select/SelectGroup',
  component: SelectGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '',
  },
};

export default meta;
type Story = StoryObj<ISelectGroupProp<AnyObject>>;

export const Default: Story = {
  render: (args) => {
    return (
      <div style={{ height: 100, border: '1px solid' }}>
        <SelectGroup
          items={args.items}
          groupLabel={args.groupLabel}
          value={args.value}
          itemsLabel={args.itemsLabel}
          displayLabel={args.displayLabel}
          valuePath={args.valuePath}
          placeholder="선택하세요"
        ></SelectGroup>
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
    value: 'Lucy',
    itemsLabel: 'item',
    displayLabel: 'key',
    valuePath: 'values',
  },
};
