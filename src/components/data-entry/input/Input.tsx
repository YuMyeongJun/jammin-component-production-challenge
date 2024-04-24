import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  useRef,
  useState,
} from "react";
import { inputUtil } from "@modules/utils/input";
import classNames from "classnames";

import { IInputProps } from "./Input.types";
import { inputClasses } from "./InputClasses";
import { Button } from "../button";

export const Input = forwardRef<HTMLInputElement, IInputProps>((args, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [textLength, setTextLength] = useState<number>(
    args.value?.toString().length || 0,
  );
  const {
    showCount,
    isError,
    isSearch,
    isClearable,
    isShowAlwaysClear,
    customPrefix,
    suffix,
    direction = "inside",
    useFocus = true,
    useBorder = true,
    controlSize = "md",
    useEllipsis = false,
    onPressEnter,
    onPressEsc,
    onSearch,
    onClear,
    ...inputProps
  } = args;

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    args.onKeyDown?.(e);

    switch (e.key) {
      case "Enter":
        onPressEnter?.(inputRef.current?.value);
        onSearch?.(inputRef.current?.value);
        if (onPressEnter || onSearch) {
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case "Escape":
        onPressEsc?.();
        if (onPressEsc) {
          e.preventDefault();
          e.stopPropagation();
        }
        break;
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    args.onChange?.(e);
    setTextLength(e.target.value?.length || 0);
  };

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    args.onBlur?.(e);
    onSearch?.(e.target.value);
  };

  const wrappingType =
    false || showCount || isSearch || isClearable || customPrefix || suffix;

  const inputClassName = classNames(
    wrappingType
      ? ""
      : `${args.className ?? ""} ${inputClasses.normal.root} ${useFocus && !isError ? "focus:ring-2 ring-[var(--jammin-primary-color-light)] focus:border-[var(--jammin-primary-color-main)]" : ""} `,
    {
      invalid: isError,
    },
    {
      [inputClasses.normal.sm]: controlSize === "sm",
      [inputClasses.normal.md]: controlSize === "md",
      [inputClasses.normal.lg]: controlSize === "lg",
    },
    {
      "text-ellipsis": useEllipsis,
    },
  );

  const inputWrapClassName = classNames(
    wrappingType ? `${args.className ?? ""} ${inputClasses.wrapped.root}` : "",
    useFocus && !args.disabled
      ? "focus-within:ring-2 ring-[var(--jammin-primary-color-light)] focus-within:border-[var(--jammin-primary-color-main)]"
      : "",
    useBorder && "border-[length:var(--jammin-border-width)]",
    {
      invalid: isError && useBorder,
    },
    {
      [inputClasses.wrapped.sm]: controlSize === "sm",
      [inputClasses.wrapped.md]: controlSize === "md",
      [inputClasses.wrapped.lg]: controlSize === "lg",
    },
  );

  const input = (
    <input
      {...inputProps}
      className={inputClassName}
      onKeyDown={
        onPressEnter || onPressEsc || onSearch || args.onKeyDown
          ? handleKeyUp
          : undefined
      }
      ref={(current) => {
        if (ref) {
          if (typeof ref === "function") {
            ref(current);
          } else {
            ref.current = current;
          }
        }
        inputRef.current = current;
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      readOnly={args.readOnly}
      title={inputRef.current?.value}
      autoComplete="off"
    />
  );

  const wrappedInput = (
    <div
      className={inputWrapClassName}
      onClick={() => !args.disabled && inputRef.current?.focus()}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {customPrefix ? (
        <div
          className={inputClasses.prefixWrapper}
          data-disabled={args.disabled}
        >
          {customPrefix}
        </div>
      ) : null}
      <div className="grow">{input}</div>
      <div className={inputClasses.suffixWrapper}>
        {showCount && direction === "inside" ? (
          <span className={inputClasses.count}>
            <>
              {args.textLength || textLength}
              {args.maxLength ? `/${args.maxLength}` : undefined}
            </>
          </span>
        ) : null}
        {isSearch ? (
          <>
            <Button
              variant="text"
              size="sm"
              className={inputClasses.button.root}
              onClick={() => {
                inputUtil.TriggerInputOnChange(inputRef.current, "");
                setTextLength(0);
                onSearch?.("");
              }}
              disabled={args.disabled}
            >
              <div
                className={classNames(inputClasses.button.search, {
                  [inputClasses.button.clear]: textLength,
                })}
              />
            </Button>
          </>
        ) : null}
        {isClearable && (isShowAlwaysClear || textLength) && !isSearch ? (
          <Button
            className={inputClasses.button.root}
            variant="text"
            size="sm"
            onClick={() => {
              inputUtil.TriggerInputOnChange(inputRef.current, "");
              setTextLength(0);
              onClear?.();
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            disabled={args.disabled}
          >
            <div className={inputClasses.button.clear} />
          </Button>
        ) : null}
        <div className="suffix" data-disabled={args.disabled}>
          {suffix}
        </div>
      </div>
    </div>
  );

  const inputChildren = wrappingType ? wrappedInput : input;

  return inputChildren;
});
