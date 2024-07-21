import { CheckboxExGroup } from '@components';
import { fireEvent,render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';

describe('<CheckboxExGroup />', () => {
  it('렌더링 체크', () => {
    const { getByLabelText } = render(
      <CheckboxExGroup options={[{ label: '옵션 A', value: 'a' }]} />,
    );
    expect(getByLabelText('옵션 A')).toBeInTheDocument();
  });

  it('체크 상태 변경 시 onChange 호출', () => {
    const handleChange = vi.fn();
    const { getByLabelText } = render(
      <CheckboxExGroup
        options={[{ label: '옵션 A', value: 'a' }]}
        onChange={handleChange}
      />,
    );

    const checkbox = getByLabelText('옵션 A') as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(['a']);

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBeFalsy();
  });

  it('전체 선택 기능 테스트', () => {
    const handleChange = vi.fn();
    const { getByLabelText } = render(
      <CheckboxExGroup
        options={[
          { label: '옵션 A', value: 'a' },
          { label: '옵션 B', value: 'b' },
        ]}
        useIndeterminate
        indeterminateLabel="전체 선택"
        onChange={handleChange}
      />,
    );

    const indeterminateCheckbox = getByLabelText('전체 선택') as HTMLInputElement;
    fireEvent.click(indeterminateCheckbox);
    expect(handleChange).toHaveBeenCalledWith(['a', 'b']);
    fireEvent.click(indeterminateCheckbox); // 전체 선택 해제
    expect(indeterminateCheckbox.checked).toBeFalsy();
  });

  // ... 기존 코드 ...

  describe('<CheckboxExGroup />', () => {
    // ... 기존 테스트 케이스 ...

    it('체크한 값이 숫자, 문자열, 불리언인지 확인', () => {
      const handleChange = vi.fn();
      const { getByLabelText } = render(
        <CheckboxExGroup
          options={[
            { label: '숫자 옵션', value: 1 },
            { label: '문자열 옵션', value: 'string' },
            { label: '불리언 옵션', value: true },
          ]}
          onChange={handleChange}
        />,
      );

      const numberCheckbox = getByLabelText('숫자 옵션') as HTMLInputElement;
      const stringCheckbox = getByLabelText('문자열 옵션') as HTMLInputElement;
      const booleanCheckbox = getByLabelText('불리언 옵션') as HTMLInputElement;

      fireEvent.click(numberCheckbox);
      expect(handleChange).toHaveBeenCalledWith([1]);

      fireEvent.click(stringCheckbox);
      expect(handleChange).toHaveBeenCalledWith(['string']);

      fireEvent.click(booleanCheckbox);
      expect(handleChange).toHaveBeenCalledWith([true]);
    });
  });

  it('disabled 상태에서 체크박스가 클릭되지 않음', () => {
    const handleChange = vi.fn();
    const { getByLabelText } = render(
      <CheckboxExGroup
        options={[
          { label: '옵션 A', value: 'a', disabled: true },
          { label: '옵션 b', value: 'b' },
        ]}
        onChange={handleChange}
        useIndeterminate
        indeterminateLabel="전체 선택"
      />,
    );

    const checkbox = getByLabelText('전체 선택') as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(['b']);
  });
});
