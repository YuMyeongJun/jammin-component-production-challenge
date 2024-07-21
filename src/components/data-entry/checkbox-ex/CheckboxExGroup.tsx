import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { CheckboxEx, checkboxExClasses, ICheckboxExGroupProps, Flex } from '@components';
import classNames from 'classnames';

export const CheckboxExGroup = forwardRef<HTMLDivElement, ICheckboxExGroupProps>(
  (
    {
      options = [],
      value = [],
      onChange,
      name,
      disabled = false,
      color,
      isVertical = false,
      gap = 8,
      useIndeterminate = false,
      indeterminateLabel = '전체',
      indent,
      labelGap,
      allOptionsClassName,
      allOptionsInputClassName,
      allOptionsLabelClassName,
      childrenClassName,
      childClassName,
      childInputClassName,
      childLabelClassName,
    },
    ref,
  ) => {
    const [isIndeterminate, setIsIndeterminate] = useState(false);

    const allValues = useMemo(
      () =>
        (options || []).map((option, index) =>
          typeof option === 'object' && 'value' in option ? option.value : String(index),
        ),
      [options],
    );

    // disabled가 아닌 옵션 체크
    const enabledOptions = useCallback(() => {
      return options.filter(
        (option) =>
          !(typeof option === 'object' && 'disabled' in option && option.disabled),
      );
    }, [options]);

    // enabledOptions의 value들
    const enabledValues = useCallback(() => {
      return enabledOptions().map((option) =>
        typeof option === 'object' && 'value' in option
          ? option.value
          : String(options.indexOf(option)),
      );
    }, [enabledOptions, options]);

    // 전체 체크되었는지 확인
    const isAllChecked = useMemo(() => {
      return enabledValues().every((v) => value.includes(v));
    }, [enabledValues, value]);

    // indeterminate 관련 작동 함수
    const handleIndeterminateChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isAllChecked || e.target.checked) {
          // default checked되는 항목이 있고 그 항목이 disabled여서 바꿀수 없는 경우 혹은 체크가 되어있는 경우 포함
          const newValues = allValues.filter((_, index) => {
            const option = options[index];

            return !(
              typeof option === 'object' &&
              (('disabled' in option && option.disabled) ||
                ('checked' in option && option.checked))
            );
          });
          onChange?.([...value, ...newValues]);
        } else {
          // 비활성화되지 않고 체크된 옵션의 값만 제거
          const newValues = value.filter((v) => {
            const option = options.find(
              (opt) => typeof opt === 'object' && 'value' in opt && opt.value === v,
            );

            return typeof option === 'object' && 'disabled' in option && option.disabled;
          });
          onChange?.(newValues);
        }
      },
      [allValues, onChange, options, value],
    );

    const handleChange = useCallback(
      (checked: boolean, optionValue: string | number | boolean) => {
        const newValue = checked
          ? [...value, optionValue]
          : value.filter((v) => v !== optionValue);
        onChange?.(newValue);
        console.log('현재 선택된 값들:', newValue);
      },
      [value, onChange],
    );

    // 일부만 체크 되어있는지 확인하기 위한 useEffect
    useEffect(() => {
      const isSomeChecked =
        (enabledValues().some((v) => value.includes(v)) && !isAllChecked) ||
        (options.filter(
          (option) => typeof option === 'object' && 'checked' in option && option.checked,
        ).length > 0 &&
          !isAllChecked);

      setIsIndeterminate(isSomeChecked);
    }, [value, options]);

    // 체크박스 중 기본적으로 체크가 되어있어야 하는 경우를 위한 useEffect
    useEffect(() => {
      const checkedValues = options
        .filter(
          (option) => typeof option === 'object' && 'checked' in option && option.checked,
        )
        .map((option) =>
          typeof option === 'object' && 'value' in option ? option.value : '',
        );

      const newValue = [...new Set([...value, ...checkedValues])];
      if (newValue.length !== value.length) {
        onChange?.(newValue);
      }
    }, [options, value, onChange]);

    // 초기 렌더링 시 defaultChecked가 true인 항목을 value에 추가
    useEffect(() => {
      const initialCheckedValues = options
        .filter(
          (option) =>
            typeof option === 'object' &&
            'defaultChecked' in option &&
            option.defaultChecked,
        )
        .map((option) =>
          typeof option === 'object' && 'value' in option ? option.value : '',
        );

      const newValue = [...new Set([...value, ...initialCheckedValues])];
      if (newValue.length !== value.length) {
        onChange?.(newValue);
      }
      // 빈 배열을 의존성으로 사용하여 초기 렌더링 시에만 실행
    }, []);

    // 전체선택 하위의 자식 체크박스
    const checkboxes = useMemo(
      () =>
        (options || [])?.map((option, index) => {
          const isObject = typeof option === 'object';
          const optionValue =
            isObject && 'value' in option ? option.value : String(index);
          const optionLabel =
            isObject && 'label' in option ? option.label : String(option);
          const optionDisabled =
            isObject && 'disabled' in option ? option.disabled : false;
          const optionChecked =
            isObject && 'checked' in option
              ? option.checked
              : value.includes(optionValue);

          return (
            <CheckboxEx
              key={index}
              label={optionLabel}
              labelGap={labelGap}
              checked={optionChecked}
              onChange={(e) => handleChange(e.target.checked, optionValue)}
              disabled={disabled || optionDisabled}
              color={color}
              className={classNames(checkboxExClasses.group.child, childClassName)}
              // 자식 체크박스를 컨트롤 하기 위한 클래스
              inputClassName={classNames(
                checkboxExClasses.group.childInput,
                childInputClassName,
              )}
              // 자식 체크박스의 label을 컨트롤 하기 위한 클래스
              labelClassName={classNames(
                checkboxExClasses.group.childLabel,
                childLabelClassName,
              )}
            />
          );
        }),
      [options, value, handleChange, disabled, color],
    );

    return (
      <Flex gap={gap} vertical={isVertical}>
        {/* 전체선택에서 indeterminate를 사용할 경우 */}
        {useIndeterminate && (
          <CheckboxEx
            name={name}
            label={indeterminateLabel}
            labelGap={labelGap}
            indeterminate={isIndeterminate}
            checked={isIndeterminate || value.length > 0}
            disabled={disabled}
            onChange={handleIndeterminateChange}
            className={classNames(
              checkboxExClasses.group.allOptions,
              allOptionsClassName,
            )}
            inputClassName={classNames(
              checkboxExClasses.group.allOptionsInput,
              allOptionsInputClassName,
            )}
            labelClassName={classNames(
              checkboxExClasses.group.allOptionsLabel,
              allOptionsLabelClassName,
            )}
          />
        )}
        <Flex
          gap={gap}
          vertical={isVertical}
          ref={ref}
          style={indent ? { paddingLeft: `${indent}px` } : undefined}
          className={classNames(checkboxExClasses.group.children, childrenClassName)}
        >
          {checkboxes}
        </Flex>
      </Flex>
    );
  },
);
