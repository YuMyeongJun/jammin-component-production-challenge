/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export const BASE_PIXEL = 16;
const pxToRem = (px, base = BASE_PIXEL) => `${px / base}rem`;

const rem = (arrLength, multiple = 1) =>
  [...Array(arrLength).keys()].reduce((acc, px) => {
    acc[`${px * multiple}pxr`] = pxToRem(px);
    return acc;
  }, {});

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      fontSize: {
        xs: ["13px", "16px"],
        sm: ["14px", "20px"],
        md: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "28px"],
        ...rem(40),
      },
      fontFamily: {
        pretendard: ["Pretendard", ...fontFamily.sans],
      },
    },
  },
} satisfies Config;
