import React from 'react';
import classNames from 'classnames';

import { badgeClasses } from './BadgeClasses';

export const CountBadge = ({
  className,
  commonStyle,
  fontSize,
  circle,
  offsetStyle,
  badgeContent,
}: {
  circle: string;
  fontSize: string;
  badgeContent: React.ReactNode;
  commonStyle: React.CSSProperties;
  className?: string;
  offsetStyle?: React.CSSProperties;
}) => (
  <span
    className={classNames(badgeClasses.area.root, className)}
    style={{
      ...commonStyle,
      fontSize,
      paddingLeft: circle,
      paddingRight: circle,
      ...offsetStyle,
    }}
  >
    <span className={classNames(badgeClasses.area.align)}>{badgeContent}</span>
  </span>
);
