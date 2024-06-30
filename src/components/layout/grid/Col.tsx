import { forwardRef, useMemo } from 'react';
import classNames from 'classnames';

import { IColProps } from './Col.types';

const getFlexValue = (basisValue: string, flex?: string | number): string => {
  if (!flex) return basisValue;

  if (flex === 'auto') return `1 1 ${flex}`;

  if (typeof flex === 'string' && flex.includes(' ')) {
    return flex;
  }

  if (typeof flex === 'number' || (typeof flex === 'string' && Number(flex))) {
    return `${flex} ${flex} auto`;
  }

  return `0 0 ${flex}`;
};

export const Col = forwardRef<HTMLDivElement, IColProps>((args, ref) => {
  const { flex, span, order, children, style, paddingvalue, className, ...props } = args;

  const { basisValue, maxWidth } = useMemo(() => {
    const basis = span && span > 0 ? (span * 100) / 24 : 0;

    return {
      basisValue: basis > 0 ? `0 0 ${basis}%` : 'none',
      maxWidth: basis > 0 ? `${basis}%` : 'auto',
    };
  }, [span]);

  const flexValue = useMemo(() => getFlexValue(basisValue, flex), [basisValue, flex]);

  return (
    <div
      ref={ref}
      {...props}
      className={classNames(className)}
      style={{
        display: span === 0 ? 'none' : 'block',
        maxWidth: maxWidth,
        flex: flexValue,
        padding: paddingvalue ? `0 ${paddingvalue}px` : '0',
        order,
      }}
    >
      <div style={{ ...style }} className={classNames('h-full')}>
        {children}
      </div>
    </div>
  );
});
