import { forwardRef, useRef } from "react";
import { Flex } from "@components/layout/flex";

import { Radio } from "./Radio";
import { radioClasses } from "./RadioClasses";
import { IRadioOptions } from "./RadioGroup.types";
import { composeRef } from "@modules";

export const RadioGroup = forwardRef<HTMLInputElement, IRadioOptions>(
  (args, ref) => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const { options, name, vertical, gap, ...inputProps } = args;

    return (
      <Flex
        ref={composeRef(divRef, ref)}
        vertical={vertical}
        gap={gap}
        className={radioClasses.groupWrapper}
      >
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
