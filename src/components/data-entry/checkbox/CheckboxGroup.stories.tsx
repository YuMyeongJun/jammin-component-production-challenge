import * as React from "react";
import { Flex } from "@components/layout/flex";
import { Meta, StoryObj } from "@storybook/react";
import classNames from "classnames";

import { CheckboxGroup } from "./CheckboxGroup";
import { ICheckboxGroupProps } from "./CheckboxGroup.types";

const meta: Meta<ICheckboxGroupProps> = {
  title: "components/data-entry/Checkbox/CheckboxGroup",
  component: CheckboxGroup,
  decorators: [
    (Story) => (
      <Flex align="center" className={classNames("gap-4 p-2")}>
        <Story />
      </Flex>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    checkedIcon: { control: { type: null } },
    uncheckedIcon: { control: { type: null } },
    value: { control: { type: null } },
    defaultValue: { control: { type: null } },
    slotProps: { control: { type: null } },
    color: {
      control: "select",
    },
    // size: {
    //   control: 'select',
    // },
    onChange: { action: "onChange" },
  },
};

export default meta;
type Story = StoryObj<ICheckboxGroupProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <CheckboxGroup {...args} />
      </>
    );
  },
  args: {
    disabled: false,
    readOnly: false,
    required: false,
    color: "primary",
    // size: 'md',
    defaultValue: ["Apple"],
    options: [
      { label: "Apple", value: "Apple" },
      { label: "Pear", value: "Pear" },
      { label: "Orange", value: "Orange" },
    ],
  },
};

export const Controlled: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState<string[]>(["Apple"]);

    const onChange: ICheckboxGroupProps["onChange"] = (
      event,
      value,
      checkedValues,
    ) => {
      setValue(checkedValues);
      console.log("parent - onChange: ", event, value, checkedValues);
    };

    return (
      <>
        <CheckboxGroup {...args} value={value} onChange={onChange} />
      </>
    );
  },
  args: {
    name: "controlled-value",
    disabled: false,
    readOnly: false,
    required: false,
    color: "primary",
    // size: 'md',
    options: [
      { label: "Apple", value: "Apple" },
      { label: "Pear", value: "Pear" },
      { label: "Orange", value: "Orange", disabled: true },
    ],
  },
};
