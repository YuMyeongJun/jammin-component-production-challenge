import { forwardRef, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactLoading from "react-loading";
import { remUtil } from "@modules/utils/rem";
import classNames from "classnames";

import { ISpinProps } from "./Spin.types";
import { spinClasses } from "./SpinClasses";
import { composeRef } from "@modules";

export const Spin = forwardRef<HTMLElement, ISpinProps>((args, ref) => {
  const {
    delay,
    indicator,
    type = "spinningBubbles",
    tip,
    color = "gray",
    fullscreen,
    className,
    style,
    size = 35,
    spinning = true,
    children,
    container = document.querySelector("body"),
    ...props
  } = args;
  const width = typeof size !== "number" ? remUtil.findNumber(size) : size;
  const handleRef = composeRef(ref);
  console.log(handleRef);

  const rootClassName = classNames(spinClasses.area, {
    [spinClasses.option.fullScreen]: fullscreen,
    [spinClasses.option.bgColor]: children,
    [spinClasses.option.hidden]: !spinning && !children,
  });

  const defaultClassName = classNames({
    [spinClasses.inline]: tip,
  });
  const childrenClassName = classNames(spinClasses.root, {
    [spinClasses.children]: fullscreen || children,
    [spinClasses.option.hidden]: !spinning && children,
  });

  useEffect(() => {
    if (fullscreen && spinning) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [fullscreen, spinning]);

  return (
    <div>
      {fullscreen ? (
        ReactDOM.createPortal(
          <div className={classNames(rootClassName, className)}>
            <div {...props} className={classNames(childrenClassName)}>
              {indicator ? (
                <span
                  className={classNames(spinClasses.indicator)}
                  style={{ ...style }}
                >
                  {indicator}
                </span>
              ) : (
                <span
                  style={{ ...style }}
                  className={classNames(defaultClassName)}
                >
                  <ReactLoading
                    type={type}
                    color={color}
                    height={width}
                    width={width}
                    delay={delay}
                  />
                </span>
              )}
              {tip !== undefined && <div>{tip}</div>}
            </div>
            <div>{children}</div>
          </div>,
          container!,
        )
      ) : (
        <div className={classNames(className, spinClasses.default.root)}>
          <div {...props} className={classNames(spinClasses.default.spin)}>
            {indicator ? (
              <span
                className={classNames(spinClasses.indicator)}
                style={{ ...style }}
              >
                {indicator}
              </span>
            ) : (
              <span
                style={{ ...style }}
                className={classNames(defaultClassName)}
              >
                <ReactLoading
                  type={type}
                  color={color}
                  height={width}
                  width={width}
                  delay={delay}
                />
              </span>
            )}
            {tip !== undefined && <div>{tip}</div>}
          </div>
          <div className={classNames(spinClasses.default.children)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
});
