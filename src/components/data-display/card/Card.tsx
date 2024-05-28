import { forwardRef, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import classNames from 'classnames';

import { ICardProps } from './Card.types';
import { cardClasses } from './CardClasses';

import 'react-loading-skeleton/dist/skeleton.css';

const getPaddingValues = (padding: any) => {
  if (Array.isArray(padding)) {
    return { tbValues: padding[1], lrValues: padding[0] };
  }
  return { tbValues: padding ?? 'auto', lrValues: padding ?? 'auto' };
};

export const Card = forwardRef<HTMLDivElement, ICardProps>((args, ref) => {
  const {
    title,
    extra,
    fullHight,
    headPadding,
    headAlign = 'space-between',
    extraPadding,
    size,
    titleBgColor,
    titleColor,
    rounded,
    bordered = true,
    children,
    style,
    className,
    loading,
    ...props
  } = args;
  const rootClassName = classNames(
    cardClasses.root,
    {
      [cardClasses.rounded]: rounded,
    },
    bordered ? cardClasses.border : cardClasses.noneBorder,
    fullHight ? 'h-full' : undefined,
  );

  const headClassName = classNames({
    [cardClasses.head.root]: title || extra,
    [cardClasses.small]: size === 'small',
    [cardClasses.head.rounded]: rounded,
  });

  const bodyClassName = classNames(cardClasses.body, {
    [cardClasses.small]: size === 'small',
    [cardClasses.rounded]: rounded,
  });

  const { tbValues: topBottomValue, lrValues: LeftRightValue } = useMemo(
    () => getPaddingValues(headPadding),
    [headPadding],
  );
  const { tbValues: extraTBValue, lrValues: extraLRValue } = useMemo(
    () => getPaddingValues(extraPadding),
    [extraPadding],
  );

  return (
    <div
      ref={ref}
      {...props}
      style={{ ...style }}
      className={classNames(rootClassName, className, { 'min-w-200': title && extra })}
    >
      {title && (
        <div
          className={classNames(headClassName)}
          style={{
            backgroundColor: titleBgColor,
            paddingTop: `${topBottomValue}px`,
            paddingBottom: `${topBottomValue}px`,
            paddingLeft: `${LeftRightValue}px`,
            paddingRight: `${LeftRightValue}px`,
            justifyContent: headAlign,
            width: loading ? '150px' : undefined,
          }}
        >
          {loading ? (
            <Skeleton className={classNames(cardClasses.full)} />
          ) : (
            <>
              <div
                className={classNames(cardClasses.head.title)}
                style={{ color: titleColor }}
              >
                {title}
              </div>
              <div
                className={classNames({ [cardClasses.head.extra]: extra })}
                style={{
                  padding: `${extraLRValue}px ${extraTBValue}px`,
                }}
              >
                {extra}
              </div>
            </>
          )}
        </div>
      )}

      <div className={bodyClassName}>{loading ? <Skeleton count={2} /> : children}</div>
    </div>
  );
});
