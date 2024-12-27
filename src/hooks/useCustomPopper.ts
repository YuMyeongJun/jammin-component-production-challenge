import { Placement, popper } from "@popperjs/core";
import { useCallback, useState } from "react";
import { usePopper } from "react-popper";

// Popper 커스텀 훅의 Props 인터페이스
interface UseCustomPopperProps {
  initPlacement?: Placement; // 초기 배치 위치
  initOffset?: [number, number]; // 초기 오프셋 값 [x, y]
}

export const useCustomPopper = ({
  initPlacement = "bottom", // 기본값: 하단 배치
  initOffset = [0, 0], // 기본값: 오프셋 없음
}: UseCustomPopperProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [placement, setPlacement] = useState<Placement>(initPlacement);
  const [offset, setOffset] = useState<[number, number]>(initOffset);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);

  // Popper 설정
  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      placement,
      modifiers: [
        { name: "arrow", options: { element: arrowElement } }, // 화살표 요소 설정
        {
          name: "offset",
          options: { offset }, // 오프셋 설정
        },
      ],
    },
  );

  // Popper 위치 업데이트 함수
  const popperUpdate = useCallback(() => {
    requestAnimationFrame(() => {
      void update?.();
    });
  }, [update]);

  // 배치 위치 변경 핸들러
  const onChangePlacement = useCallback(
    (newPlacement: Placement) => {
      if (newPlacement !== placement) {
        setPlacement(newPlacement);
        popperUpdate();
      }
    },
    [placement],
  );

  // 오프셋 변경 핸들러
  const onChangeOffset = useCallback(
    (newOffset: [number, number]) => {
      if (newOffset[0] !== offset[0] || newOffset[1] !== offset[1]) {
        setOffset(newOffset);
        popperUpdate();
      }
    },
    [offset],
  );

  // 화살표 요소 참조 핸들러
  const handleArrowElement = useCallback(
    (ref: React.RefObject<HTMLElement>) => {
      if (ref.current && ref.current !== arrowElement) {
        setArrowElement(ref.current);
        popperUpdate();
      }
    },
    [referenceElement],
  );

  // 기준 요소 참조 핸들러
  const handleReferenceElement = useCallback(
    (ref: React.RefObject<HTMLElement>) => {
      if (ref.current && ref.current !== referenceElement) {
        setReferenceElement(ref.current);
        popperUpdate();
      }
    },
    [referenceElement],
  );

  return {
    // 기준 요소 props
    referenceProps: {
      ref: (el: HTMLElement | null) => {
        setReferenceElement(el);
      },
    },
    // Popper 요소 props
    popperProps: {
      ref: (el: HTMLElement | null) => {
        setPopperElement(el);
      },
    },
    // 화살표 요소 props
    arrowProps: {
      ref: (el: HTMLElement | null) => {
        setArrowElement(el);
      },
    },
    isVisible,
    setIsVisible,
    placement,
    offset,
    referenceElement,
    popperElement,
    arrowElement,
    styles,
    attributes,
    onChangePlacement,
    onChangeOffset,
    handleArrowElement,
    handleReferenceElement,
  };
};
