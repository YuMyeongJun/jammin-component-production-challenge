import React, { ReactElement, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { IcSearch } from "@assets/icons";
import IcToggleArrowDown from "@assets/icons/ic_select_toggle_arrow_down.svg?react";
import IcToggleArrowUp from "@assets/icons/ic_select_toggle_arrow_up.svg?react";
import { BodyPortal, Flex, Input, Tag } from "@components";
import { useOutsideClick } from "@hooks/useOutsideClick";
import { AnyObject } from "@models";
import classNames from "classnames";

import { Checkbox } from "../checkbox/Checkbox";

import { multiSelectClasses } from "./MultiSelectClasses";
import { IMultipleSelectGroupProp } from "./Select.types";

function MultiSelectGroupFunc<T extends AnyObject>(
  props: IMultipleSelectGroupProp<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    placeholder,
    isCheckbox,
    value,
    options,
    displayLabel,
    valuePath,
    groupLabel,
    itemsLabel,
    items,
    vertical,
    preSuffixIcon,
    suffixIcon,
    tagStyle,
    tagBgColor,
    selectWidth = 284,
    listWidth,
    listMaxHeight = 272,
    isError,
    disabled,
    offset = [0, 0],
    placement = "bottom",
    controlSize = "md",
    tagClassName,
    gap = 0,
    style,
    fullWidth,
    filterOption = false,
    title,
    allOptionsLabel,
    useTag = true,
    onChange,
  } = props;

  const popperUl = useRef<HTMLUListElement>(null);
  const referenceDiv = useRef<HTMLDivElement>(null);
  const [isOptionsSet, setIsOptionsSet] = useState(false);
  const [totalOptionNum, setTotalOptionNum] = useState(0);

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

  const [selectedNum, setSelectedNum] = useState(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [hoverText, setHoverText] = useState("");
  const [list, setList] = useState<
    Array<{
      groupLabel: string;
      options: Array<{
        label: string;
        value: string;
        disabled?: boolean;
        checked?: boolean;
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
        checked?: boolean;
      }>;
    }>
  >();

  const [selectedValue, setSelectedValue] = useState<
    Array<{
      label: string;
      value: string;
      disabled?: boolean;
      checked?: boolean;
    }>
  >([]);

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [ulWidth, setUlWidth] = useState<string>("0px");
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const groupRef = useRef<HTMLLIElement[]>([]);

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
      initSettingOption(options);
    } else {
      const group = groupLabel ?? "groupLabel";
      const key = displayLabel ?? "label";
      const valueKey = valuePath ?? "value";
      const itemsName = itemsLabel ?? "itemsLabel";

      const temp = items?.map((item) => {
        const groupItems: any[] = item[itemsName];
        return {
          groupLabel: item[group],
          options: Array.isArray(groupItems)
            ? groupItems.map((x: { [key: string]: any }) => ({
                label: (x[key] as string)?.trim(),
                value: (x[valueKey] as string)?.trim(),
                disabled: x["disabled"] ?? false,
                checked: x["checked"] ?? false,
              }))
            : [],
        };
      });

      initSettingOption(temp);
    }
    setIsOptionsSet(true);
  }, []);

  const initSettingOption = (
    options:
      | Array<{
          groupLabel: string;
          options: Array<{
            label: string;
            value: string;
            disabled?: boolean;
            checked?: boolean;
          }>;
        }>
      | undefined,
  ) => {
    setList(options ?? []);
    setTmpList(options ?? []);
    setTotalOptionNum(options?.flatMap((x) => x.options).length ?? 0);
  };

  useEffect(() => {
    setSelectedNum(selectedValue.length);
  }, [selectedValue]);

  useEffect(() => {
    if (isOptionsSet && value) initValue();
  }, [isOptionsSet, value]);

  useOutsideClick(
    filterOption
      ? [selectRef, inputRef, groupRef, popperUl]
      : [selectRef, groupRef, popperUl],
    () => {
      setShowOptions(false);
    },
    "mousedown",
  );

  const popperUpdate = () => {
    void update?.();
  };

  const findValidItem = (val: string) => {
    const item = tmpList
      ?.flatMap((x) => x.options)
      .find((k) => k.value === val);
    if (item && item.disabled && !item.checked) {
      item.checked = true;
    }
    return item;
  };

  const initValue = (): void => {
    let result: string[] = [];
    if (Array.isArray(value)) {
      const res = value.map(findValidItem).filter(Boolean) as {
        label: string;
        value: string;
        disabled: boolean;
        checked?: boolean;
      }[];

      setSelectedValue(res ?? []);
      result = [...res.map((item) => item.value)];
    } else {
      const tmp = list
        ?.flatMap((x) => x.options)
        .find((k) => k.value === value && !k.disabled);

      setSelectedValue(tmp ? [tmp] : []);
      result = tmp ? [tmp.value] : [];
    }
    onChange?.(result);
  };

  const onChangeValue = (text: string) => {
    if (text === "") {
      return;
    }
    console.log("text");
    const exists = selectedValue.some((item) => item.value === text);

    if (exists) {
      const res = selectedValue.filter((item) => item.value !== text);
      setSelectedValue(res);
      onChange?.(res.map((item) => item.value));
    } else {
      const res = list
        ?.flatMap((x) => x.options)
        .find((k) => k.value === text && !k.disabled);
      setSelectedValue(res ? [...selectedValue, res] : []);
      onChange?.(res ? [res].map((item) => item.value) : []);
    }
    popperUpdate();
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const rootClassName = classNames(multiSelectClasses.root);
  const controlSizeClassName = classNames({
    [multiSelectClasses.normal.sm]: controlSize === "sm",
    [multiSelectClasses.normal.md]: controlSize === "md",
    [multiSelectClasses.normal.lg]: controlSize === "lg",
  });
  const multiSelectUl = classNames(multiSelectClasses.multiSelectUl.root);
  const fontClassName = classNames({
    [multiSelectClasses.multiSelectUl.font.sm]: controlSize === "md",
    [multiSelectClasses.multiSelectUl.font.md]: controlSize === "lg",
  });

  return (
    <Flex
      title={title}
      vertical={vertical}
      gap={gap}
      className={classNames(rootClassName, "h-full")}
      align={vertical ? "flex-start" : "center"}
      style={{ width: `${fullWidth && "100%"}` }}
    >
      <Flex gap={useTag ? 8 : 0}>
        <Flex
          ref={selectRef}
          gap={8}
          className={classNames(
            controlSizeClassName,
            {
              [multiSelectClasses.errorBorder]: isError,
              ["cursor-pointer"]: !disabled,
            },
            // `${fullWidth ? 'w-full' : `w-[${selectWidth}]`}`,
          )}
          style={{ width: `${fullWidth ? "100%" : `${selectWidth}px`}` }}
        >
          <Flex
            className={classNames(
              disabled ? multiSelectClasses.disabled : "bg-white",
              showOptions
                ? multiSelectClasses.border
                : multiSelectClasses.normal.root,
              { [multiSelectClasses.error]: isError },
            )}
            ref={referenceDiv}
            justify="space-between"
            style={{ ...style, width: "inherit" }}
            align="center"
            gap={4}
            onBlur={() => setShowOptions(false)}
            onClick={() => {
              !disabled && setShowOptions(!showOptions);
              setSearchValue("");
              // popperUpdate();
            }}
          >
            {preSuffixIcon && <span>{preSuffixIcon}</span>}
            <span
              className={classNames(
                fontClassName,
                multiSelectClasses.text,
                "text-body-text",
                {
                  "font-[var(--jammin-placeholder-font-weight)]":
                    !selectedNum && placeholder,
                },
              )}
            >
              {/* {selectedNum || placeholder}
            {title} {selectedNum > 0 && '개 선택'} */}
              {title} {selectedNum === 0 && placeholder}
            </span>
            <Flex gap={4} align="center" className="shrink-0">
              {totalOptionNum === selectedNum ? (
                <Tag
                  bordered={false}
                  color={disabled ? "#d9d9d9" : ""}
                  fontColor={disabled ? "#8A8A8E" : ""}
                  className={classNames("px-[6px] py-[2px] text-sub-title")}
                >
                  {allOptionsLabel ?? "전체"}
                </Tag>
              ) : (
                selectedNum !== 0 && (
                  <Tag
                    bordered={false}
                    className="px-[6px] py-[2px] text-sub-title"
                  >
                    +{selectedNum}
                  </Tag>
                )
              )}
              {suffixIcon ? (
                suffixIcon
              ) : showOptions ? (
                <IcToggleArrowDown fill={"black"} />
              ) : (
                <IcToggleArrowUp fill={!disabled ? "black" : "#d9d9d9"} />
              )}
            </Flex>
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
              className={classNames(
                multiSelectUl,
                multiSelectClasses.multiSelectUl.border,
              )}
            >
              {filterOption && (
                <Flex justify="center" className="px-[12px] py-[4px]">
                  <Input
                    className="w-full"
                    customPrefix={<IcSearch />}
                    onChange={inputOnChange}
                    useFocus
                    value={searchValue}
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
                            key={`${x.groupLabel.trim()}_${option.value.trim()}`}
                            title={option.label.trim()}
                            className={classNames(
                              "option",
                              fontClassName,
                              multiSelectClasses.multiSelectUl.font.root,
                              {
                                [multiSelectClasses.multiSelectUl.hover]:
                                  option.value.trim() === hoverText,
                                [multiSelectClasses.multiSelectUl.selected]:
                                  selectedValue.some(
                                    (x) => x.value === option.value.trim(),
                                  ),
                                [multiSelectClasses.multiSelectUl
                                  .hoverSelected]:
                                  option.value.trim() === hoverText &&
                                  selectedValue.some(
                                    (x) => x.value === option.value.trim(),
                                  ),
                              },
                              multiSelectClasses.multiSelectUl.overflow,
                            )}
                            onMouseDown={() =>
                              onChangeValue(option.value.trim())
                            }
                            onMouseEnter={(e) => {
                              setHoverText(option.value.trim());
                            }}
                            onMouseLeave={() => {
                              !showOptions && setHoverText("");
                            }}
                          >
                            {isCheckbox && (
                              <Checkbox
                                onClick={() =>
                                  onChangeValue(option.value.trim())
                                }
                                checked={selectedValue.some(
                                  (x) => x.value === option.value.trim(),
                                )}
                              />
                            )}
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
                              multiSelectClasses.multiSelectUl.overflow,
                              multiSelectClasses.multiSelectUl.font.root,
                              multiSelectClasses.multiSelectUl.disabled,
                            )}
                          >
                            {isCheckbox && (
                              <Checkbox
                                onClick={() =>
                                  onChangeValue(option.value.trim())
                                }
                                checked={list
                                  ?.flatMap((x) => x.options)
                                  .some(
                                    (val) =>
                                      val.value.trim() ===
                                        option.value.trim() &&
                                      val.disabled &&
                                      val.checked,
                                  )}
                                disabled
                              />
                            )}
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
                    multiSelectClasses.multiSelectUl.font.root,
                  )}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  No data
                </li>
              )}
            </ul>
          </BodyPortal>
        </Flex>
        {useTag && (
          <Flex gap={4} align="center">
            {selectedValue.map((x, idx) => (
              <Tag
                className={classNames(tagClassName, "text-body-text")}
                style={{ ...tagStyle, margin: "4px 0" }}
                closeIcon={disabled ? false : !x.disabled && !x.checked}
                color={tagBgColor}
                bordered={false}
                key={idx}
                onClose={() => onChangeValue(x.value)}
              >
                {x.label}
              </Tag>
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export const MultiSelectGroup = React.forwardRef(MultiSelectGroupFunc) as <
  T extends object,
>(
  props: IMultipleSelectGroupProp<T> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  },
) => ReactElement;
