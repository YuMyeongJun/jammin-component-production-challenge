import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { BodyPortal } from '@components/general';
import classNames from 'classnames';

import { ITooltipProps } from './Tooltip.types';
import { tooltipClasses } from './TooltipClasses';

export const Tooltip = ({
  disable,
  offset = [0, 8],
  color,
  description,
  placement = 'right',
  arrow = true,
  strategy = 'fixed',
  mouseEnterDelay,
  mouseLeaveDelay,
  tooltipWidth = '250px',
  open,
  tooltipClassName,
  arrowClassName,
  fontSize = 'md',
  fontBold,
  children,
}: ITooltipProps) => {
  const width = useMemo(() => {
    if (typeof tooltipWidth === 'number') return `${tooltipWidth}px`;
    return tooltipWidth.replace(/[^0-9]/g, '') + 'px';
  }, [tooltipWidth]);

  const referenceElement = useRef<HTMLDivElement>(null);
  const popperElement = useRef<HTMLDivElement>(null);
  const arrowElement = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const [init, setInit] = useState(false);

  const { styles, attributes, update } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      placement,
      modifiers: [
        { name: 'arrow', options: { element: arrowElement.current } },
        {
          name: 'offset',
          options: {
            offset,
          },
        },
      ],
      strategy,
    },
  );

  useEffect(() => {
    setInit(true);
  }, []);

  const tooltipClassNames = classNames(tooltipClasses.root, tooltipClasses.base);
  const contentClassName = classNames(
    {
      [tooltipClasses.font.xs]: fontSize === 'xs',
      [tooltipClasses.font.sm]: fontSize === 'sm',
      [tooltipClasses.font.md]: fontSize === 'md',
      [tooltipClasses.font.lg]: fontSize === 'lg',
    },
    fontBold && tooltipClasses.fontBold,
  );
  const arrowClassNames = classNames(tooltipClasses.arrow);

  const handleMouseEnter = useCallback(() => {
    setTimeout(() => {
      setIsShow(true);
      void update?.();
    }, mouseEnterDelay);
  }, [mouseEnterDelay, update]);

  const handleMouseLeave = useCallback(() => {
    if (!open) {
      setTimeout(() => {
        setIsShow(false);
        void update?.();
      }, mouseLeaveDelay);
    }
  }, [mouseLeaveDelay, open, update]);

  if (disable) {
    return <>{children}</>;
  }

  return (
    <div className={classNames(tooltipClasses.container)}>
      <div
        ref={referenceElement}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      <BodyPortal>
        <div
          role="tooltip"
          {...attributes.popper}
          className={classNames(tooltipClassNames, tooltipClassName)}
          style={{
            ...styles.popper,
            width: width,
            visibility:
              open === undefined
                ? isShow
                  ? 'visible'
                  : 'hidden'
                : open && init
                  ? 'visible'
                  : 'hidden',
            background: color,
          }}
          ref={popperElement}
          data-arrow-visible={open === undefined ? isShow : open ? true : false}
        >
          <div className={classNames(contentClassName)}>{description}</div>
          {arrow && (
            <div
              ref={arrowElement}
              className={classNames(arrowClassNames, arrowClassName)}
              data-popper-arrow
              style={{
                ...styles.arrow,
                background: color,
              }}
            ></div>
          )}
        </div>
      </BodyPortal>
    </div>
  );
};
