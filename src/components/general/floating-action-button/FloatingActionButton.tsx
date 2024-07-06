import { forwardRef, useRef, useState } from 'react';
import { IcClose } from '@assets/icons';
import { ButtonEx, Flex, TooltipEx } from '@components';
import { Badge } from '@components/data-display/badge/Badge';
import { Tooltip } from '@components/data-display/tooltip/Tooltip';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { remUtil } from '@modules/utils/rem';
import classNames from 'classnames';

import { IFloatingActionButtonProps } from './FloatingActionButton.types';
import { floatingActionButtonClasses } from './FloatingActionButtonClasses';

export const FloatingActionButton = forwardRef<
  HTMLButtonElement,
  IFloatingActionButtonProps
>((args, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const floatingAtionButtonRef = useRef<HTMLDivElement>(null);
  const {
    className,
    shape = 'circle',
    trigger = 'click',
    style,
    icon,
    description,
    right = 30,
    bottom = 50,
    closeIcon,
    menu,
    children,
    badge,
    useBadge = false,
    tooltip,
    useOutsideClickRemove = true,
    isVertical = true,
    cancelBtnColor = 'gray',
    cancelBtnType = 'text',
    tooltipPlacement = 'top',
    callback,
    onOpenChange,
    ...buttonProps
  } = args;

  const rootClassName = classNames(
    floatingActionButtonClasses.root,
    floatingActionButtonClasses.wrapper,
    'wrapper',
    {
      open: isOpen,
      [floatingActionButtonClasses.badgeCounter]: useBadge,
    },
  );
  const btnClassName = classNames(
    floatingActionButtonClasses.btn.root,
    {
      // disabled
      [floatingActionButtonClasses.disabled]: args['aria-disabled'],

      // shape
      [floatingActionButtonClasses.circle]: args.shape === 'circle',
      [floatingActionButtonClasses.square]: args.shape === 'square',

      // group menu trigger(hover or click)
      [floatingActionButtonClasses.triggerClick]: args.trigger === 'click',
      [floatingActionButtonClasses.triggerHover]: args.trigger === 'hover',
      [floatingActionButtonClasses.badgeCounter]: args.useBadge === true,
      [floatingActionButtonClasses.btn.displayNone]: isOpen && !Array.isArray(menu),
    },
    className,
  );

  const handleClick = () => {
    if (trigger === 'click') {
      menu && setIsOpen(!isOpen);
      callback?.();
    }
  };

  const badgeCounter = Array.isArray(menu)
    ? menu.reduce((sum, obj) => sum + (Number(obj.badge?.count) || 0), 0)
    : 0;

  useOutsideClick(floatingAtionButtonRef, () => {
    useOutsideClickRemove && setIsOpen(false);
  });

  return (
    <div
      className={rootClassName}
      style={{ right: `${remUtil.rem(right)}`, bottom: `${remUtil.rem(bottom)}` }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        trigger === 'hover' && menu && setIsOpen(false);
      }}
      ref={floatingAtionButtonRef}
      {...buttonProps}
    >
      <Flex justify="end" align="end" vertical={isVertical}>
        {Array.isArray(menu) ? (
          menu?.map((item, i) => (
            <Badge
              key={i}
              count={item.badge?.count}
              overflowCount={item.badge?.overflowCount}
              color={item.badge?.color}
              dot={item.badge?.dot}
              showZero={item.badge?.showZero}
              offset={[5, 10]}
            >
              <TooltipEx
                description={item.tooltip ?? ''}
                disable={!item.tooltip}
                placement={tooltipPlacement}
                offset={[0, 8]}
              >
                <div
                  className={classNames(btnClassName, {
                    [floatingActionButtonClasses.hiddenMenu]: menu,
                    open: isOpen,
                  })}
                >
                  <button
                    className={floatingActionButtonClasses.hiddenBtn}
                    onClick={item.callback}
                    key={i}
                  >
                    <div
                      className={floatingActionButtonClasses.icon}
                      style={{ backgroundImage: `url(${item.icon})` }}
                    />
                    <div className={floatingActionButtonClasses.description}>
                      {item.description}
                    </div>
                  </button>
                </div>
              </TooltipEx>
            </Badge>
          ))
        ) : (
          <div
            className={classNames({
              btnClassName,
              [floatingActionButtonClasses.hiddenMenu]: menu,
              open: isOpen,
              //useOutsideClickRemove 사용 안할 시 x버튼 표시하는 class
              [floatingActionButtonClasses.cancelBtn]: !useOutsideClickRemove,
            })}
          >
            {/* cancel button */}
            {!useOutsideClickRemove ? (
              <ButtonEx
                type={cancelBtnType}
                color={cancelBtnColor}
                onClick={() => setIsOpen(false)}
              >
                <IcClose />
              </ButtonEx>
            ) : null}
            {menu}
          </div>
        )}
        <Badge
          count={badgeCounter}
          overflowCount={badge?.overflowCount}
          color={badge?.color}
          dot={badge?.dot}
          showZero={badge?.showZero}
          offset={[3, 10]}
        >
          <TooltipEx
            description={tooltip ?? ''}
            disable={!tooltip}
            placement={tooltipPlacement}
            offset={[0, 8]}
          >
            <div
              className={btnClassName}
              onMouseEnter={(e) => {
                e.stopPropagation();
                trigger === 'hover' && menu && setIsOpen(true);
              }}
            >
              <button onClick={handleClick}>
                <div
                  className={floatingActionButtonClasses.icon}
                  style={{
                    backgroundImage: isOpen ? `url(${closeIcon})` : `url(${icon})`,
                  }}
                />
                <div className={floatingActionButtonClasses.description}>
                  {description}
                </div>
              </button>
            </div>
          </TooltipEx>
        </Badge>
      </Flex>
    </div>
  );
});
