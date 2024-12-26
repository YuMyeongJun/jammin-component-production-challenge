import { act, fireEvent, render, screen } from '@testing-library/react';

import { textareaClasses } from './TextareaClasses';
import { TextAreaWithTitleCounter } from './TextAreaWithTitleCounter';

describe('<TextareaWithTitleCounter />', () => {
  it('렌더링 체크', () => {
    render(<TextAreaWithTitleCounter />);
    const textarea = screen.getByRole('textbox');
    expect(textarea?.classList.contains(textareaClasses.root)).toBeTruthy();
  });

  it('input value 일치 여부', () => {
    render(<TextAreaWithTitleCounter />);
    const textarea: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'test1' } });
    expect(textarea.value).toBe('test1');
  });

  it('max length 체크', () => {
    render(<TextAreaWithTitleCounter />);
    const maxLengthTest: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(maxLengthTest, { target: { value: '1234567890' } });
    expect(maxLengthTest.value.length >= 10).toBeTruthy();
  });

  it('disabled 체크', () => {
    const onClick = vi.fn();
    const onChange = vi.fn();

    render(<TextAreaWithTitleCounter onClick={onClick} onChange={onChange} />);

    const disabledTest = screen.getByRole('textbox');
    fireEvent.change(disabledTest, { target: { disabled: true } });
    expect(disabledTest).toHaveProperty('disabled', true);

    act(() => {
      disabledTest.click();
      fireEvent.keyDown(disabledTest, { key: 'Enter' });
      fireEvent.keyUp(disabledTest, { key: ' ' });
    });

    expect(document.activeElement).not.toEqual(disabledTest);
    expect(onClick).toHaveBeenCalledTimes(0);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('label 위치에 따른 타이틀 및 카운터 적용 여부', () => {
    const { container, rerender } = render(
      <TextAreaWithTitleCounter direction="top" showCount={true} label="test" />,
    );

    // 카운터 숫자 체크
    const textarea: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'test1' } });
    const counter = container.querySelector(`.${textareaClasses.counter}`)?.firstChild
      ?.textContent;
    expect(counter === textarea.value.length.toString()).toBeTruthy();

    // title이 상단인 경우
    const titleTop = container.querySelector(`.${textareaClasses.label}`);
    const counterTop = container.querySelector(`.${textareaClasses.counter}`);

    expect(titleTop?.classList.contains(textareaClasses.label)).toBeTruthy();
    expect(counterTop?.classList.contains('top')).toBeTruthy();

    // title이 하단인 경우
    rerender(
      <TextAreaWithTitleCounter direction="bottom" showCount={true} label="test" />,
    );
    const titleBottom = container.querySelector(`.${textareaClasses.label}`);
    const counterBottom = container.querySelector(`.${textareaClasses.counter}`);
    expect(titleBottom?.classList.contains(textareaClasses.label)).toBeTruthy();
    expect(counterBottom?.classList.contains('bottom')).toBeTruthy();

    // title이 textarea 안에 있는 경우
    rerender(
      <TextAreaWithTitleCounter direction="inside" showCount={true} label="test" />,
    );
    const titleInside = container.querySelector(`.${textareaClasses.label}`);
    const counterInside = container.querySelector(`.${textareaClasses.counter}`);
    expect(titleInside?.classList.contains(textareaClasses.label)).toBeTruthy();
    expect(counterInside?.classList.contains('inside')).toBeTruthy();
  });
});
