import { forwardRef } from 'react';
import { Flex } from '@components/layout/flex';
import classNames from 'classnames';

import { ISwitchExProps } from './SwitchEx.types';
import { switchExClasses } from './SwitchExClasses';

export const SwitchEx = forwardRef<HTMLInputElement, ISwitchExProps>((args, ref) => {
  const {
    className,
    switchSize = 'md',
    color = 'primary',
    disabled,
    ...switchProps
  } = args;

  const rootClassName = classNames(
    switchExClasses.root,
    switchExClasses.wrapper,
    className,
  );
  const switchBarClassName = classNames(
    switchExClasses.bar,
    {
      // size

      [switchExClasses.size[switchSize] ?? switchExClasses.size.lg]: true,
      // color
      [switchExClasses.color[color as keyof typeof switchExClasses.color] ??
      switchExClasses.color.primary]: true,
    },
    className,
  );

  return (
    <Flex align="center">
      <label className={classNames(rootClassName)}>
        <input
          id={args.id}
          type="checkbox"
          className={`${switchExClasses.input} peer`}
          ref={ref}
          checked={args.checked}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={args.onChange}
          disabled={disabled}
          {...switchProps}
        />
        <label htmlFor={args.id} className="hidden" />
        <div className={switchBarClassName} />
      </label>
    </Flex>
  );
});
