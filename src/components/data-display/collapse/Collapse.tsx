import React, { useCallback, useState } from 'react';
import { ButtonEx } from '@components';
import { Divider } from '@components/layout/divider/Divider';
import classNames from 'classnames';

import { ICollapseProps } from './Collapse.types';
import { collapseClasses } from './CollapseClasses';

export const Collapse: React.FC<ICollapseProps> = ({
  label,
  key,
  showIcon = false,
  expandIcon,
  expandIconPosition = 'end',
  children,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => setIsExpanded((prev) => !prev), []);

  const renderExpandIcon = useCallback(
    () =>
      showIcon && expandIcon ? (
        <ButtonEx
          type="text"
          className={classNames(collapseClasses.header.expandIcon, {
            expand: !isExpanded,
          })}
        >
          <img src={expandIcon} alt="expand-icon" />
        </ButtonEx>
      ) : null,
    [showIcon, expandIcon, isExpanded],
  );

  return (
    <div className={classNames(collapseClasses.root, className)} key={key}>
      <div
        className={collapseClasses.header.root}
        onClick={toggleExpand}
        role="button"
        tabIndex={0}
      >
        {expandIconPosition === 'start' && renderExpandIcon()}
        <div className={collapseClasses.header.label.root}>
          <span className={collapseClasses.header.label.content}>{label}</span>
        </div>
        {expandIconPosition === 'end' && renderExpandIcon()}
      </div>
      <Divider style={{ margin: '0' }} />
      <div
        className={classNames(collapseClasses.children, { invisible: !isExpanded })}
        data-expanded={isExpanded}
      >
        {children}
      </div>
    </div>
  );
};
