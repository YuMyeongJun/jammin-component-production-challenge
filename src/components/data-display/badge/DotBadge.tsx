import React from 'react';
import classNames from 'classnames';

import { badgeClasses } from './BadgeClasses';

export const DotBadge = ({
  className,
  commonStyle,
  circle,
  offsetStyle,
}: {
  circle: string;
  commonStyle: React.CSSProperties;
  className?: string;
  offsetStyle?: React.CSSProperties;
}) => (
  <span
    className={classNames(badgeClasses.dot, className)}
    style={{
      ...commonStyle,
      width: circle,
      height: circle,
      ...offsetStyle,
    }}
  />
);
