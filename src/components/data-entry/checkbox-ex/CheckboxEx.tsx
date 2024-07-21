import React from 'react';
import { checkboxExClasses, ICheckboxExProps } from '@components';
import classNames from 'classnames';

type CheckboxExRef = HTMLInputElement;

const getCheckboxClassName = (props: ICheckboxExProps, className?: string) => {
  const { checked, indeterminate, disabled, color } = props;
  return classNames(
    checkboxExClasses.root,
    {
      [checkboxExClasses.checked]: checked,

      // 전체 선택을 사용할 경우 모두 선택이 안되고 일부만 선택된 경우의 클래스
      [checkboxExClasses.indeterminate]: indeterminate,
      [checkboxExClasses.disabled]: disabled,
      [checkboxExClasses[color || 'primary']]: true,
    },
    className,
  );
};

export const CheckboxEx = React.forwardRef<CheckboxExRef, ICheckboxExProps>(
  (
    {
      checked,
      defaultChecked,
      onChange,
      disabled = false,
      className,
      label = '',
      indeterminate,
      color = 'primary',
      readOnly = false,
      required = false,
      labelGap,
      value,
      name,
      inputClassName,
      labelClassName,
    },
    ref,
  ) => {
    const rootClassName = getCheckboxClassName(
      { checked, indeterminate, disabled, color, label },
      className,
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.nativeEvent.defaultPrevented) {
        return;
      }

      if (!readOnly && onChange) {
        onChange(e);
      }
    };

    return (
      <label className={rootClassName}>
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          className={classNames(checkboxExClasses.input, inputClassName)}
          aria-checked={indeterminate ? 'mixed' : checked}
          value={value}
          name={name}
          defaultChecked={defaultChecked}
        />
        {/* label을 사용할 경우 */}
        {label && (
          <span
            className={classNames(
              checkboxExClasses.label,
              // label을 컨트롤하기 위한 클래스
              labelClassName,
              // disabled일 경우 label을 컨트롤하기 위한 클래스
              disabled && checkboxExClasses.disabledLabel,
            )}
            style={{ marginLeft: labelGap }}
          >
            {label}
          </span>
        )}
      </label>
    );
  },
);
