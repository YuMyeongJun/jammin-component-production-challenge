import icon from "@icons/ic_collapse_arrow_up.svg";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Collapse } from "./Collapse";
import { collapseClasses } from "./CollapseClasses";

describe("<Collapse />", () => {
  const children = (
    <div className="desc">
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius
        sodales mauris id efficitur. Sed condimentum sagittis tincidunt.
        Vestibulum vel orci tempus, pharetra nibh ac, accumsan leo. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Suspendisse consequat
        mollis metus, sed tempus lacus feugiat sit amet. Nunc pellentesque erat
        vel nulla pellentesque, et pharetra felis rutrum. Donec maximus metus
        rhoncus sapien dapibus viverra. Sed id dui et augue tincidunt
        scelerisque sed vel massa. In pellentesque felis quis risus lacinia
        rhoncus. Nullam vitae porttitor tellus. Quisque fringilla arcu risus,
        sit amet mattis quam pretium id. Quisque eget ante interdum, vulputate
        urna non, pellentesque est. Etiam dignissim enim ut ex gravida aliquam.
      </span>
    </div>
  );

  it("렌더링 체크", () => {
    render(<Collapse children={children} />);
    const collapse = screen.getByRole("button");
    expect(
      collapse?.className.includes(collapseClasses.header.root),
    ).toBeTruthy();
  });

  it("제목 노출 여부 체크", () => {
    const { rerender } = render(
      <Collapse
        label={"title"}
        children={children}
        showIcon={true}
        expandIcon={icon}
        expandIconPosition={"end"}
      />,
    );
    const title = screen
      .getAllByRole("button")
      .find((btn) => btn.className === "jammin-collapse-header")?.firstChild
      ?.firstChild as HTMLSpanElement;

    // expect(title.classList.contains(collapseClasses.header.label.root)).toBeTruthy();
    expect(
      title.className.includes(collapseClasses.header.label.content),
    ).toBeTruthy();

    rerender(
      <Collapse
        children={children}
        showIcon={true}
        expandIcon={icon}
        expandIconPosition={"end"}
      />,
    );
    const nonTitle = screen
      .getAllByRole("button")
      .find((btn) => btn.className === "jammin-collapse-header")?.firstChild
      ?.firstChild as HTMLSpanElement;

    expect(nonTitle?.textContent).toEqual("");
  });

  it("collapse 버튼 노출 여부", () => {
    const { rerender } = render(
      <Collapse
        children={children}
        showIcon={true}
        expandIcon={icon}
        expandIconPosition={"end"}
      />,
    );

    // 버튼 노출
    const showIcon = screen.getAllByRole("button")[0]
      .lastChild as HTMLButtonElement;
    expect(
      showIcon?.classList.contains(collapseClasses.header.expandIcon),
    ).toBeTruthy();
    expect(showIcon?.classList.contains("expand")).toBeTruthy();

    // 버튼 미노출
    rerender(<Collapse children={children} showIcon={false} />);
    const button = screen.getAllByRole("button")[0].lastChild
      ?.firstChild as HTMLSpanElement;
    expect(button?.children).length.lessThanOrEqual(0);
  });

  it("collapse 클릭 시 children 노출 체크", () => {
    const { container } = render(
      <Collapse
        children={children}
        showIcon={true}
        expandIcon={icon}
        expandIconPosition="end"
      />,
    );

    // const button = screen.getByRole('button');
    const button = screen.getAllByRole("button");

    const child = container.querySelector(`.${collapseClasses.children}`);

    // collapse 클릭하여 children 노출
    fireEvent.click(button[0]);
    expect(child?.classList.contains("invisible")).toBeFalsy();

    // collapse 클릭하여 노출 되어있는 children 비노출
    fireEvent.click(button[0]);
    expect(child?.classList.contains("invisible")).toBeTruthy();
  });
});
