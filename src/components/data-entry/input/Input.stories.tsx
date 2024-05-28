import { IcSearch } from "@assets/icons";
import { Input } from "@components/data-entry/input/Input";
import { Meta, StoryObj } from "@storybook/react";

import { IInputProps } from "./Input.types";

const meta: Meta = {
  title: "components/data-entry/Input/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    showCount: {
      control: { type: "boolean" },
    },
    isError: {
      control: { type: "boolean" },
    },
    isSearch: {
      control: { type: "boolean" },
    },
    isClearable: {
      control: { type: "boolean" },
    },
    isShowAlwaysClear: {
      control: { type: "boolean" },
    },
    suffix: {
      control: { type: "object" },
    },
    placeholder: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    customPrefix: {
      control: { type: "object" },
    },
  },
  parameters: {
    componentSubtitle: "입력창",
    docs: {
      source: {
        type: "code",
      },
    },
  },
};

export default meta;

type Story = StoryObj<IInputProps>;

export const Default: Story = {
  render: (args) => {
    return <Input {...args} />;
  },
  args: {
    placeholder: "입력해주세요",
    customPrefix: <IcSearch />,
  },
};
