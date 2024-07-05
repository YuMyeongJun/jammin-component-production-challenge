import { ButtonEx } from '@components';
import classNames from 'classnames';

import { IMenuProps } from './Menu.types';
import { menuClasses } from './menuClasses';
import { MenuProvider } from './MenuContext';
import { MenuItem } from './MenuItem';

export const Menu = ({
  children,
  navigate,
  collapse,
  isLight,
  className,
  style,
  extendWidth = 256,
  collapseWidth = 32,
  popContainerClassName,
  selectedMenuKey,
  ...restProps
}: IMenuProps) => {
  return (
    <MenuProvider
      navigate={navigate}
      collapse={collapse}
      selectedMenuKey={selectedMenuKey}
      isLight={isLight}
      popContainerClassName={popContainerClassName}
    >
      <nav
        className={classNames(menuClasses.nav, className, {
          [menuClasses.collapse]: collapse,
          [menuClasses.light]: isLight,
        })}
        style={{ ...style, width: collapse ? collapseWidth : extendWidth }}
        {...restProps}
      >
        <ul className={menuClasses.wrap}>{children}</ul>
      </nav>
    </MenuProvider>
  );
};
