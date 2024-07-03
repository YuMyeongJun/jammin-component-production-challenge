import { useEffect, useRef } from 'react';
import { BodyPortal } from '@components/general';
import { useCustomPopper } from '@hooks/useCustomPopper';
import { useOutsideClick } from '@hooks/useOutsideClick';
import classNames from 'classnames';

import { IDropdownProps } from './Dropdown.types';
import { dropdownClasses } from './DropdownClasses';

export const DropdownEx = ({
  menu,
  placement = 'bottom',
  trigger = 'click',
  children,
  boxClassName,
  boxColor,
  boxWidth = 200,
  offset = [0, 0],
  style,
  className,
}: IDropdownProps) => {
  const referenceElement = useRef<HTMLDivElement>(null);

  const {
    isVisible,
    setIsVisible,
    handleReferenceElement,
    onChangePlacement,
    onChangeOffset,
    popperUpdate,
    popperAttributes,
    popperStyles,
    popperProps,
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

  const dropdownClassNames = classNames(dropdownClasses.root, dropdownClasses.base);

  useOutsideClick(
    referenceElement,
    () => {
      setIsVisible(false);
    },
    'mousedown',
  );

  const handleMouseEnter = () => {
    if (['hover', 'both'].includes(trigger) && referenceElement.current) {
      handleReferenceElement(referenceElement);
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (['hover', 'both'].includes(trigger)) {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    if (['click', 'both'].includes(trigger) && !(trigger === 'both' && isVisible)) {
      if (referenceElement.current) {
        handleReferenceElement(referenceElement);
      }
      setIsVisible((prev) => !prev);
    }
    popperUpdate();
  };

  return (
    <div className={classNames(dropdownClasses.container)}>
      <div
        className={className}
        ref={referenceElement}
        style={style}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {isVisible && (
        <BodyPortal>
          <div
            {...popperAttributes}
            className={classNames(dropdownClassNames, boxClassName)}
            style={{
              ...popperStyles.popper,
              width: boxWidth,
              visibility: isVisible ? 'visible' : 'hidden',
              background: boxColor,
            }}
            {...popperProps}
          >
            {menu}
          </div>
        </BodyPortal>
      )}
    </div>
  );
};
