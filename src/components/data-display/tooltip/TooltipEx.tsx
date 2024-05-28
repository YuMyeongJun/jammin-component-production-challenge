import { useEffect, useMemo, useRef } from 'react';
import { ITooltipProps } from '@components';
import { BodyPortal } from '@components/general';
import { useCustomPopper } from '@hooks/useCustomPopper';
import classNames from 'classnames';

import { tooltipClasses } from './TooltipClasses';

export const TooltipEx = ({
  disable,
  color,
  description,
  placement = 'bottom',
  arrow = true,
  mouseEnterDelay,
  mouseLeaveDelay,
  tooltipWidth = '250px',
  offset = [0, 0],
  tooltipClassName,
  arrowClassName,
  fontSize = 'md',
  fontBold,
  children,
}: ITooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const {
    isVisible,
    setIsVisible,
    handleReferenceElement,
    popperUpdate,
    handleArrowElement,
    onChangePlacement,
    onChangeOffset,
    popperAttributes,
    popperStyles,
    popperProps,
    arrowProps,
  } = useCustomPopper({
    initPlacement: placement,
    initOffset: offset,
  });

  useEffect(() => {
    onChangePlacement(placement);
  }, [placement]);

  useEffect(() => {
    onChangeOffset(offset);
  }, [offset]);

  const width = useMemo(() => {
    if (typeof tooltipWidth === 'number') return `${tooltipWidth}px`;
    return tooltipWidth.replace(/[^0-9]/g, '') + 'px';
  }, [tooltipWidth]);

  const handleMouseEnter = () => {
    setTimeout(() => {
      if (tooltipRef.current) {
        handleReferenceElement(tooltipRef);
        if (arrow) {
          handleArrowElement(arrowRef);
        }
        popperUpdate();
        setIsVisible(true);
      }
    }, mouseEnterDelay);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, mouseLeaveDelay);
  };

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

  if (disable) {
    return <>{children}</>;
  }

  return (
    <div className={classNames(tooltipClasses.container)}>
      <div
        ref={tooltipRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {isVisible && (
        <BodyPortal>
          <div
            {...popperProps}
            role="tooltip"
            className={classNames(tooltipClassNames, tooltipClassName)}
            style={{
              ...popperStyles.popper,
              width: width,
              background: color,
            }}
            {...popperAttributes.popper}
            data-arrow-visible={isVisible ? true : false}
          >
            <div className={classNames(contentClassName)}>{description}</div>
            {arrow && (
              <div
                {...arrowProps}
                className={classNames(arrowClassNames, arrowClassName)}
                data-popper-arrow
                style={{
                  ...popperStyles.arrow,
                  background: color,
                }}
              ></div>
            )}
          </div>
        </BodyPortal>
      )}
    </div>
  );
};
