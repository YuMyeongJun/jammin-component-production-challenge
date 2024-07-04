import { Meta, StoryObj } from '@storybook/react';
import { LinkEx } from './LinkEx';
import { ILinkEx } from './LinkEx.types';
import {
  withRouter,
  reactRouterOutlets,
  reactRouterParameters,
} from 'storybook-addon-remix-react-router';
import { Flex } from '@components/layout';
import { Link as ReactRouterLink, Outlet, useLocation } from 'react-router-dom';
import { Card } from '@components';

const meta: Meta = {
  title: 'components/navigation/LinkEx',
  component: LinkEx,
  tags: ['autodocs'],
  decorators: [withRouter],
  parameters: {
    componentSubtitle: '링크',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'error',
        'info',
        'warning',
        'dark',
      ],
    },
    disabled: {
      control: 'boolean',
    },
    to: {
      control: 'text',
    },
    href: {
      control: 'text',
    },
    overlay: {
      control: 'boolean',
    },
    underline: {
      control: 'select',
      options: ['none', 'hover', 'always'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    useHover: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<ILinkEx>;

const defaultArgs: ILinkEx = {
  color: 'primary',
  disabled: false,
  to: '/',
  href: '',
  overlay: false,
  underline: 'always',
  size: 'md',
  defaultComponent: 'a',
};

export const Default: Story = {
  render: (args) => {
    return <LinkEx {...args}>Link</LinkEx>;
  },
  args: {
    ...defaultArgs,
  },
};

export const Disabled: Story = {
  render: (args) => <LinkEx {...args}>Disabled Link</LinkEx>,
  args: {
    disabled: true,
  },
};

export const ExternalLink: Story = {
  render: (args) => <LinkEx {...args}>External Link</LinkEx>,
  args: {
    href: 'https://example.com',
  },
};

export const UnderlineHover: Story = {
  render: (args) => <LinkEx {...args}>Underline on Hover</LinkEx>,
  args: {
    underline: 'hover',
  },
};

export const Colors: Story = {
  render: (args) => {
    return (
      <Flex vertical gap={4}>
        <LinkEx {...args} color="default">
          Default Color
        </LinkEx>
        <LinkEx {...args} color="primary">
          Primary Color
        </LinkEx>
        <LinkEx {...args} color="secondary">
          Secondary Color
        </LinkEx>
        <LinkEx {...args} color="success">
          Success Color
        </LinkEx>
        <LinkEx {...args} color="error">
          Error Color
        </LinkEx>
        <LinkEx {...args} color="info">
          Info Color
        </LinkEx>
        <LinkEx {...args} color="warning">
          Warning Color
        </LinkEx>
        <LinkEx {...args} color="dark">
          Dark Color
        </LinkEx>
      </Flex>
    );
  },
  args: {
    ...defaultArgs,
  },
};

export const Size: Story = {
  render: (args) => {
    return (
      <Flex vertical gap={4}>
        <LinkEx {...args} size="xs">
          Link
        </LinkEx>
        <LinkEx {...args} size="sm">
          Link
        </LinkEx>
        <LinkEx {...args} size="md">
          Link
        </LinkEx>
        <LinkEx {...args} size="lg">
          Link
        </LinkEx>
      </Flex>
    );
  },
};

/**
 * `target="_blank"`다른 사이트의 페이지에 대한 링크와 함께 사용할 경우 Google Chrome 개발자 문서에서는 잠재적인 보안 문제를 방지하기위해 `rel="noopener"` or `rel="noreferrer"`을 추가하는 것을 권장합니다.
 * - `rel="noopener"` 새 페이지가 window.opener 속성을 액세스할 수 없도록 방지하고 별도의 프로세스에서 실행되도록 합니다. 이것이 없으면 대상 페이지가 잠재적으로 페이지를 악성 URL로 리디렉션할 수 있습니다.
 * - `rel="noreferrer"` 동일한 효과가 있지만 Referer 헤더가 새 페이지로 전송되는 것을 방지합니다. 리퍼러 헤더를 제거하면 분석에 영향을 미칩니다.
 */
export const Security: Story = {
  render: (args) => {
    return (
      <LinkEx
        {...args}
        href="https://google.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Security
      </LinkEx>
    );
  },
};

export const ThirdPartyReactRouting: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();

    return (
      <>
        <div>
          <p>React-Router: {location.pathname}</p>
        </div>
        <div>
          <Outlet />
        </div>
        <Flex vertical gap={4}>
          <LinkEx {...args} component={ReactRouterLink} to="/">
            Go to Page Index
          </LinkEx>
          <LinkEx {...args} component={ReactRouterLink} to="/account">
            Go to page Account
          </LinkEx>
        </Flex>
      </>
    );
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlets([
        {
          path: '',
          element: <p>index</p>,
        },
        {
          path: 'account',
          element: <p>account</p>,
        },
      ]),
    }),
  },
};

/**
 * 전체 구성 요소를 링크로 클릭할 수 있도록 하려면 `overlay 속성을 사용하세요.<br>
 * 데모에서는 카드 구성 요소와 함께 이를 사용하여 적절한 접근성을 보장하는 방법을 보여줍니다.
 */
export const Overlay: Story = {
  render: (args) => {
    return (
      <Flex gap={4}>
        <Card rounded>
          <div className="relative m-[-0.75rem] flex flex-col gap-4 p-2">
            <img
              src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="web design"
            />
            <LinkEx
              {...args}
              href="#introduction"
              underline="none"
              className="flex flex-col items-start"
              overlay
            >
              <div>
                <h1>Design</h1>
              </div>
              <div>
                <p>Components UI</p>
              </div>
            </LinkEx>
          </div>
        </Card>
      </Flex>
    );
  },
};
