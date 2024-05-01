import { attachPrefixClasses } from "@modules/utils/generatePrefixClasses";

const classes = {
  root: "",
  disabled: "disabled",
  placeholder: "placeholder",
  container: "container",
  normal: { root: "", sm: "sm", md: "md", lg: "lg" },
  focus: {
    root: "",
    focusNone: "focus-none",
  },
  status: {
    error: "error",
    warning: "warning",
  },
  bordered: {
    root: "",
    borderedNone: "bordered-none",
  },
  referenceElement: "referenceElement",
  icon: {
    root: "",
    disabled: "disabled",
  },
  list: {
    root: "",
    overflow: "overflow",
    item: "item",
    hover: "hover",
    disabled: "disabled",
    font: { root: "", sm: "sm", md: "md", lg: "lg" },
  },
  multiSelect: {
    root: "",
    tag: {
      root: "",
      area: "area",
      closeIcon: "closeIcon",
    },
    inputArea: "inputArea",
    icon: {
      root: "",
      disabled: "disabled",
      prefix: "prefix",
    },
  },
};
export const selectClasses = attachPrefixClasses(classes, "select");
