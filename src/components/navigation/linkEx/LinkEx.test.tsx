import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { LinkEx } from "./LinkEx";
import { BrowserRouter } from "react-router-dom";

describe("LinkEx Component", () => {
  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <LinkEx {...props}>Test Link</LinkEx>
      </BrowserRouter>,
    );
  };

  it("렌더링 테크", () => {
    renderComponent();
    const linkElement = screen.getByText("Test Link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass("jammin-linkEx-primary");
    expect(linkElement).toHaveClass("jammin-linkEx-underline-always");
    expect(linkElement).toHaveClass("jammin-linkEx-md");
  });

  it("href제공 되었을 때 외부링크 연결 여부", () => {
    renderComponent({ href: "http://example.com" });
    const linkElement = screen.getByText("Test Link");
    expect(linkElement).toHaveAttribute("href", "http://example.com");
    expect(linkElement.tagName).toBe("A");
  });

  it("react router to가 제공되었을때 연결 여부", () => {
    renderComponent({ to: "/internal" });
    const linkElement = screen.getByText("Test Link");
    expect(linkElement).toHaveAttribute("href", "/internal");
  });

  it("색상 및 사이즈 체크", () => {
    renderComponent({ color: "secondary", size: "lg" });
    const linkElement = screen.getByText("Test Link");
    expect(linkElement).toHaveClass("jammin-linkEx-secondary");
    expect(linkElement).toHaveClass("jammin-linkEx-lg");
  });

  it("underline 체크", () => {
    renderComponent({ underline: "hover" });
    const linkElement = screen.getByText("Test Link");
    expect(linkElement).toHaveClass("jammin-linkEx-underline-hover");
  });

  it("disabled 체크", () => {
    renderComponent({ disabled: true });
    const linkElement = screen.getByText("Test Link");
    expect(linkElement).toHaveClass("jammin-linkEx-disabled");
  });

  it("overlay 체크", () => {
    renderComponent({ overlay: true });
    const linkElement = screen.getByText("Test Link");
    expect(linkElement).toHaveClass("jammin-linkEx-overlay");
  });

  it("hover 체크", () => {
    renderComponent({ useHover: true });
    const linkElement = screen.getByText("Test Link");
    expect(linkElement).toHaveClass("jammin-linkEx-hover");
  });
});
