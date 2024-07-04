import classNames from 'classnames';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ILinkExProps } from './LinkEx.types'; // ILinkExProps 타입을 가져옵니다.
import { linkExClasses } from './LinkExClasses';

export const LinkEx = React.forwardRef<HTMLAnchorElement, ILinkExProps>(
  (
    {
      color = 'primary',
      disabled = false,
      underline = 'always',
      size = 'md',
      component: RootComponent = 'a',
      defaultComponent = 'a',
      overlay = false,
      to = '/',
      href,
      children,
      className,
      target,
      useHover = false,
      ...props
    },
    ref,
  ) => {
    // 외부 링크인지 확인
    const isExternal = href && href.startsWith('http');

    const capitalize = (str: string) =>
      str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

    const rootClassName = classNames(
      linkExClasses.root,
      {
        // overlay
        [linkExClasses.overlay]: overlay,
        // disabled
        [linkExClasses.disabled]: disabled,
        // underline
        [linkExClasses[
          `underline${capitalize(underline)}` as keyof typeof linkExClasses
        ]]: true,
        // color
        [linkExClasses[`color${capitalize(color)}` as keyof typeof linkExClasses]]: true,
        // size
        [linkExClasses[`size${capitalize(size)}` as keyof typeof linkExClasses]]: true,
        // hover시 색상변경
        [linkExClasses.hover]: useHover,
      },
      className,
    );

    // 외부 링크인 경우 <a> 태그를 사용하여 렌더링
    if (isExternal) {
      return (
        <a href={href} ref={ref} {...props} target={target}>
          {children}
        </a>
      );
    }

    // 내부 링크인 경우 <RouterLink> 컴포넌트를 사용하여 렌더링
    return (
      <RouterLink to={to} ref={ref} {...props} className={rootClassName}>
        {children}
      </RouterLink>
    );
  },
);
