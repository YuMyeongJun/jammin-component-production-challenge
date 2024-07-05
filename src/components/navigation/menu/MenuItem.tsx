import { useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { IcToggleArrowDown } from '@assets/icons';
import { BodyPortal } from '@components';
import classNames from 'classnames';

import { IMenuItemProps } from './Menu.types';
import { menuItemClasses } from './menuItemClasses';
import { useMenuContext } from './useMenuContext';

export const MenuItem = ({
  path,
  title,
  icon,
  children,
  defaultOpen,
  menuKey,
  className,
  ...restProps
}: IMenuItemProps) => {
  // useMenuContext에서 필요한 값들을 가져옵니다
  const { navigate, collapse, selectedMenuKey, isLight, popContainerClassName } =
    useMenuContext();
  const hasChildren = Boolean(children);
  // 메뉴 아이템의 열림/닫힘 상태를 관리합니다
  const [isOpen, setIsOpen] = useState(defaultOpen ?? false);
  // 팝업 메뉴의 표시 여부를 관리합니다
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const menuItemRef = useRef<HTMLLIElement>(null);
  const popperElement = useRef<HTMLUListElement>(null);

  // usePopper 훅을 사용하여 팝업 메뉴의 위치를 설정합니다
  const { styles, attributes, update } = usePopper(
    menuItemRef.current,
    popperElement.current,
    {
      placement: 'right-start',
    },
  );

  // 메뉴 아이템 클릭 시 동작을 정의합니다
  const handleClick = () => {
    if (hasChildren) {
      if (collapse) {
        return;
      }
      setIsOpen((prev) => !prev);
    } else {
      navigate?.(path);
    }
  };

  return (
    <li
      className={classNames(menuItemClasses.wrap.base, className)}
      key={menuKey}
      ref={menuItemRef}
      onMouseEnter={() => {
        // 메뉴가 접혀있을 때만 팝업 메뉴를 표시합니다
        if (!collapse) {
          return;
        }
        setIsPopperOpen(true);
        void update?.();
      }}
      onMouseLeave={() => {
        if (!collapse) {
          return;
        }
        setIsPopperOpen(false);
      }}
      {...restProps}
    >
      {/* 메뉴 아이템의 내용을 렌더링합니다 */}
      <div
        className={classNames(menuItemClasses.wrap.item, {
          [menuItemClasses.wrap.hasChildren]: hasChildren,
          [menuItemClasses.wrap.selected]: selectedMenuKey === menuKey,
          [menuItemClasses.wrap.light]: isLight,
        })}
        onClick={handleClick}
      >
        {icon && <span className={menuItemClasses.wrap.icon}>{icon}</span>}
        <span className={classNames(menuItemClasses.wrap.title)}>{title}</span>
        {hasChildren && (
          <span
            className={classNames(menuItemClasses.wrap.arrow.base, {
              [menuItemClasses.wrap.arrow.rotate]: isOpen,
              [menuItemClasses.wrap.arrow.collapse]: collapse,
            })}
          >
            <IcToggleArrowDown
              className={classNames({
                'stroke-gray-100': !isLight,
                'stroke-gray-800': isLight,
              })}
            />
          </span>
        )}
      </div>
      {/* 자식 메뉴 아이템을 렌더링합니다 */}
      {hasChildren &&
        (collapse ? (
          // 메뉴가 접혀있을 때는 팝업 형태로 자식 메뉴를 표시합니다
          <BodyPortal>
            <ul
              className={classNames(
                menuItemClasses.container.base,
                menuItemClasses.container.open,
                menuItemClasses.container.popper,
                popContainerClassName,
                {
                  '!hidden': !isPopperOpen,
                  [menuItemClasses.container.light]: isLight,
                },
              )}
              ref={popperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              {children}
            </ul>
          </BodyPortal>
        ) : (
          // 메뉴가 펼쳐져 있을 때는 일반적인 형태로 자식 메뉴를 표시합니다
          <ul
            className={classNames(menuItemClasses.container.base, {
              [menuItemClasses.container.close]: !isOpen,
              [menuItemClasses.container.open]: isOpen,
            })}
          >
            {children}
          </ul>
        ))}
    </li>
  );
};
