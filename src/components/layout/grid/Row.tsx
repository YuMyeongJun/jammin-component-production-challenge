import React, { forwardRef, ReactNode, useMemo } from 'react';
import classNames from 'classnames';

import { IRowProps } from './Row.types';
import { rowClasses } from './RowClasses';

export const Row = forwardRef<HTMLDivElement, IRowProps>((args, ref) => {
  const {
    wrap = 'wrap',
    justify,
    gutter = 0,
    align,
    children,
    style,
    className,
    ...props
  } = args;
  const rootClassName = classNames(rowClasses.root, rowClasses.boxBorder);

  const [colValue, rowValue] = Array.isArray(gutter)
    ? [gutter[0] / 2, gutter[1]]
    : [gutter / 2, gutter];

  const addStyleChildren = useMemo(
    () =>
      React.Children.map<ReactNode, ReactNode>(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const element = child as React.ReactElement<any>;
        return React.cloneElement(element, {
          paddingvalue: colValue,
          className: classNames(rootClassName),
        });
      }),
    [children, colValue],
  );

  return (
    <div
      ref={ref}
      {...props}
      className={classNames('flex', rootClassName, className)}
      style={{
        ...style,
        flexWrap: wrap,
        justifyContent: justify,
        alignItems: align,
        rowGap: `${rowValue}px`,
        marginLeft: `-${colValue}px`,
        marginRight: `-${colValue}px`,
      }}
    >
      {addStyleChildren}
    </div>
  );
});
