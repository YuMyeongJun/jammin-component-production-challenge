import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SwitchEx } from './SwitchEx';
import { switchExClasses } from './SwitchExClasses';

describe('<SwitchEx />', () => {
  it('렌더링 체크', () => {
    const { container } = render(<SwitchEx />);

    const switchTest = container.querySelector(`.${switchExClasses.root}`);
    expect(switchTest?.classList.contains(switchExClasses.wrapper)).toBeTruthy();
  });

  it('size에 따른 형태 변경 체크', () => {
    const { rerender, container } = render(<SwitchEx switchSize="sm" />);

    const childSm = container.querySelector(`.${switchExClasses.size.sm}`);
    expect(childSm?.classList.contains(switchExClasses.size.sm)).toBeTruthy();

    rerender(<SwitchEx switchSize="md" />);
    const childMd = container.querySelector(`.${switchExClasses.size.md}`);
    expect(childMd?.classList.contains(switchExClasses.size.md)).toBeTruthy();

    rerender(<SwitchEx switchSize="lg" />);
    const childLg = container.querySelector(`.${switchExClasses.size.lg}`);
    expect(childLg?.classList.contains(switchExClasses.size.lg)).toBeTruthy();

    rerender(<SwitchEx switchSize="xl" />);
    const childXl = container.querySelector(`.${switchExClasses.size.xl}`);
    expect(childXl?.classList.contains(switchExClasses.size.xl)).toBeTruthy();
  });

  it('color에 따른 형태 변경 체크', () => {
    const { rerender, container } = render(<SwitchEx color="primary" />);
    const priamry = container.querySelector(`.${switchExClasses.color.primary}`);
    expect(priamry?.classList.contains(switchExClasses.color.primary)).toBeTruthy();

    rerender(<SwitchEx color="secondary" />);
    const secondary = container.querySelector(`.${switchExClasses.color.secondary}`);
    expect(secondary?.classList.contains(switchExClasses.color.secondary)).toBeTruthy();

    rerender(<SwitchEx color="success" />);
    const success = container.querySelector(`.${switchExClasses.color.success}`);
    expect(success?.classList.contains(switchExClasses.color.success)).toBeTruthy();

    rerender(<SwitchEx color="error" />);
    const error = container.querySelector(`.${switchExClasses.color.error}`);
    expect(error?.classList.contains(switchExClasses.color.error)).toBeTruthy();

    rerender(<SwitchEx color="info" />);
    const info = container.querySelector(`.${switchExClasses.color.info}`);
    expect(info?.classList.contains(switchExClasses.color.info)).toBeTruthy();

    rerender(<SwitchEx color="warning" />);
    const warning = container.querySelector(`.${switchExClasses.color.warning}`);
    expect(warning?.classList.contains(switchExClasses.color.warning)).toBeTruthy();

    rerender(<SwitchEx color="gray" />);
    const gray = container.querySelector(`.${switchExClasses.color.gray}`);
    expect(gray?.classList.contains(switchExClasses.color.gray)).toBeTruthy();

    rerender(<SwitchEx color="dark" />);
    const dark = container.querySelector(`.${switchExClasses.color.dark}`);
    expect(dark?.classList.contains(switchExClasses.color.dark)).toBeTruthy();
  });
});

describe('스위치 클릭 이벤트', () => {
  it('스위치 클릭 시 이벤트 함수 실행', () => {
    const onClickMock = vi.fn();

    const { getByTestId } = render(
      <SwitchEx data-testid={'switch'} onClick={onClickMock} />,
    );

    const switchTest = getByTestId('switch');

    fireEvent.click(switchTest);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('스위치 클릭 아닐 시 이벤트 함수', () => {
    const onClickMock = vi.fn();

    const { getByTestId } = render(
      <SwitchEx data-testid={'switch'} onClick={onClickMock} />,
    );

    const switchTest = getByTestId('switch');

    expect(onClickMock).not.toHaveBeenCalled();
  });
});
