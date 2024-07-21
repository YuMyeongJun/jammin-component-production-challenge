import React from 'react';
import { CheckboxEx } from '@components';
import { fireEvent,render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';

describe('<CheckboxEx />', () => {
  it('렌더링 체크', () => {
    const { getByLabelText } = render(<CheckboxEx label="테스트 체크박스" />);
    expect(getByLabelText('테스트 체크박스')).toBeInTheDocument();
  });

  it('체크 상태 변경 시 onChange 호출', () => {
    const handleChange = vi.fn();
    const { getByLabelText } = render(
      <CheckboxEx label="테스트 체크박스" onChange={handleChange} />,
    );

    const checkbox = getByLabelText('테스트 체크박스');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('체크박스가 checked 상태가 되는지 확인', () => {
    const { getByLabelText } = render(<CheckboxEx label="테스트 체크박스" />);
    const checkbox = getByLabelText('테스트 체크박스') as HTMLInputElement;

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it('체크박스가 disabled 상태가 되는지 확인', () => {
    const { getByLabelText } = render(<CheckboxEx label="테스트 체크박스" disabled />);
    const checkbox = getByLabelText('테스트 체크박스') as HTMLInputElement;

    expect(checkbox.disabled).toBe(true);
  });
});
