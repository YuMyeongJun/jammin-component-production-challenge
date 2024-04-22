import { attachPrefixClasses } from "@modules";

const classes = {
  root: "",
  sm: "sm",
  md: "md",
  lg: "lg",
  label: "label",
  error: "error",
} as const;

export const inputClasses = attachPrefixClasses(classes, "input", true);
