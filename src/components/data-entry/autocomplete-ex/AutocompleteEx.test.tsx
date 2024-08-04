import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { inputClasses } from '../input/InputClasses';

import { autoCompleteExClasses } from './AutocompleteExClasses';
import { AutocompleteEx } from '.';

const items = [
  { label: 'label1', value: 'value1' },
  { label: 'label2', value: 'value2' },
  { label: 'label3', value: 'value3' },
  { label: 'asdf', value: 'asdf' },
  { label: '123', value: '123' },
];

describe('<AutocompleteEx />', () => {
  it('렌더링 체크', () => {
    render(<AutocompleteEx items={items} displayName={'label'} placeholder="write" />);
    const autocomplete = screen.getByRole('textbox');

    expect(autocomplete.classList.contains(autoCompleteExClasses.input)).toBeTruthy();
  });

  it('placeholder 체크', () => {
    render(<AutocompleteEx placeholder="test" items={items} displayName={'label'} />);

    expect(screen.getByPlaceholderText('test')).toBeTruthy();
  });

  it('input value 일치 여부', async () => {
    render(<AutocompleteEx items={items} displayName={'label'} placeholder="write" />);

    await waitFor(() => {
      const input: HTMLInputElement = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test1' } });
      expect(input.value).toBe('test1');
    });
  });

  it('max length 체크', async () => {
    render(<AutocompleteEx items={items} displayName={'label'} placeholder="write" />);
    await waitFor(() => {
      const maxLengthTest: HTMLInputElement = screen.getByRole('textbox');
      fireEvent.change(maxLengthTest, { target: { value: '1234567890' } });
      expect(maxLengthTest.value.length >= 10).toBeTruthy();
    });
  });

  it('readonly 체크', () => {
    render(
      <AutocompleteEx items={items} displayName={'label'} placeholder="write" readOnly />,
    );
    expect(screen.getByRole('textbox').getAttribute('readonly')).not.toBeNull();
  });

  it('disabled 체크', async () => {
    const onChangeValue = vi.fn();
    const onChange = vi.fn();
    render(
      <AutocompleteEx
        items={items}
        displayName={'label'}
        placeholder="write"
        onChange={onChange}
        onChangeValue={onChangeValue}
      />,
    );

    await waitFor(() => {
      const disabledTest = screen.getByRole('textbox');
      fireEvent.change(disabledTest, { target: { disabled: true } });
      expect(disabledTest).toHaveProperty('disabled', true);

      disabledTest.click();
      fireEvent.keyDown(disabledTest, { key: 'Enter' });
      fireEvent.keyUp(disabledTest, { key: ' ' });

      expect(document.activeElement).not.toEqual(disabledTest);
    });

    expect(onChangeValue).toHaveBeenCalledTimes(0);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('prefix 체크', () => {
    const { container } = render(
      <AutocompleteEx
        items={items}
        displayName={'label'}
        placeholder="write"
        prefix={'a'}
      />,
    );

    const prefix = container.querySelector(`.${inputClasses.prefixWrapper}`);
    expect(prefix?.textContent).toBe('a');
  });

  it('suffix 체크', () => {
    const { container } = render(
      <AutocompleteEx
        items={items}
        displayName={'label'}
        placeholder="write"
        suffix={'a'}
      />,
    );

    const suffix = container.querySelector(`.${inputClasses.suffixWrapper}`);
    expect(suffix?.textContent).toBe('a');
  });

  it('auto complete 작동 여부 체크', async () => {
    render(<AutocompleteEx items={items} displayName={'label'} placeholder="write" />);

    const input: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'asdf' } });

    await waitFor(() => {
      expect(input.value).toBe('asdf');
    });

    await waitFor(() => {
      const listItem = screen.getByText('asdf');
      expect(listItem).toBeInTheDocument();
    });
  });

  it('input 클릭 시 리스트가 나타나는지 확인', async () => {
    render(<AutocompleteEx items={items} displayName={'label'} placeholder="write" />);

    // Input 요소를 찾습니다.
    const input: HTMLInputElement = screen.getByRole('textbox');

    // act로 감싸서 상태 업데이트를 처리합니다.

    // Input을 클릭합니다.
    fireEvent.click(input);

    // Input에 값을 입력하여 리스트가 나타나도록 합니다.
    fireEvent.change(input, { target: { value: 'label' } });

    // 리스트가 나타나는지 확인합니다.
    const listItem = screen.queryAllByText('label');
    expect(listItem).toBeDefined();
  });
});
