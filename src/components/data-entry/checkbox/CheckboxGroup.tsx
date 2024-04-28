import * as React from "react";
import OutlineBlankRoundedIcon from "@assets/icons/ic_checkbox_outline_blank_rounded.svg?react";
import CheckboxRoundedIcon from "@assets/icons/ic_checkbox_rounded.svg?react";
import { useControlled } from "@hooks/useControlled";
import classNames from "classnames";

import { Checkbox } from "./Checkbox";
import { ICheckboxGroupProps, CheckboxOption } from "./CheckboxGroup.types";
import { checkboxGroupClasses as classes } from "./CheckboxGroupClasses";
import CheckboxGroupContext from "./CheckboxGroupContext";
import { forwardRef } from "react";

const defaultCheckedIcon = <CheckboxRoundedIcon />;
const defaultUncheckedIcon = <OutlineBlankRoundedIcon />;

export const CheckboxGroup = forwardRef<HTMLDivElement, ICheckboxGroupProps>(
  (args, ref) => {
    const {
      checkedIcon = defaultCheckedIcon,
      uncheckedIcon = defaultUncheckedIcon,
      name: nameProp,
      value: valueProp,
      defaultValue,
      disabled = false,
      readOnly = false,
      required = false,
      slotProps = {},
      className,
      color = "primary",
      // size = 'md',
      style,
      options = [],
      onChange,
      ...other
    } = args;

    const [valueState, setValueState] = useControlled({
      controlled: valueProp,
      defaultValue: defaultValue,
    });

    const value = valueState ?? [];
    const defaultName = React.useId();
    const name = nameProp ?? defaultName;

    const memoOptions = React.useMemo(
      () =>
        options.map<CheckboxOption>((option) => {
          if (typeof option === "string") {
            return { label: option, value: option };
          }
          return option;
        }),
      [options],
    );

    const childrenNode = memoOptions.map<React.ReactNode>((option) => (
      <Checkbox
        key={option.value.toString()}
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
        id={option.id}
        value={option.value}
        checked={value.includes(option.value)}
        disabled={"disabled" in option ? option.disabled : disabled}
        readOnly={"readOnly" in option ? option.readOnly : readOnly}
        required={"required" in option ? option.required : required}
        color={color}
        // size={size}
        slotProps={{
          root: option.slotProps?.root || slotProps.root,
          checkbox: option.slotProps?.checkbox || slotProps.checkbox,
          input: option.slotProps?.input || slotProps.input,
          label: option.slotProps?.label || slotProps.label,
        }}
        label={option.label}
        onChange={option.onChange}
      />
    ));

    const rootClassName = classNames(
      classes.root,
      {
        // disabled
        [classes.disabled]: disabled,
      },
      className,
    );

    const contextValue = React.useMemo(
      () => ({
        name,
        value,
        onChange(event: React.ChangeEvent<HTMLInputElement>) {
          const targetValue = event.target.value;
          const optionIndex = value.indexOf(targetValue);
          const newValue = [...value];

          if (optionIndex === -1) {
            newValue.push(targetValue);
          } else {
            newValue.splice(optionIndex, 1);
          }

          setValueState(newValue);

          if (onChange) {
            onChange(event, targetValue, newValue);
          }
        },
      }),
      [name, value, onChange, setValueState],
    );

    return (
      <div {...other} className={rootClassName} style={style} ref={ref}>
        <CheckboxGroupContext.Provider value={contextValue}>
          {childrenNode}
        </CheckboxGroupContext.Provider>
      </div>
    );
  },
);
