/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { KeyboardEvent, useDeferredValue, useEffect, useRef, useState } from 'react';
import { BodyPortal } from '@components';
import { Input } from '@components/data-entry/input/Input';
import { useCustomPopper } from '@hooks/useCustomPopper';
import { inputUtil } from '@modules/utils/input';
import classNames from 'classnames';

import { IAutocompleteExProps } from './AutocompleteEx.types';
import { autoCompleteExClasses } from './AutocompleteExClasses';

export const AutocompleteEx = <T extends object>(args: IAutocompleteExProps<T>) => {
  const [search, setSearch] = useState<string>('');
  const referenceElement = useRef<HTMLInputElement | null>(null);
  const inputElement = useRef<HTMLInputElement | null>(null);
  const focusedElement = useRef<HTMLDivElement>(null);
  const [focusedItem, setFocusedItem] = useState<T>();

  const {
    items,
    displayName,
    isError,
    className,
    controlSize = 'md',
    offset = [0, 3],
  } = args;

  const {
    isVisible,
    setIsVisible,
    handleReferenceElement,
    onChangeOffset,
    popperUpdate,
    popperAttributes,
    popperStyles,
    popperProps,
  } = useCustomPopper({ initPlacement: 'bottom', initOffset: [0, 3] });

  useEffect(() => {
    onChangeOffset(offset);
  }, [offset]);

  const rootClassName = classNames(autoCompleteExClasses.root, {}, className);

  useEffect(() => {
    if (focusedElement.current) {
      focusedElement.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [focusedItem]);

  useEffect(() => {
    if (args.defaultValue) {
      if (displayName) {
        const stringfiedDisplayName = String(args.defaultValue[displayName]);
        setSearch(stringfiedDisplayName);
      } else {
        const stringfiedVal = String(args.defaultValue);
        setSearch(stringfiedVal);
      }
    } else {
      setSearch('');
    }
  }, [args.defaultValue]);

  const handleShowPopper = () => {
    handleReferenceElement(referenceElement);
    popperUpdate();
    setIsVisible(true);
  };

  const handleHidePopper = () => {
    setFocusedItem(undefined);
    setIsVisible(false);
  };

  const handleSearchChange = (value: string) => {
    handleShowPopper();
    setFocusedItem(undefined);
    setSearch(value);
    args.onChangeValue?.(
      items?.find((x) => (displayName ? x[displayName] : String(x)) === value) ||
        args.create?.(value),
    );
  };

  const deferredItems = useDeferredValue(items);
  const filteredList = deferredItems?.filter((x) => {
    if (!search) {
      return true;
    }
    const value = displayName ? String(x[displayName]) : String(x);
    return value.startsWith(search);
  });

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      if (!filteredList?.length) {
        return;
      }

      if (!isVisible) {
        handleShowPopper();
        return;
      }

      const index = focusedItem
        ? Math.min(filteredList.indexOf(focusedItem) + 1, filteredList.length - 1)
        : 0;
      setFocusedItem(filteredList[index]);
    } else if (e.key === 'ArrowUp') {
      if (!filteredList?.length) {
        return;
      }

      const index = focusedItem ? Math.max(filteredList.indexOf(focusedItem) - 1, 0) : 0;
      setFocusedItem(filteredList[index]);
    }
  };

  return (
    <div style={{ position: 'relative' }} className={rootClassName}>
      <div ref={referenceElement}>
        <Input
          className={classNames(autoCompleteExClasses.input, { invalid: isError })}
          onFocus={() => handleShowPopper()}
          onBlur={() => handleHidePopper()}
          onKeyDown={handleInputKeydown}
          customPrefix={args.prefix}
          suffix={args.suffix}
          readOnly={args.readOnly}
          disabled={args.isDisabled}
          placeholder={args.placeholder}
          ref={inputElement}
          controlSize={controlSize}
          onPressEnter={() => {
            if (isVisible) {
              if (focusedItem) {
                const value = displayName
                  ? String(focusedItem[displayName])
                  : String(focusedItem);
                handleSearchChange(value);
                inputUtil.TriggerInputOnChange(inputElement.current, value);
              }
              handleHidePopper();
            } else {
              handleShowPopper();
            }
          }}
          value={search}
          maxLength={args.maxLength}
          onChange={(e) => {
            args.onChange?.(e);
            handleSearchChange(e.target.value);
          }}
        />
      </div>

      {isVisible && (
        <BodyPortal>
          <div
            className={autoCompleteExClasses.container}
            {...popperProps}
            style={{
              ...popperStyles.popper,
              width: referenceElement.current?.clientWidth,
              overflowY: 'auto',
              display:
                isVisible && filteredList && filteredList.length > 0 ? 'block' : 'none',
            }}
            {...popperAttributes.popper}
          >
            {filteredList?.map((item: T, index: number) => {
              const display = displayName ? String(item[displayName]) : String(item);
              const focused = item === focusedItem;
              const itemClassName = classNames(autoCompleteExClasses.list.root, {
                [autoCompleteExClasses.list.focused]: focused,
                [autoCompleteExClasses.list.sm]: controlSize === 'sm',
                [autoCompleteExClasses.list.md]: controlSize === 'md',
                [autoCompleteExClasses.list.lg]: controlSize === 'lg',
              });

              return (
                <div
                  role="presentation"
                  key={index}
                  ref={focused ? focusedElement : undefined}
                  className={itemClassName}
                  style={{ width: '100%' }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    if (referenceElement.current) {
                      const value = displayName
                        ? String(item[displayName])
                        : String(item);
                      handleSearchChange(value);
                      inputUtil.TriggerInputOnChange(inputElement.current, value);
                    }
                  }}
                >
                  <span className={autoCompleteExClasses.list.itemName}>
                    {inputUtil.replaceKeywordMark(display, search, true)}
                  </span>
                </div>
              );
            })}
          </div>
        </BodyPortal>
      )}
    </div>
  );
};
