import { attachPrefixClasses } from "@modules/utils/generatePrefixClasses";

const classes = {
  root: "",
  sm: "sm",
  md: "md",
  lg: "lg",
  error: "error",
} as const;

export const buttonClasses = attachPrefixClasses(classes, "btn", false);

export type ButtonClasses = typeof buttonClasses;
