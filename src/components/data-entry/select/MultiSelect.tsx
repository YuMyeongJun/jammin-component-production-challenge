import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { IcSearch } from '@assets/icons';
import IcToggleArrowDown from '@assets/icons/ic_select_toggle_arrow_down.svg?react';
import IcToggleArrowUp from '@assets/icons/ic_select_toggle_arrow_up.svg?react';
import { BodyPortal, Flex, Input, Tag } from '@components';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { AnyObject } from '@models';
import classNames from 'classnames';

import { Checkbox } from '../checkbox/Checkbox';

import { multiSelectClasses } from './MultiSelectClasses';
import { INewMultipleSelectProp } from './Select.types';

function MultiSelectFunc<T extends AnyObject>(
  props: INewMultipleSelectProp<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    title,
    placeholder,
    isCheckbox = true,
    value,
    options,
    displayLabel,
    valuePath,
    items,
    vertical = false,
    preSuffixIcon,
    fullWidth,
    suffixIcon,
    tagStyle,
    tagBgColor,
    selectWidth = 284,
    listWidth,
    listMaxHeight = 164,
    isError,
    disabled,
    offset = [0, 0],
    placement = 'bottom',
    controlSize = 'md',
    gap = 0,
    style,
    tagClassName,
    useAllOption,
    useTag = true,
    filterOption = false,
    tagExtra,
    selectExtra,
    allOptionsLabel,
    onChange,
  } = props;

  const popperUl = useRef<HTMLUListElement>(null);
  const referenceDiv = useRef<HTMLDivElement>(null);
  const { styles, attributes, update } = usePopper(
    referenceDiv.current,
    popperUl.current,
    {
      placement: placement,

      modifiers: [
        {
          name: 'offset',
          options: {
            offset: offset,
          },
        },
      ],

      strategy: 'fixed',
    },
  );
  const [selectedNum, setSelectedNum] = useState(0);
  const [disabledNum, setDisabledNum] = useState(0);
  const [hoverText, setHoverText] = useState('');
  const [list, setList] =
    useState<
      Array<{ label: string; value: string; disabled?: boolean; checked?: boolean }>
    >();
  const [tmpList, setTmpList] =
    useState<
      Array<{ label: string; value: string; disabled?: boolean; checked?: boolean }>
    >();
  const [selectedValue, setSelectedValue] = useState<
    Array<{
      label: string;
      value: string;
      disabled?: boolean;
      checked?: boolean;
    }>
  >([]);
  const [defaultSelected, setDefaultSelected] = useState<
    Array<{
      label: string;
      value: string;
      disabled?: boolean;
      checked?: boolean;
    }>
  >([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  // const [isInitialValueSet, setIsInitialValueSet] = useState(false);
  const [ulWidth, setUlWidth] = useState<string>('0px');
  const [searchValue, setSearchValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const prevListRef = useRef(list);

  useEffect(() => {
    if (selectRef.current) {
      const currentWidth = `${selectRef.current.offsetWidth}px`;
      setUlWidth(currentWidth);
    }
  }, []);

  useEffect(() => {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    const newList = tmpList?.filter((val) =>
      lowerCaseSearchValue === ''
        ? true
        : val.label.toLowerCase().includes(lowerCaseSearchValue),
    );
    setList(newList);
  }, [searchValue]);

  useEffect(() => {
    const temp =
      options ??
      items?.map((x) => ({
        label: x[displayLabel ?? 'label'],
        value: x[valuePath ?? 'value'],
        disabled: x['disabled'],
        checked: x['checked'],
      })) ??
      [];

    const defaultSelected = temp.filter((x) => x.disabled && x.checked);
    setDefaultSelected(defaultSelected);

    setList(temp);
    setTmpList(temp);
    prevListRef.current = temp;
  }, []);

  useEffect(() => {
    if (prevListRef.current && prevListRef.current.length > 0) {
      const allOption = { label: allOptionsLabel ?? '전체', value: '' };
      if (useAllOption) {
        if (
          !prevListRef.current?.find(
            (item) => item.label === allOption.label && !item.disabled,
          )
        ) {
          setList([allOption, ...prevListRef.current]);
          setTmpList([allOption, ...prevListRef.current]);
          setSelectedNum(prevListRef.current.length + 1);
        }
      } else {
        prevListRef.current = prevListRef.current.filter(
          (item) => item.label !== allOption.label,
        );
        setList(prevListRef.current);
        setTmpList(prevListRef.current);
        setSelectedNum(prevListRef.current.length);
      }
    }
  }, [useAllOption, prevListRef]);

  useEffect(() => {
    setSelectedNum(selectedValue.length);
  }, [selectedValue]);

  useEffect(() => {
    initValue();
  }, [value, tmpList]);

  useOutsideClick(
    filterOption ? [selectRef, inputRef, popperUl] : [selectRef, popperUl],
    () => {
      setShowOptions(false);
    },
    'mousedown',
    // true,
  );

  const popperUpdate = () => {
    void update?.();
  };

  const findValidItem = (val: string) => {
    const item = list?.find((k) => k.value === val);
    if (item && item.disabled && !item.checked) {
      item.checked = true;
    }
    return item;
  };

  const initValue = (): void => {
    let result: Array<{
      label: string;
      value: string;
      disabled?: boolean;
      checked?: boolean;
    }> = [];

    if (Array.isArray(value)) {
      result = value.map(findValidItem).filter(Boolean) as {
        label: string;
        value: string;
        disabled: boolean;
        checked: boolean;
      }[];
    } else {
      const tmp = findValidItem(value ?? '');
      result = tmp ? [tmp] : [];
    }

    const tmpNum = defaultSelected.every((x) => {
      return result.some((y) => x.value === y.value);
    });

    let resNum = result.length;
    if (!tmpNum && defaultSelected.length > 0) {
      result = [...result, ...defaultSelected];
      resNum++;
    }

    const disabledNum = tmpList?.filter((x) => x.disabled && !x.checked).length ?? 0;

    setDisabledNum(disabledNum);

    const isAllSelected =
      useAllOption &&
      Array.isArray(value) &&
      (tmpList?.length ?? 0) - 1 === resNum + disabledNum;

    if (isAllSelected) {
      result = [
        {
          label: allOptionsLabel ?? '전체',
          value: '',
        },
        ...result,
      ];
    }

    setSelectedValue([...result]);
    setSelectedNum(result.length);
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onChangeValue = (text: {
    label: string;
    value: string;
    disabled?: boolean;
    checked?: boolean;
  }) => {
    if (text.label === '') {
      return;
    }

    let res: Array<{
      label: string;
      value: string;
      disabled?: boolean;
      checked?: boolean;
    }> = [];

    if (text.label === (allOptionsLabel ?? '전체') && text.value === '') {
      res =
        tmpList?.length === selectedNum + disabledNum
          ? defaultSelected.length > 0
            ? tmpList?.filter((x) => x.disabled && x.checked)
            : []
          : tmpList?.filter((x) => !x.disabled || (x.disabled && x.checked)) ?? [];
    } else {
      const isAllIncluded =
        useAllOption &&
        selectedValue.some(
          (x) => x.label === (allOptionsLabel ?? '전체') && x.value === '',
        );
      const isSelected = selectedValue.some(
        (x) =>
          x.label === text.label &&
          x.value === text.value &&
          (!x.disabled || (x.disabled && x.checked)),
      );

      if (isAllIncluded) {
        res = selectedValue.filter(
          (x) =>
            x.value !== text.value &&
            x.label !== (allOptionsLabel ?? '전체') &&
            (!x.disabled || (x.disabled && x.checked)),
        );
      } else if (isSelected) {
        res = selectedValue.filter(
          (x) => x.value !== text.value && (!x.disabled || (x.disabled && x.checked)),
        );
      } else {
        res = [...selectedValue, text];

        if (useAllOption && tmpList!.length - 1 === res.length + disabledNum) {
          res = [{ label: allOptionsLabel ?? '전체', value: '' }, ...res];
        }
      }
    }

    setSelectedValue(res);
    findValue(res);
  };

  const findValue = (value: { label: string; value: string; disabled?: boolean }[]) => {
    const result: string[] = [];
    value.forEach((x) => {
      if (x.value !== '') result.push(x.value);
    });

    onChange?.(result);
    popperUpdate();
  };

  const rootClassName = classNames(multiSelectClasses.root);
  const controlSizeClassName = classNames({
    [multiSelectClasses.normal.sm]: controlSize === 'sm',
    [multiSelectClasses.normal.md]: controlSize === 'md',
    [multiSelectClasses.normal.lg]: controlSize === 'lg',
  });
  const multiSelectUl = classNames(multiSelectClasses.multiSelectUl.root);
  const fontClassName = classNames({
    [multiSelectClasses.multiSelectUl.font.sm]: controlSize === 'md',
    [multiSelectClasses.multiSelectUl.font.md]: controlSize === 'lg',
  });

  return (
    <Flex
      title={title}
      vertical={vertical}
      gap={gap}
      className={classNames(rootClassName, 'h-full')}
      align={vertical ? 'flex-start' : 'center'}
      style={{ width: `${fullWidth && '100%'}` }}
    >
      <Flex
        ref={selectRef}
        gap={useTag ? 8 : 0}
        className={classNames(controlSizeClassName)}
        style={{ width: `${fullWidth || selectExtra ? '100%' : selectWidth + 'px'}` }}
        align="center"
      >
        <Flex
          className={classNames(
            showOptions ? multiSelectClasses.border : multiSelectClasses.normal.root,
            disabled ? multiSelectClasses.disabled : 'bg-white',
            {
              [multiSelectClasses.error]: isError,
              ['cursor-pointer']: !disabled,
              [multiSelectClasses.errorBorder]: isError,
            },
          )}
          onBlur={() => setShowOptions(false)}
          ref={referenceDiv}
          justify="space-between"
          style={{ ...style, width: selectWidth ? selectWidth + 'px' : 'inherit' }}
          align="center"
          gap={4}
          onClick={() => {
            !disabled && setShowOptions(!showOptions);
            setSearchValue('');
            popperUpdate();
          }}
        >
          {preSuffixIcon && <span>{preSuffixIcon}</span>}
          <span
            className={classNames(
              fontClassName,
              controlSizeClassName,
              multiSelectClasses.text,
              'text-body-text',
            )}
          >
            {title} {selectedNum === 0 && placeholder}
          </span>
          <Flex gap={4} align="center" className="shrink-0">
            {tmpList?.length === selectedNum + disabledNum ? (
              <Tag
                bordered={false}
                color={disabled ? '#d9d9d9' : ''}
                fontColor={disabled ? '#8A8A8E' : ''}
                className={classNames('px-[6px] py-[2px] text-sub-title')}
              >
                {allOptionsLabel ?? '전체'}
              </Tag>
            ) : (
              selectedNum !== 0 && (
                <Tag bordered={false} className="px-[6px] py-[2px] text-sub-title">
                  +{selectedNum}
                </Tag>
              )
            )}

            {suffixIcon ? (
              <span>suffixIcon</span>
            ) : showOptions ? (
              <span>
                <IcToggleArrowDown fill={'black'} />
              </span>
            ) : (
              <span>
                <IcToggleArrowUp fill={!disabled ? 'black' : '#d9d9d9'} />
              </span>
            )}
          </Flex>
        </Flex>
        <Flex>{selectExtra}</Flex>
        <BodyPortal>
          <ul
            ref={popperUl}
            {...attributes.popper}
            style={{
              ...styles.popper,
              ...style,
              visibility: showOptions ? 'visible' : 'hidden',
              margin:
                placement === 'bottom'
                  ? '8px 0 0px'
                  : placement === 'left'
                    ? '0 8px 0 0'
                    : placement === 'right'
                      ? '0 0 0 8px'
                      : '0 0 8px',
              padding: ' 8px 0 12px',
              maxHeight: `${listMaxHeight}px`,
              width: `${listWidth ? listWidth + 'px' : ulWidth}`,
            }}
            className={classNames(multiSelectUl, multiSelectClasses.multiSelectUl.border)}
          >
            {filterOption && (
              <Flex justify="center" className="px-[12px] py-[4px]">
                <Input
                  className="w-full"
                  customPrefix={<IcSearch />}
                  onChange={inputOnChange}
                  useFocus
                  value={searchValue}
                  // onBlur={() => setShowOptions(false)}
                  ref={(current) => {
                    if (ref) {
                      if (typeof ref === 'function') {
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
              list.map((x) => {
                return !x.disabled ? (
                  <li
                    role="option"
                    title={x.label.trim()}
                    key={x.value.trim()}
                    className={classNames(
                      fontClassName,
                      multiSelectClasses.multiSelectUl.font.root,
                      {
                        [multiSelectClasses.multiSelectUl.hover]:
                          x.label.trim() === hoverText,
                        [multiSelectClasses.multiSelectUl.selected]: selectedValue.some(
                          (val) => x.value.trim() === val.value.trim(),
                        ),
                        [multiSelectClasses.multiSelectUl.hoverSelected]:
                          x.value === hoverText &&
                          selectedValue.some(
                            (val) => x.value.trim() === val.value.trim(),
                          ),
                      },
                      multiSelectClasses.multiSelectUl.overflow,
                    )}
                    onMouseDown={() => {
                      onChangeValue(x);
                    }}
                    onMouseEnter={(e) => {
                      setHoverText(x.value.trim());
                    }}
                    onMouseLeave={() => {
                      !showOptions && setHoverText('');
                    }}
                  >
                    {isCheckbox && (
                      <Checkbox
                        onMouseDown={() => onChangeValue(x)}
                        checked={selectedValue.some(
                          (val) => val.value.trim() === x.value.trim(),
                        )}
                      />
                    )}
                    {x.label.trim()}
                  </li>
                ) : (
                  <li
                    key={x.value.trim()}
                    role="option"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    className={classNames(
                      multiSelectClasses.multiSelectUl.font.root,
                      multiSelectClasses.multiSelectUl.overflow,
                      // multiSelectClasses.multiSelectUl.disabled,
                    )}
                  >
                    {isCheckbox && (
                      <Checkbox
                        // onClick={() => onChangeValue(x)}
                        checked={list.some(
                          (val) =>
                            val.value.trim() === x.value.trim() &&
                            val.checked &&
                            val.disabled,
                        )}
                        disabled
                      />
                    )}
                    {x.label}
                  </li>
                );
              })
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
        <Flex align="center">
          <Flex gap={4}>
            {selectedValue.some(
              (x) => x.label === (allOptionsLabel ?? '전체') && x.value === '',
            ) ? (
              <Tag
                className={classNames(
                  'px-[12px] py-[6px]',
                  tagClassName,
                  'text-body-text',
                )}
                style={{ ...tagStyle, margin: '4px 0' }}
                color={tagBgColor}
                bordered={false}
                key="all"
                closeIcon={disabled ? false : true}
                onClose={() =>
                  onChangeValue({ label: allOptionsLabel ?? '전체', value: '' })
                }
              >
                {(allOptionsLabel ?? '전체').trim()}
              </Tag>
            ) : (
              selectedValue.map((x) => (
                <Tag
                  className={classNames(
                    'px-[12px] py-[6px]',
                    tagClassName,
                    'text-body-text',
                  )}
                  style={{ ...tagStyle, margin: '4px 0' }}
                  color={tagBgColor}
                  bordered={false}
                  key={x.value}
                  closeIcon={disabled ? false : !x.disabled && !x.checked}
                  onClose={() => onChangeValue(x)}
                >
                  {x.label.trim()}
                </Tag>
              ))
            )}
          </Flex>
          <Flex>{tagExtra}</Flex>
        </Flex>
      )}
    </Flex>
  );
}

export const MultiSelect = React.forwardRef(MultiSelectFunc) as <T extends object>(
  props: INewMultipleSelectProp<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => ReactElement;
