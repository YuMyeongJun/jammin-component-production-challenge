import { useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { BodyPortal } from '@components/general';
import { useOutsideClick } from '@hooks/useOutsideClick';
import classNames from 'classnames';

import { IDropdownProps } from './Dropdown.types';
import { dropdownClasses } from './DropdownClasses';

export const Dropdown = ({
  menu,
  placement = 'bottom',
  trigger = 'click',
  children,
  boxClassName,
  boxColor,
  boxWidth = 200,
  style,
  className,
}: IDropdownProps) => {
  const referenceElement = useRef<HTMLDivElement>(null);
  const popperElement = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);

  const { styles, attributes, update } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
        { name: 'preventOverflow', options: { boundary: 'clippingParents' } },
        {
          name: 'flip',
          options: { fallbackPlacements: ['top', 'bottom', 'left', 'right'] },
        },
      ],
      strategy: 'fixed',
    },
  );

  const dropdownClassNames = classNames(dropdownClasses.root, dropdownClasses.base);

  useOutsideClick(
    referenceElement,
    () => {
      setIsShow(false);
    },
    'mousedown',
  );

  const handleMouseEnter = () => {
    if (trigger === 'hover' || trigger === 'both') {
      setIsShow(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover' || trigger === 'both') {
      setIsShow(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click' || trigger === 'both') {
      if (!(trigger === 'both' && isShow)) {
        setIsShow((prev) => !prev);
      }
    }
    void update?.();
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

      <BodyPortal>
        <div
          {...attributes.popper}
          className={classNames(dropdownClassNames, boxClassName)}
          style={{
            ...styles.popper,
            width: boxWidth,
            visibility: isShow ? 'visible' : 'hidden',
            background: boxColor,
          }}
          ref={popperElement}
        >
          {menu}
        </div>
      </BodyPortal>
    </div>
  );
};
