import classNames from 'classnames';

import { IButtonExProps } from './ButtonEx.types';
import { buttonExClasses } from './buttonExClasses';

export const ButtonEx = ({
  type = 'bordered',
  htmlType = 'button',
  shape = 'round',
  color = 'gray',
  size = 'md',
  prefix,
  suffix,
  block,
  className,
  children,
  ...buttonProps
}: IButtonExProps) => {
  const prefixNode = prefix && <span className={buttonExClasses.prefix}>{prefix}</span>;
  const suffixNode = suffix && <span className={buttonExClasses.suffix}>{suffix}</span>;

  return (
    <button
      {...buttonProps}
      className={classNames(
        className,
        buttonExClasses.root,
        buttonExClasses.type[type],
        buttonExClasses.shape[shape],
        {
          [buttonExClasses.size.base[size]]: shape !== 'circle',
          [buttonExClasses.size.circle[size]]: shape === 'circle',
          [buttonExClasses.color.base[color]]: type !== 'twotone',
          [buttonExClasses.color.twotone[color]]: type === 'twotone',
          ['w-full']: block,
        },
      )}
      type={htmlType}
    >
      <span className={buttonExClasses.content}>
        {prefixNode}
        {children}
        {suffixNode}
      </span>
    </button>
  );
};
