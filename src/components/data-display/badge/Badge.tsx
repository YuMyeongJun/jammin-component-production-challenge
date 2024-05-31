import { forwardRef, useMemo } from 'react';
import { remUtil } from '@modules/utils/rem';
import classNames from 'classnames';

import { IBadgeProps } from './Badge.types';
import { badgeClasses } from './BadgeClasses';
import { CountBadge } from './CountBadge';
import { DotBadge } from './DotBadge';

const DEFAULT_OVERFLOW_COUNT = 99;
const BASE_SIZE = 10;
const CIPHER = 0.25;

const calculateDigit = (count: number, overflowCount: number): number => {
  const division = Number.isNaN(count) ? 0 : count.toString().length;
  const overflowDivision = overflowCount.toString().length;

  const tmp = count >= 0 && count > overflowCount ? overflowDivision + 1 : division;
  return tmp < 2 ? 2 / CIPHER : tmp === 2 ? (tmp + 1) / CIPHER : tmp / CIPHER;
};

const calculateSize = (size: number | string): number => {
  return typeof size !== 'number' ? Number(size.replace(/[^0-9]/g, '')) : size;
};

const getOffsetStyle = (
  direction: 'left' | 'right',
  isDot: boolean,
  offset: number | undefined,
  digit: number,
) => {
  const key = direction === 'left' ? 'left' : 'right';
  const value = isDot ? offset ?? -2 : -(offset ?? digit);

  return { [key]: value };
};

export const Badge = forwardRef<HTMLSpanElement, IBadgeProps>((args, ref) => {
  const {
    color,
    count,
    dot,
    offset,
    overflowCount = DEFAULT_OVERFLOW_COUNT,
    showZero,
    direction = 'right',
    size = BASE_SIZE,
    children,
    style,
    className,
    ...props
  } = args;

  const tmpSize = calculateSize(size);
  const fontSize =
    tmpSize > BASE_SIZE ? `${remUtil.rem(tmpSize)}` : `${remUtil.rem(BASE_SIZE)}`;
  const circle = `${Math.max(tmpSize, BASE_SIZE) / 32}rem`;

  const digit = useMemo(
    () => calculateDigit(Number(count), overflowCount),
    [count, overflowCount],
  );

  const offsetTop = offset?.[1] ?? 1;
  const offsetStyle = useMemo(
    () => ({
      dot: getOffsetStyle(direction, true, offset?.[0] as number | undefined, digit),
      badge: getOffsetStyle(direction, false, offset?.[0] as number | undefined, digit),
    }),
    [direction, offset, digit],
  );

  const shouldRenderBadge = useMemo(
    () => (showZero && Number(count) === 0) || Number(count) > 0 || dot,
    [showZero, count, dot],
  );

  const badgeContent = useMemo(() => {
    if (typeof count !== 'number' || !overflowCount) return count;
    return overflowCount < count ? `${overflowCount}+` : count;
  }, [count, overflowCount]);

  const commonStyle = {
    ...style,
    marginTop: offsetTop,
    background: color,
  };

  if (!shouldRenderBadge) {
    return (
      <span ref={ref} {...props} className={classNames(badgeClasses.area)}>
        {children}
      </span>
    );
  }

  return (
    <span ref={ref} {...props} className={classNames(badgeClasses.root)}>
      {children}
      {dot ? (
        <DotBadge
          offsetStyle={offsetStyle.dot}
          circle={circle}
          commonStyle={commonStyle}
          className={className}
        />
      ) : (
        <CountBadge
          circle={circle}
          fontSize={fontSize}
          badgeContent={badgeContent}
          commonStyle={commonStyle}
          className={className}
          offsetStyle={offsetStyle.badge}
        />
      )}
    </span>
  );
});
