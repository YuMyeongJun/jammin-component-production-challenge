import { IcSearch } from '@assets/icons';
import { Meta, StoryObj } from '@storybook/react';

import { ButtonEx } from './ButtonEx';
import { IButtonExProps } from './ButtonEx.types';

import '../../../index.css';

const meta: Meta<IButtonExProps> = {
  title: 'components/general/ButtonEx',
  component: ButtonEx,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
    },
    color: {
      control: 'select',
    },
    shape: {
      control: 'select',
    },
    size: {
      control: 'select',
    },
    block: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<IButtonExProps>;

export const Default: Story = {
  render: ({ children, ...args }) => {
    return (
      <>
        <ButtonEx {...args}>{children}</ButtonEx>
      </>
    );
  },

  args: {
    children: 'Default',
  },
};

export const ButtonType: Story = {
  render: () => {
    return (
      <div className="flex gap-2">
        <ButtonEx type="bordered">Bordered</ButtonEx>
        <ButtonEx type="dashed">Dashed</ButtonEx>
        <ButtonEx type="fill">Fill</ButtonEx>
        <ButtonEx type="twotone">Twotone</ButtonEx>
        <ButtonEx type="text">Text</ButtonEx>
      </div>
    );
  },
};

export const ButtonShape: Story = {
  render: () => {
    return (
      <div className="flex gap-2">
        <ButtonEx shape="round">Round</ButtonEx>
        <ButtonEx shape="round-full">Round Full</ButtonEx>
        <ButtonEx shape="rect">Rect</ButtonEx>
        <ButtonEx shape="circle">C</ButtonEx>
      </div>
    );
  },
};

export const ButtonSize: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <ButtonEx size="sm" shape="round">
            Round
          </ButtonEx>
          <ButtonEx size="sm" shape="round-full">
            Round Full
          </ButtonEx>
          <ButtonEx size="sm" shape="rect">
            Rect
          </ButtonEx>
          <ButtonEx size="sm" shape="circle">
            C
          </ButtonEx>
        </div>
        <div className="flex gap-2">
          <ButtonEx size="md" shape="round">
            Round
          </ButtonEx>
          <ButtonEx size="md" shape="round-full">
            Round Full
          </ButtonEx>
          <ButtonEx size="md" shape="rect">
            Rect
          </ButtonEx>
          <ButtonEx size="md" shape="circle">
            C
          </ButtonEx>
        </div>
        <div className="flex gap-2">
          <ButtonEx size="lg" shape="round">
            Round
          </ButtonEx>
          <ButtonEx size="lg" shape="round-full">
            Round Full
          </ButtonEx>
          <ButtonEx size="lg" shape="rect">
            Rect
          </ButtonEx>
          <ButtonEx size="lg" shape="circle">
            C
          </ButtonEx>
        </div>
      </div>
    );
  },
};

export const Prefix: Story = {
  render: () => {
    return (
      <div className="flex gap-2">
        <ButtonEx prefix={<IcSearch />} shape="round">
          Round
        </ButtonEx>
        <ButtonEx prefix={<IcSearch />} shape="round-full">
          Round Full
        </ButtonEx>
        <ButtonEx prefix={<IcSearch />} shape="rect">
          Rect
        </ButtonEx>
      </div>
    );
  },
};

export const Suffix: Story = {
  render: () => {
    return (
      <div className="flex gap-2">
        <ButtonEx suffix={<IcSearch />} shape="round">
          Round
        </ButtonEx>
        <ButtonEx suffix={<IcSearch />} shape="round-full">
          Round Full
        </ButtonEx>
        <ButtonEx suffix={<IcSearch />} shape="rect">
          Rect
        </ButtonEx>
      </div>
    );
  },
};

export const Block: Story = {
  render: () => {
    return (
      <div>
        <ButtonEx block suffix={<IcSearch />} shape="round">
          Round
        </ButtonEx>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div className="flex gap-2">
        <ButtonEx disabled shape="round">
          Round
        </ButtonEx>
        <ButtonEx disabled shape="round-full">
          Round Full
        </ButtonEx>
        <ButtonEx disabled shape="rect">
          Rect
        </ButtonEx>
        <ButtonEx disabled shape="circle">
          C
        </ButtonEx>
      </div>
    );
  },
};

export const ButtonColor: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <ButtonEx color="primary">Primary</ButtonEx>
          <ButtonEx color="secondary">Secondary</ButtonEx>
          <ButtonEx color="info">Info</ButtonEx>
          <ButtonEx color="success">Success</ButtonEx>
          <ButtonEx color="warning">Warning</ButtonEx>
          <ButtonEx color="error">Error</ButtonEx>
          <ButtonEx color="gray">Gray</ButtonEx>
          <ButtonEx color="dark">Dark</ButtonEx>
        </div>
        <div className="flex gap-2">
          <ButtonEx type="dashed" color="primary">
            Primary
          </ButtonEx>
          <ButtonEx type="dashed" color="secondary">
            Secondary
          </ButtonEx>
          <ButtonEx type="dashed" color="info">
            Info
          </ButtonEx>
          <ButtonEx type="dashed" color="success">
            Success
          </ButtonEx>
          <ButtonEx type="dashed" color="warning">
            Warning
          </ButtonEx>
          <ButtonEx type="dashed" color="error">
            Error
          </ButtonEx>
          <ButtonEx type="dashed" color="gray">
            Gray
          </ButtonEx>
          <ButtonEx type="dashed" color="dark">
            Dark
          </ButtonEx>
        </div>
        <div className="flex gap-2">
          <ButtonEx type="fill" color="primary">
            Primary
          </ButtonEx>
          <ButtonEx type="fill" color="secondary">
            Secondary
          </ButtonEx>
          <ButtonEx type="fill" color="info">
            Info
          </ButtonEx>
          <ButtonEx type="fill" color="success">
            Success
          </ButtonEx>
          <ButtonEx type="fill" color="warning">
            Warning
          </ButtonEx>
          <ButtonEx type="fill" color="error">
            Error
          </ButtonEx>
          <ButtonEx type="fill" color="gray">
            Gray
          </ButtonEx>
          <ButtonEx type="fill" color="dark">
            Dark
          </ButtonEx>
        </div>
        <div className="flex gap-2">
          <ButtonEx type="twotone" color="primary">
            Primary
          </ButtonEx>
          <ButtonEx type="twotone" color="secondary">
            Secondary
          </ButtonEx>
          <ButtonEx type="twotone" color="info">
            Info
          </ButtonEx>
          <ButtonEx type="twotone" color="success">
            Success
          </ButtonEx>
          <ButtonEx type="twotone" color="warning">
            Warning
          </ButtonEx>
          <ButtonEx type="twotone" color="error">
            Error
          </ButtonEx>
          <ButtonEx type="twotone" color="gray">
            Gray
          </ButtonEx>
          <ButtonEx type="twotone" color="dark">
            Dark
          </ButtonEx>
        </div>
        <div className="flex gap-2">
          <ButtonEx type="text" color="primary">
            Primary
          </ButtonEx>
          <ButtonEx type="text" color="secondary">
            Secondary
          </ButtonEx>
          <ButtonEx type="text" color="info">
            Info
          </ButtonEx>
          <ButtonEx type="text" color="success">
            Success
          </ButtonEx>
          <ButtonEx type="text" color="warning">
            Warning
          </ButtonEx>
          <ButtonEx type="text" color="error">
            Error
          </ButtonEx>
          <ButtonEx type="text" color="gray">
            Gray
          </ButtonEx>
          <ButtonEx type="text" color="dark">
            Dark
          </ButtonEx>
        </div>
      </div>
    );
  },
};
