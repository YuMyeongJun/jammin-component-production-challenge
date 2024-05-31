import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import IcToggleArrowDown from '@assets/icons/ic_select_toggle_arrow_down.svg?react';
import IcToggleArrowUp from '@assets/icons/ic_select_toggle_arrow_up.svg?react';
import { BodyPortal, Input } from '@components';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { AnyObject } from '@models/types/AnyObject';
import { remUtil } from '@modules/utils/rem';
import classNames from 'classnames';

import { ISelectProp } from './Select.types';
import { selectClasses } from './SelectClasses';

function SelectFunc<T extends AnyObject>(
  props: ISelectProp<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    isSearchType,
    title,
    onChange,
    fullWidth,
    value,
    bordered,
    defaultValue,
    disabled,
    placeholder,
    placement = 'bottom',
    open,
    offset = [0, 0],
    // status,
    suffixIcon,
    options,
    displayLabel,
    valuePath,
    items,
    selectWidth = 150,
    listWidth,
    listMaxHeight = 300,
    controlSize = 'md',
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

  const tempWidth =
    typeof selectWidth !== 'number' ? remUtil.findNumber(selectWidth) : selectWidth;
  const width = fullWidth ? '100%' : `${tempWidth}px`;
  const tempListWidth =
    listWidth && typeof listWidth !== 'number'
      ? remUtil.findNumber(listWidth)
      : listWidth;

  // const [init, setInit] = useState(false);
  const [list, setList] = useState<
    Array<{ label: string; value: string; disabled?: boolean }>
  >([]);
  const [tmpList, setTmpList] = useState<
    Array<{ label: string; value: string; disabled?: boolean }>
  >([]);
  const [currentValue, setCurrentValue] = useState<string>('');
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [hoverText, setHoverText] = useState('');
  const [hoverIdx, setHoverIdx] = useState(0);
  const [indexNum, setIndexNum] = useState<number>(0);
  const [ulWidth, setUlWidth] = useState<string>('0px');
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const popperElement = useRef<HTMLUListElement>(null);
  const referenceElement = useRef<HTMLDivElement>(null);
  const { styles, attributes, update } = usePopper(
    referenceElement.current,
    popperElement.current,
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

  const popperUpdate = () => {
    void update?.();
  };

  const onChangeCurrentValue = (e: React.MouseEvent<HTMLElement>, idx: number) => {
    e.stopPropagation();
    e.preventDefault();

    const text = e.target as HTMLElement;
    setCurrentValue(text.innerText);
    setSelectedValue(list[idx].value);
    setList(tmpList);
    setShowOptions((pre) => !pre);
    findUserValue(text.innerText.trim());
    inputRef.current?.focus();
    popperUpdate();
  };

  const findUserValue = (val: string) => {
    const findText = title && val.includes('전체') ? '전체' : val;
    const findValue = list?.filter((x) => x.label.trim() === findText) ?? [];

    if (findValue.length > 1) {
      onChange?.(list[hoverIdx]?.value ?? null);
    } else if (findValue.length === 1) {
      onChange?.(findValue[0].value ?? null);
    } else {
      onChange?.(null);
    }
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
    setShowOptions(true);
    setIsSearch(true);
  };

  const findRes = () => {
    return tmpList?.find(
      (x) =>
        x.label.toLowerCase().includes(currentValue) &&
        x.value === hoverText &&
        !x.disabled,
    );
  };

  const findResByHoverText = () => {
    return tmpList?.find((x) => x.value === hoverText && !x.disabled);
  };

  const handleKeyArrow = (e: React.KeyboardEvent) => {
    const tmpStartIdx = list.findIndex((x) => !x.disabled);
    switch (e.code) {
      case 'ArrowDown': {
        e.preventDefault();
        if (!showOptions) {
          setShowOptions((pre) => !pre);
          setList(tmpList);
          break;
        }
        let newIndex = indexNum + 1;

        if (
          popperElement.current &&
          popperElement.current.childElementCount <= newIndex
        ) {
          newIndex = tmpStartIdx;
        }

        list.forEach((x, index) => {
          if (index === newIndex && x.disabled) {
            newIndex += 1;
          }
          if (newIndex >= list.length) newIndex = tmpStartIdx;
        });

        setHoverText(list ? list[newIndex].value : '');
        setIndexNum(newIndex);
        setHoverIdx(newIndex);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        if (!showOptions) {
          setShowOptions((pre) => !pre);
          setList(tmpList);
          break;
        }

        let newIndex = indexNum - 1;

        list.forEach((x, idx) => {
          if (newIndex >= 0 && newIndex === idx && x.disabled) {
            newIndex -= 1;
          }
        });

        if (newIndex < 0) {
          newIndex = list ? list.length - 1 : tmpStartIdx;
          list.forEach((x, idx) => {
            if (newIndex >= 0 && newIndex === idx && x.disabled) {
              newIndex -= 1;
            }
          });
        }
        setIndexNum(newIndex);
        setHoverIdx(newIndex);

        setHoverText(list ? list[newIndex].value : '');
        break;
      }
      case 'Escape':
        e.preventDefault();
        setHoverText('');
        setIndexNum(0);

        if (currentValue === '' || !showOptions) {
          setShowOptions(false);
        } else {
          setShowOptions(true);
        }

        break;
      case 'Enter':
        e.preventDefault();

        if (!disabled) setShowOptions((pre) => !pre);

        if (!showOptions) {
          setList(tmpList);
          findUserValue(currentValue);
        } else {
          if (list?.length === 1 && list[0].disabled) {
            setShowOptions(false);
            setCurrentValue('');
          } else {
            let res = findRes();
            if (isSearch) {
              if (!res) {
                res = findResByHoverText();
              }
            } else {
              res = findResByHoverText();
            }
            if (res) {
              setSelectedValue(res.value);
              setHoverIdx(tmpList.findIndex((x) => x.value === res!.value));
              setCurrentValue(res.label);
              findUserValue(res.label);
            } else {
              setShowOptions(false);
              setCurrentValue('');
            }
          }
        }
        break;
      case 'Backspace':
        setShowOptions(true);
        break;
      case 'Tab':
        setShowOptions(false);
        break;
    }
    popperUpdate();
  };

  const iconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!disabled) {
      // if (!showOptions) {
      setShowOptions(!showOptions);
      setList(tmpList);
      // } else {
      //   setShowOptions(false);
      //   popperUpdate();
      // }
    }
    popperUpdate();
  };

  const resetList = () => {
    setList([]);
  };

  useOutsideClick(
    selectRef,
    () => {
      inputRef.current?.blur();
      setShowOptions(false);
      popperUpdate();
    },
    'mousedown',
  );

  // useEffect(() => {
  //   // if (showOptions) {
  //   popperUpdate();
  //   // }
  // }, [showOptions]);

  useEffect(() => {
    if (inputRef) {
      const text = inputRef.current?.value.toLowerCase() ?? '';
      const searchList =
        tmpList?.filter((item) => item.label.toLowerCase().includes(text)) ?? [];
      setList(searchList);

      if (currentValue !== '' && searchList?.length > 0) {
        const tmpStartIdx =
          selectedValue === ''
            ? searchList?.findIndex((x) => !x.disabled)
            : searchList?.findIndex((x) => x.value === selectedValue && !x.disabled);
        setHoverIdx(tmpStartIdx === -1 ? 0 : tmpStartIdx);
        setHoverText(
          tmpStartIdx === -1 ? searchList[0].value : searchList[tmpStartIdx].value,
        );
      } else {
        setHoverIdx(0);
        setHoverText('');
      }
    }
  }, [currentValue]);

  useEffect(() => {
    if (options && options.length > 0) {
      setList(options ?? []);
      setTmpList(options ?? []);

      if (defaultValue) {
        const findValue = options?.filter((x) => x.value === defaultValue)[0];
        setCurrentValue(
          findValue
            ? title && findValue.label === '전체'
              ? `${title} ${findValue.label}`
              : findValue.label
            : '',
        );
        setSelectedValue(findValue ? defaultValue : '');
      }
      if (value) {
        const findValue = options?.filter((x) => x.value === value)[0];
        setSelectedValue(findValue ? value : '');
        setCurrentValue(
          findValue
            ? title && findValue.label === '전체'
              ? `${title} ${findValue.label}`
              : findValue.label
            : '',
        );
      }
      const tmpStartIdx = options.findIndex((x) => !x.disabled) ?? 0;
      setHoverIdx(tmpStartIdx);
      setHoverText(options.length > 0 ? options[tmpStartIdx].value : '');
    } else if (items && items.length > 0) {
      const key = displayLabel ?? 'label';
      const valueKey = valuePath ?? 'value';
      const temp = items?.map((x) => ({
        label: x[key],
        value: x[valueKey],
        disabled: x['disabled'],
      })) as Array<{ label: string; value: string; disabled?: boolean }>;
      setList(temp ?? []);
      setTmpList(temp ?? []);
      if (defaultValue) {
        const findValue = temp?.filter((x) => x.value === defaultValue)[0];
        setCurrentValue(
          findValue
            ? title && findValue.label === '전체'
              ? `${title} ${findValue.label}`
              : findValue.label
            : '',
        );
      }
      if (value) {
        const findValue = temp?.filter((x) => x.value === value)[0];
        setCurrentValue(
          findValue
            ? title && findValue.label === '전체'
              ? `${title} ${findValue.label}`
              : findValue.label
            : '',
        );
      }
      const tmpStartIdx = temp?.findIndex((x) => !x.disabled) ?? 0;
      setHoverIdx(tmpStartIdx);
      setHoverText(temp?.length ? temp[tmpStartIdx].value : '');
    } else {
      resetList();
    }
  }, [options, items]);

  useEffect(() => {
    if (tmpList.length > 0) {
      const findValue = tmpList.find((x) => x.value === value);

      if (findValue) {
        setCurrentValue(
          title && findValue.label === '전체'
            ? `${title} ${findValue.label}`
            : findValue.label,
        );
        setHoverText(findValue.value);
        setSelectedValue(findValue.value);
      } else {
        setCurrentValue('');
        setHoverText(tmpList[0].value);
        setSelectedValue('');
      }
    } else {
      setCurrentValue('');
      setHoverText('');
      setSelectedValue('');
    }

    popperUpdate();
  }, [value, tmpList]);

  // useEffect(() => {
  //   if (value && tmpList && tmpList.length > 0) {
  //     const findValue = tmpList.find((x) => x.value === value);
  //     if (findValue) {
  //       setCurrentValue(
  //         title && findValue.label === '전체'
  //           ? `${title} ${findValue.label}`
  //           : findValue.label,
  //       );
  //       setHoverText(findValue.value);
  //       setSelectedValue(findValue.value);
  //     } else {
  //       setCurrentValue('');
  //       setHoverText(tmpList[0].value);
  //       setSelectedValue('');
  //     }
  //   }

  //   popperUpdate();
  // }, [value, tmpList]);

  useEffect(() => {
    if (referenceElement.current) {
      const currentWidth = `${referenceElement.current.offsetWidth}px`;
      setUlWidth(currentWidth);
    }
  }, []);

  // useEffect(() => {
  //   setInit(true);
  // }, []);

  const rootClassName = classNames(selectClasses.root, {
    [selectClasses.placeholder]: placeholder && currentValue === '',
    'w-full': fullWidth,
  });

  const sizeClassName = classNames({
    [selectClasses.normal.sm]: controlSize === 'sm',
    [selectClasses.normal.md]: controlSize === 'md',
    [selectClasses.normal.lg]: controlSize === 'lg',
  });

  const borderClassName = classNames(
    selectClasses.referenceElement,
    bordered === false
      ? selectClasses.bordered.borderedNone
      : selectClasses.bordered.root,
  );

  const disabledLiClassName = classNames(
    selectClasses.list.overflow,
    selectClasses.disabled,
    selectClasses.list.disabled,
  );

  const listClassNames = classNames({
    [selectClasses.list.font.sm]: controlSize === 'sm',
    [selectClasses.list.font.md]: controlSize === 'md',
    [selectClasses.list.font.lg]: controlSize === 'lg',
  });

  return (
    <div className={classNames(rootClassName, sizeClassName, 'relative')} ref={selectRef}>
      <div
        ref={referenceElement}
        style={{
          ...style,
          width,
        }}
        className={classNames(className, borderClassName, sizeClassName)}
        onClick={iconClick}
      >
        <Input
          useEllipsis={useEllipsis}
          {...inputProps}
          customPrefix={preSuffixIcon}
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
          controlSize={controlSize}
          autoComplete="off"
          onClick={iconClick}
          placeholder={
            placeholder === '선택' && title ? `${title} ${placeholder}` : placeholder
          }
          type="text"
          onChange={inputOnChange}
          onKeyDown={handleKeyArrow}
          disabled={disabled}
          readOnly={!filterOption || disabled}
          className={classNames(
            { [selectClasses.disabled]: disabled },
            { 'pr-[4px]': isSearchType },
            'w-full',
            showOptions && !filterOption && open === undefined
              ? 'text-slate-400'
              : 'text-black',
            listClassNames,
            sizeClassName,
          )}
          inputClassNames={classNames({
            'h-[inherit] rounded-[var(--bc-rounded)]': isSearchType,
          })}
          value={currentValue}
          isError={isError}
          useBorder={useBorder}
          useFocus={useFocus}
          onBlur={(e) => {
            setShowOptions(false);

            if (e.target.value !== '') {
              const selectedItem = tmpList?.find((x) => x.value === selectedValue);
              const res =
                selectedItem?.label === '전체' && title
                  ? `${title} ${selectedItem?.label}`
                  : selectedItem?.label;
              setCurrentValue(res ?? '');
            }
          }}
          suffix={
            suffixIcon ? (
              <div
                className={classNames(
                  disabled ? selectClasses.icon.disabled : selectClasses.icon.root,
                )}
              >
                {suffixIcon}
              </div>
            ) : (
              <div
                className={classNames(disabled ? selectClasses.icon.disabled : 'auto')}
              >
                {showOptions ? (
                  <IcToggleArrowDown fill={'black'} />
                ) : (
                  <IcToggleArrowUp fill={!disabled ? 'black' : '#d9d9d9'} />
                )}
              </div>
            )
          }
        />
      </div>

      <BodyPortal>
        <ul
          ref={popperElement}
          {...attributes.popper}
          style={{
            ...styles.popper,
            ...style,
            width: listWidth ? tempListWidth : ulWidth,
            visibility: showOptions ? 'visible' : 'hidden',
            // visibility:
            //   open === undefined
            //     ? showOptions && init
            //       ? 'visible'
            //       : 'hidden'
            //     : open && init
            //       ? 'visible'
            //       : 'hidden',
            maxHeight: `${listMaxHeight}px`,
            overflowY: 'scroll',
          }}
          className={classNames(selectClasses.list.root, listClassName)}
        >
          {list && list.length > 0 ? (
            list.map((x, idx) => {
              return !x.disabled ? (
                <li
                  role="option"
                  key={x.value}
                  onMouseDown={(e) => onChangeCurrentValue(e, idx)}
                  onMouseEnter={(e) => {
                    setHoverText(list[idx].value);
                    setIndexNum(idx);
                    setHoverIdx(tmpList.findIndex((x) => x.value === list[idx].value));
                  }}
                  title={x.label.trim()}
                  onMouseLeave={() => {
                    !showOptions && setHoverText('');
                    setIndexNum(idx);
                  }}
                  className={classNames(
                    {
                      [selectClasses.list.item]: x.value === selectedValue,
                    },
                    { [selectClasses.list.hover]: x.value === hoverText },
                    selectClasses.list.overflow,
                    listClassNames,
                  )}
                >
                  {x.label.trim() === '전체' && title && `${title} `}
                  {x.label.trim()}
                </li>
              ) : (
                <li
                  key={x.value}
                  role="option"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className={classNames(disabledLiClassName, listClassNames)}
                >
                  {x.label.trim() === '전체' && `${title} `}
                  {x.label}
                </li>
              );
            })
          ) : (
            <li
              role="option"
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className={classNames(listClassNames, 'p-2')}
              style={{ cursor: 'not-allowed' }}
            >
              No data
            </li>
          )}
        </ul>
      </BodyPortal>
    </div>
  );
}
export const Select = React.forwardRef(SelectFunc) as <T extends object>(
  props: ISelectProp<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => ReactElement;
