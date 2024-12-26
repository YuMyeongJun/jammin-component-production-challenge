import { forwardRef } from "react";
import { Flex } from "@components/layout/flex";

import { Radio } from "./Radio";
import { radioClasses } from "./RadioClasses";
import { IRadioOptionsProps } from "./RadioGroup.types";

export const RadioGroup = forwardRef<HTMLInputElement, IRadioOptionsProps>(
  (args, ref) => {
    const { style, options, name, disabled, vertical, gap, ...inputProps } =
      args;

    return (
      <Flex vertical={vertical} gap={gap} className={radioClasses.groupWrapper}>
        {options.map((option, i) => (
          <Radio
            name={name}
            key={i}
            disabled={option.disabled}
            checked={option.checked}
            defaultChecked={option.defaultChecked}
            value={option.value}
            onChange={option.onChange}
            {...inputProps}
          >
            <span>{option.label}</span>
          </Radio>
        ))}
      </Flex>
    );
  },
);

RadioGroup.displayName = "jammin_radio_group";
