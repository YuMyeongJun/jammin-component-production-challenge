import { attachPrefixClasses } from "@modules";

const classes = {
  root: "",
  normal: { root: "", sm: "sm", md: "md", lg: "lg" },
  wrapped: { root: "", sm: "sm", md: "md", lg: "lg" },
  label: "label",
  error: "error",
} as const;

export const inputClasses = attachPrefixClasses(classes, "input", true);
