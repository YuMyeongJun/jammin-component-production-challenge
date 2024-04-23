import { attachPrefixClasses } from "@modules/utils/generatePrefixClasses";

const classes = {
  root: "",
  area: "area",
  option: {
    fullScreen: "fullscreen",
    bgColor: "bgColor",
    hidden: "hidden",
  },
  children: "children",
  indicator: "indicator",
  inline: "inline",
  default: {
    root: "",
    spin: "spin",
    children: "children",
  },
};
export const spinClasses = attachPrefixClasses(classes, "spin");
