import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  useRef,
  useState,
} from "react";
import { Button } from "@components/general";
import { inputUtil } from "@modules/utils/input";
import classNames from "classnames";

import { IInputProps } from "./Input.types";
import { inputClasses } from "./InputClasses";

// Input 컴포넌트 정의
export const Input = forwardRef<HTMLInputElement, IInputProps>((args, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [textLength, setTextLength] = useState<number>(
    args.value?.toString().length || 0,
  );

  // props에서 필요한 값 추출
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
    isNumeric = false,
    inputClassNames,
    onPressEnter,
    onPressEsc,
    onSearch,
    onClear,
    ...inputProps
  } = args;

  // 키보드 이벤트 핸들러
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

  // 입력 변경 이벤트 핸들러
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNumeric) {
      const value = e.currentTarget.value.replace(/[^0-9]/g, "");

      if (
        e.currentTarget.maxLength > 0 &&
        value.length > e.currentTarget.maxLength
      ) {
        e.currentTarget.value = value.slice(0, e.currentTarget.maxLength);
      } else if (e.currentTarget.maxLength < 0) {
        e.currentTarget.value = value;
      }
    }
    args.onChange?.(e);
    setTextLength(e.target.value?.length || 0);
  };

  // 포커스 아웃 이벤트 핸들러
  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    args.onBlur?.(e);
    onSearch?.(e.target.value);
  };

  // isNumberic인 경우 숫자만 입력되도록 처리
  const getNumberOnly = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, "");
  };

  // 래핑 타입 결정
  const wrappingType =
    false || showCount || isSearch || isClearable || customPrefix || suffix;

  // 입력 필드 클래스 이름 설정
  const inputClassName = classNames(
    wrappingType
      ? inputClassNames
      : // useFocus사용하면서 에러가 아닐경우에 포커스가 되어있는 상태에서 파란색 ring css
        `${args.className ?? ""} ${inputClasses.normal.root} ${useFocus && !isError ? "focus:ring-2 ring-[var(--bc-primary-color-light)] focus:border-[var(--bc-primary-color-main)]" : ""} `,
    {
      // 에러가 발생하거나 maxLength보다 입력한 글자수가 많을 경우 빨간 ring css
      invalid: isError || (args.maxLength && textLength > args.maxLength),
    },
    {
      [inputClasses.normal.sm]: controlSize === "sm",
      [inputClasses.normal.md]: controlSize === "md",
      [inputClasses.normal.lg]: controlSize === "lg",
    },
    {
      "text-ellipsis": useEllipsis,
    },
    {
      disable: args.disabled,
    },
  );

  // 입력 필드 래퍼 클래스 이름 설정
  const inputWrapClassName = classNames(
    wrappingType ? `${args.className ?? ""} ${inputClasses.wrapped.root}` : "",
    useFocus && !args.disabled
      ? // useFocus를 사용하면서 disable이 아닐경우 포커스 시 파란 ring css 적용
        "focus-within:ring-2 ring-[var(--bc-primary-color-light)] focus-within:border-[var(--bc-primary-color-main)]"
      : "",
    // border를 사용할 경우 border의 두께(셀렉트와 같이 input을 하위 컴포넌트로 사용할 경우에 useBorder 상태값 사용)
    useBorder && "border-[length:var(--bc-border-width)]",
    {
      // 에러가 난 상태이고 useBorder를 사용하는경우 또는 maxLength보다 입력한 글자수가 많을 경우(셀렉트와 같이 input을 하위 컴포넌트로 사용할 경우에 useBorder 상태값 사용)
      invalid:
        (isError && useBorder) ||
        (args.maxLength && textLength > args.maxLength),
    },
    {
      [inputClasses.wrapped.sm]: controlSize === "sm",
      [inputClasses.wrapped.md]: controlSize === "md",
      [inputClasses.wrapped.lg]: controlSize === "lg",
    },
    {
      disable: args.disabled,
    },
  );

  // 입력 필드 JSX
  const input = (
    <>
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
        onMouseDown={(e) => {
          // e.stopPropagation();
        }}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        readOnly={args.readOnly}
        title={inputRef.current?.value}
        autoComplete="off"
        maxLength={args.maxLength}
        max={args.maxLength}
        onKeyUp={(e) => {
          // isNumberic인 경우 숫자만 입력되도록 처리
          if (isNumeric) getNumberOnly(e);
        }}
      />
    </>
  );

  // 래핑된 입력 필드 JSX(input과 글자수 카운터 및 prefix, suffix등 다른 기능 같이 사용할 경우)
  const wrappedInput = (
    <>
      <div
        className={inputWrapClassName}
        onClick={(e) => {
          !args.disabled && inputRef.current?.focus();
          args.disabled && e.preventDefault();
        }}
        onMouseDown={(e) => {
          // e.preventDefault();
          // e.stopPropagation();
        }}
      >
        {/* input 앞의 prefix. 아이콘이나 기호 등 사용 */}
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
          {/* 텍스트 카운터를 input 안에서 사용할 경우 */}
          {showCount && direction === "inside" ? (
            <span className={inputClasses.count}>
              <>
                {args.textLength || textLength}
                {args.maxLength ? `/${args.maxLength}` : undefined}
              </>
            </span>
          ) : null}
          {/* 검색 기능 버튼 사용 */}
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
    </>
  );

  // 최종 렌더링할 컴포넌트 결정
  const inputChildren = wrappingType ? wrappedInput : input;

  return inputChildren;
});
