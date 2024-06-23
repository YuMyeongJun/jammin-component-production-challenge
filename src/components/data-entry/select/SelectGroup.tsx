import React, { ReactElement, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { IcSearch } from "@assets/icons";
import IcToggleArrowDown from "@assets/icons/ic_select_toggle_arrow_down.svg?react";
import IcToggleArrowUp from "@assets/icons/ic_select_toggle_arrow_up.svg?react";
import { BodyPortal, Flex, Input } from "@components";
import { useOutsideClick } from "@hooks/useOutsideClick";
import { AnyObject } from "@models/types/AnyObject";
import classNames from "classnames";

import { ISelectGroupProp } from "./Select.types";
import { selectClasses } from "./SelectClasses";
import { selectGroupClasses } from "./SelectGroupClasses";

function SelectGroupFunc<T extends AnyObject>(
  props: ISelectGroupProp<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    title,
    onChange,
    fullWidth,
    value,
    bordered,
    disabled,
    placeholder,
    placement = "bottom",
    open,
    offset = [0, 0],
    suffixIcon,
    options,
    displayLabel,
    valuePath,
    groupLabel,
    itemsLabel,
    items,
    selectWidth = 284,
    listWidth,
    listMaxHeight = 272,
    controlSize = "md",
    isError,
    preSuffixIcon,
    useBorder,
    useFocus,
    className,
    style,
    listClassName,
    filterOption = false,
    useEllipsis = false,
    ...inputProps
  } = props;

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [list, setList] = useState<
    Array<{
      groupLabel: string;
      options: Array<{
        label: string;
        value: string;
        disabled?: boolean;
      }>;
    }>
  >();
  const [tmpList, setTmpList] = useState<
    Array<{
      groupLabel: string;
      options: Array<{
        label: string;
        value: string;
        disabled?: boolean;
      }>;
    }>
  >();

  const popperUl = useRef<HTMLUListElement>(null);
  const referenceDiv = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedLabel, setSelectedLabel] = useState<string>("");

  const [hoverText, setHoverText] = useState("");
  const [ulWidth, setUlWidth] = useState<string>("0px");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const groupRef = useRef<HTMLLIElement[]>([]);

  const { styles, attributes, update } = usePopper(
    referenceDiv.current,
    popperUl.current,
    {
      placement: placement,

      modifiers: [
        {
          name: "offset",
          options: {
            offset: offset,
          },
        },
      ],

      strategy: "fixed",
    },
  );

  const popperUpdate = () => {
    void update?.();
  };

  useOutsideClick(
    filterOption
      ? [selectRef, inputRef, groupRef, popperUl]
      : [selectRef, groupRef, popperUl],
    () => {
      setShowOptions(false);
    },
    "mousedown",
  );

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (selectRef.current) {
      const currentWidth = `${selectRef.current.offsetWidth}px`;
      setUlWidth(currentWidth);
    }
  }, []);

  useEffect(() => {
    if (searchValue === "") {
      setList(tmpList);
    } else {
      const lowerCaseSearchValue = searchValue.toLowerCase();
      const newList = tmpList
        ?.filter(
          (group) =>
            group.options.filter((x) =>
              x.label.toLowerCase().includes(lowerCaseSearchValue),
            ).length > 0,
        )
        .map((group) => ({
          ...group,
          options: group.options.filter((x) =>
            x.label.toLowerCase().includes(lowerCaseSearchValue),
          ),
        }));
      setList(newList);
    }
  }, [searchValue]);

  useEffect(() => {
    if (options) {
      setList(options ?? []);
      setTmpList(options ?? []);
    } else {
      const group = groupLabel ?? "groupLabel";
      const key = displayLabel ?? "label";
      const valueKey = valuePath ?? "value";
      const itemsName = itemsLabel ?? "itemsLabel";

      const temp = items?.map((item) => {
        const groupItems = item[itemsName];
        return {
          groupLabel: item[group],
          options: Array.isArray(groupItems)
            ? groupItems.map((x: { [key: string]: any }) => ({
                label: x[key],
                value: x[valueKey],
                disabled: x["disabled"] ?? false,
              }))
            : [],
        };
      });

      setList(temp ?? []);
      setTmpList(temp ?? []);
    }
  }, []);

  useEffect(() => {
    if (value) {
      findLabel(value);
    }
  }, [value]);

  const onChangeValue = (text: string, label: string) => {
    if (text === "" || label === "") {
      return;
    }

    setShowOptions(false);
    setSearchValue("");

    setSelectedLabel(label.trim() ?? "");
    setSelectedValue(text.trim() ?? "");
    onChange?.(text.trim());
  };

  const findLabel = (value: string) => {
    const temp = list?.flatMap((x) => x.options);
    const result = temp
      ?.find((x) => x.value.trim() === value.trim())
      ?.label.trim();
    setSelectedLabel(result ?? "");
    setSelectedValue(value.trim() ?? "");
    onChange?.(result ? value : "");
    popperUpdate();
  };

  const rootClassName = classNames(selectGroupClasses.root);
  const controlSizeClassName = classNames({
    [selectGroupClasses.normal.sm]: controlSize === "sm",
    [selectGroupClasses.normal.md]: controlSize === "md",
    [selectGroupClasses.normal.lg]: controlSize === "lg",
  });
  const selectUl = classNames(selectGroupClasses.selectUl.root);
  const fontClassName = classNames({
    [selectGroupClasses.selectUl.font.sm]: controlSize === "md",
    [selectGroupClasses.selectUl.font.md]: controlSize === "lg",
  });

  return (
    <Flex
      vertical={false}
      className={classNames(rootClassName, controlSizeClassName)}
    >
      <Flex
        ref={selectRef}
        gap={8}
        className={classNames({
          ["cursor-not-allowed"]: disabled,
        })}
        style={{ width: fullWidth ? "100%" : `${selectWidth}px` }}
      >
        <Flex
          ref={referenceDiv}
          justify="space-between"
          style={{ ...style, width: "inherit" }}
          align="center"
          gap={4}
          onClick={() => {
            if (!disabled) {
              setShowOptions(!showOptions);
              setSearchValue("");
              popperUpdate();
            }
          }}
        >
          <Input
            useEllipsis={useEllipsis}
            {...inputProps}
            customPrefix={preSuffixIcon}
            controlSize={controlSize}
            autoComplete="off"
            placeholder={
              placeholder === "선택" && title
                ? `${title} ${placeholder}`
                : placeholder
            }
            type="text"
            disabled={disabled}
            readOnly={true}
            className={classNames(
              "px-[12px]",
              showOptions
                ? selectGroupClasses.border
                : selectGroupClasses.normal.root,
              { [selectGroupClasses.error]: isError },
              controlSizeClassName,
              selectGroupClasses.text,
              { "w-full": fullWidth },
              "text-body-text",
              {
                "font-[var(--jammin-placeholder-font-weight)]":
                  placeholder && selectedValue === "",
              },
            )}
            value={selectedLabel}
            isError={isError}
            useBorder={useBorder}
            useFocus={false}
            suffix={
              suffixIcon ? (
                <div
                  className={classNames(
                    disabled
                      ? selectClasses.icon.disabled
                      : selectClasses.icon.root,
                  )}
                >
                  {suffixIcon}
                </div>
              ) : (
                <div
                  className={classNames(
                    disabled ? selectClasses.icon.disabled : "auto",
                  )}
                >
                  {showOptions ? (
                    <IcToggleArrowDown fill={"black"} />
                  ) : (
                    <IcToggleArrowUp fill={!disabled ? "black" : "#d9d9d9"} />
                  )}
                </div>
              )
            }
          />
        </Flex>
        <BodyPortal>
          <ul
            ref={popperUl}
            {...attributes.popper}
            style={{
              ...styles.popper,
              ...style,
              visibility: showOptions ? "visible" : "hidden",
              margin:
                placement === "bottom"
                  ? "8px 0 0px"
                  : placement === "left"
                    ? "0 8px 0 0"
                    : placement === "right"
                      ? "0 0 0 8px"
                      : "0 0 8px",
              padding: " 8px 0 12px",
              maxHeight: `${listMaxHeight}px`,
              width: `${listWidth ? listWidth + "px" : ulWidth}`,
            }}
            className={classNames(selectUl, selectGroupClasses.selectUl.border)}
          >
            {filterOption && (
              <Flex justify="center" className="px-[12px] py-[4px]">
                <Input
                  className="w-full"
                  customPrefix={<IcSearch />}
                  onChange={inputOnChange}
                  useFocus
                  value={searchValue}
                  onBlur={() => setShowOptions(false)}
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
                />
              </Flex>
            )}

            {list && list.length > 0 ? (
              list.map((x, idx) => (
                <div key={idx}>
                  <li
                    key={x.groupLabel}
                    className={classNames("text-body-text")}
                    title={x.groupLabel}
                    ref={(ref: HTMLLIElement) => {
                      groupRef.current[idx] = ref!;
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    {x.groupLabel}
                  </li>
                  {x.options &&
                    x.options.map((option) => {
                      return !option.disabled ? (
                        <li
                          role="option"
                          title={option.label.trim()}
                          key={`${x.groupLabel.trim()}_${option.label.trim()}`}
                          className={classNames(
                            "option",
                            fontClassName,
                            selectGroupClasses.selectUl.font.root,
                            {
                              [selectGroupClasses.selectUl.hover]:
                                option.value.trim() === hoverText,
                              [selectGroupClasses.selectUl.selected]:
                                selectedValue === option.value.trim(),
                              [selectGroupClasses.selectUl.hoverSelected]:
                                option.value.trim() === hoverText &&
                                selectedValue === option.value.trim(),
                            },
                            selectGroupClasses.selectUl.overflow,
                          )}
                          onMouseDown={() =>
                            onChangeValue(
                              option.value.trim(),
                              option.label.trim(),
                            )
                          }
                          onMouseEnter={(e) => {
                            setHoverText(option.value.trim());
                          }}
                          onMouseLeave={() => {
                            !showOptions && setHoverText("");
                          }}
                        >
                          {option.label.trim()}
                        </li>
                      ) : (
                        <li
                          key={option.value.trim()}
                          role="option"
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                          className={classNames(
                            "option",
                            fontClassName,
                            selectGroupClasses.selectUl.font.root,
                            selectGroupClasses.selectUl.disabled,
                            selectGroupClasses.selectUl.overflow,
                          )}
                        >
                          {option.label}
                        </li>
                      );
                    })}
                </div>
              ))
            ) : (
              <li
                role="option"
                className={classNames(
                  fontClassName,
                  selectGroupClasses.selectUl.font.root,
                  "text-center text-label-secondary text-body-text",
                )}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                검색결과가 없습니다.
              </li>
            )}
          </ul>
        </BodyPortal>
      </Flex>
    </Flex>
  );
}
export const SelectGroup = React.forwardRef(SelectGroupFunc) as <
  T extends object,
>(
  props: ISelectGroupProp<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => ReactElement;
