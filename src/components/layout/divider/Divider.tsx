import classNames from 'classnames';

import { IDividerProps } from './Divider.types';
import { dividerClasses } from './DividerClasses';

export const Divider = ({
  type,
  borderStyle,
  style,
  className,
  ...props
}: IDividerProps) => {
  const rootClassName = classNames(
    dividerClasses.root,
    dividerClasses.direction[type as keyof typeof dividerClasses.direction],
  );

  return (
    <div
      {...props}
      className={classNames(rootClassName, className)}
      style={{ ...style, borderStyle: borderStyle }}
    ></div>
  );
};
