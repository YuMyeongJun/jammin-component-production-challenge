import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import IcTabClose from '@assets/icons/ic_basic_close.svg?react';
import classNames from 'classnames';

import { ITabProps } from './Tab.types';
import { tabClasses as tabClasses, tabContainerClasses } from './TabClasses';
import { tabItemClasses } from './TabItemClasses';

export const Tab = forwardRef<HTMLDivElement, ITabProps>(
  (props: ITabProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      variant,
      type,
      placement,
      items: initialItems,
      onClose,
      defaultTab,
      rounded,
      gap,
      color,
      size,
      closeIcon,
      tabIcon,
    } = props;

    const [items, setItems] = useState(initialItems);
    const [isSelected, setIsSelected] = useState(defaultTab);
    const [isChildren, setIsChildren] = useState(isSelected - 1);

    const tabIconNode = tabIcon && (
      <span className={tabItemClasses.tabIcon}>{tabIcon}</span>
    );

    const rootClassName = classNames(tabContainerClasses.root, {
      [tabContainerClasses.horizontal]: type === 'horizontal',
      [tabContainerClasses.vertical]: type === 'vertical',
      [tabContainerClasses.left]: placement === 'left',
      [tabContainerClasses.right]: placement === 'right',
      [tabContainerClasses.vLeft]: type === 'vertical' && placement === 'left',
      [tabContainerClasses.vRight]: type === 'vertical' && placement === 'right',
    });

    const tabClassesName = classNames(tabClasses.root, {
      [tabClasses.horizontal]: type === 'horizontal',
      [tabClasses.vertical]: type === 'vertical',
      [tabClasses.left]: placement === 'left',
      [tabClasses.right]: placement === 'right',
      [tabClasses.center]: type === 'horizontal' && placement === 'center',
    });

    const tabItemClassName = classNames(tabItemClasses.root, {
      [tabItemClasses.solid.root]: variant === 'solid',
      [tabItemClasses.underline.root]: variant === 'underline',
      [tabItemClasses.handle.root]: variant === 'handle',
      [tabItemClasses.rounded.none]: rounded === 'none',
      [tabItemClasses.rounded.sm]: rounded === 'sm',
      [tabItemClasses.rounded.md]: rounded === 'md',
      [tabItemClasses.rounded.lg]: rounded === 'lg',
      [tabItemClasses.rounded.xl]: rounded === 'xl',
      [tabItemClasses.color.primary]: color === 'primary',
      [tabItemClasses.color.secondary]: color === 'secondary',
      [tabItemClasses.color.success]: color === 'success',
      [tabItemClasses.color.error]: color === 'error',
      [tabItemClasses.color.info]: color === 'info',
      [tabItemClasses.color.warning]: color === 'warning',
      [tabItemClasses.color.gray]: color === 'gray',
      [tabItemClasses.color.dark]: color === 'dark',
      [tabItemClasses.size.sm]: size === 'sm',
      [tabItemClasses.size.md]: size === 'md',
      [tabItemClasses.size.lg]: size === 'lg',
      [tabItemClasses.size.xl]: size === 'xl',
    });

    const tabCloseClassName = classNames(
      tabItemClasses.closeIcon,
      closeIcon ? [tabItemClasses.inline] : [tabItemClasses.hidden],
    );

    const tabClick = (idx: number) => {
      setIsSelected(idx + 1);
      setIsChildren(idx);
      console.log('defaultTab : ' + defaultTab);
    };

    const closeRef = useRef<HTMLButtonElement>(null);

    const getTabItemClassNames = (isSelected: boolean) =>
      classNames(tabItemClassName, tabItemClasses.root, {
        [tabItemClasses.solid.root]: variant === 'solid',
        [tabItemClasses.underline.root]: variant === 'underline',
        [tabItemClasses.handle.root]: variant === 'handle',
        [tabItemClasses.solid.selected]: isSelected && variant === 'solid',
        [tabItemClasses.underline.selected]: isSelected && variant === 'underline',
        [tabItemClasses.handle.selected]: isSelected && variant === 'handle',
      });

    const handleClose = (idx: number) => {
      const newItems = items?.filter((_, index) => index !== idx);
      setItems(newItems);

      if (isSelected === idx + 1) {
        // 닫힌 탭이 현재 선택된 탭이었다면, 이전 탭을 선택합니다.
        const newSelectedIndex = Math.max(0, idx - 1);
        setIsSelected(newSelectedIndex + 1);
        setIsChildren(newSelectedIndex);
      } else if (isSelected > idx + 1) {
        // 닫힌 탭이 현재 선택된 탭 이전에 있었다면, 선택된 탭의 인덱스를 조정합니다.
        setIsSelected(isSelected - 1);
        setIsChildren(isChildren - 1);
      }

      // 사용자 정의 onClose 콜백이 제공된 경우 호출합니다.
      if (onClose) {
        onClose();
      }
    };

    return (
      <div className={classNames(rootClassName)}>
        <div ref={ref} className={classNames(tabClassesName)} style={{ gap }}>
          {items?.map((x, idx) => {
            return (
              <div
                key={x.key}
                className={getTabItemClassNames(isSelected === x.key)}
                onClick={() => tabClick(idx)}
              >
                {tabIconNode}
                {x.label}
                <button
                  className={tabCloseClassName}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose(idx);
                  }}
                  ref={closeRef}
                >
                  {closeIcon === true ? <IcTabClose fill="black" /> : closeIcon}
                </button>
              </div>
            );
          })}
        </div>
        <div className="bc-tab-content-container">
          {items?.length && items[isSelected - 1].children}
        </div>
      </div>
    );
  },
);
