import icImgTest from "@icons/ic_img.svg";
import { fireEvent, render } from "@testing-library/react";

import { FloatingActionButton } from "./FloatingActionButton";
import { IFloatingActionMenuProps } from "./FloatingActionButton.types";
import { floatingActionButtonClasses } from "./FloatingActionButtonClasses";

const menu: IFloatingActionMenuProps[] = [
  {
    icon: icImgTest,
    callback: () => {
      return 1;
    },
    tooltip: "test1",
    badge: { count: 6 },
  },
  {
    icon: icImgTest,
    callback: () => {
      return 2;
    },
    tooltip: "test2",
    badge: { count: 10 },
  },
  {
    icon: icImgTest,
    callback: () => {
      return 3;
    },
    badge: { count: 2 },
  },
];

describe("<FloatingActionButton />", () => {
  it("렌더링 체크", () => {
    const { container } = render(
      <FloatingActionButton shape="circle" icon="" callback={() => {}} />,
    );
    const floatingBtn = container.querySelector(".wrapper");

    expect(
      floatingBtn?.classList.contains(floatingActionButtonClasses.wrapper),
    ).toBeTruthy();
    expect(floatingBtn).toBeDefined();
  });

  it("버튼 클릭 함수 호출 여부 체크", () => {
    const onClick = vi.fn();
    const { container } = render(
      <FloatingActionButton
        shape="circle"
        icon=""
        callback={onClick}
        onClick={onClick}
      />,
    );
    const floatingBtn = container.querySelector(
      `.${floatingActionButtonClasses.wrapper}`,
    ) as Element;

    fireEvent.click(floatingBtn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("shape 값 변형에 따른 버튼타입 변화 체크", () => {
    const onClick = vi.fn();
    const { container, rerender } = render(
      <FloatingActionButton shape="circle" icon="" callback={onClick} />,
    );
    const circleBtn = container.querySelector(
      `.${floatingActionButtonClasses.btn.root}`,
    );
    expect(
      circleBtn?.classList.contains(floatingActionButtonClasses.circle),
    ).toBeTruthy();

    rerender(
      <FloatingActionButton shape="square" icon="" callback={onClick} />,
    );
    const squareBtn = container.querySelector(
      `.${floatingActionButtonClasses.btn.root}`,
    );
    expect(
      squareBtn?.classList.contains(floatingActionButtonClasses.square),
    ).toBeTruthy();
  });

  it("메뉴 형식일 때 플로팅버튼 클릭 시 메뉴 기능 체크", () => {
    const onClick = vi.fn();
    const callbackTest1 = {
      textCallback: () => "1",
    };
    const callbackTest2 = {
      textCallback: () => "2",
    };
    const testMenu = [
      {
        icon: icImgTest,
        callback: callbackTest1.textCallback,
        badge: { count: 6 },
      },
      {
        icon: icImgTest,
        callback: callbackTest2.textCallback,
        badge: { count: 2 },
      },
    ];

    const { container } = render(
      <FloatingActionButton
        shape="circle"
        callback={onClick}
        onClick={onClick}
        icon={icImgTest}
        right={30}
        bottom={50}
        menu={testMenu}
        closeIcon={icImgTest}
        useBadge={true}
        trigger="click"
      />,
    );

    const floatingBtn = container.querySelector(
      `.${floatingActionButtonClasses.wrapper}`,
    ) as Element;
    const hiddenMenu = container.querySelector(
      `.${floatingActionButtonClasses.hiddenMenu}`,
    ) as HTMLDivElement;

    fireEvent.click(floatingBtn);
    fireEvent.change(hiddenMenu, { target: { className: "open" } });
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(hiddenMenu).toHaveProperty("className", "open");

    // 뱃지 사용 시 렌더링 및 값 일치 여부
    const badge = container.querySelector(".jammin-badge-area");
    expect(badge?.firstChild?.textContent).toBe("6");

    // 메뉴 중 하나 눌렀을 시 콜백 호출 여부
    const buttons = container.querySelectorAll(
      `.${floatingActionButtonClasses.btn.root}`,
    );

    fireEvent.click(buttons[1]);
    const callbackSpy = vi.spyOn(callbackTest2, "textCallback");
    callbackTest2.textCallback();
    expect(callbackSpy.mock.calls.length === 1).toBeTruthy();
    expect(callbackSpy).toHaveBeenCalled();
    expect(callbackSpy.mock.results[0].value === "2").toBeTruthy();
  });
});
