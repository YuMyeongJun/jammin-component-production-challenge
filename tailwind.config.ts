/** @type {import('tailwindcss').Config} */

import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

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
      screens: {
        mobile: "360px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1440px",
      },
      colors: {
        gray: {
          50: "#fefeff",
          100: "#f7f7fa",
          150: "#ededf0",
          200: "#dcdcdc",
          250: "#b5b4b4",
          300: "#929292",
          500: "#636364",
          600: "#494949",
          700: "#323232",
          800: "#272727",
          900: "#222222",
        },
        primary: {
          main: "#4478ff",
          light: "#a1bbff",
          dark: "#2659de",
        },
        secondary: {
          main: "#a855f7",
          light: "#c084fc",
          dark: "#7e22ce",
        },
        success: {
          main: "#03bf4e",
          light: "#1dfc76",
          dark: "#198602",
        },
        error: {
          main: "#ff4975",
          light: "#f398af",
          dark: "#f81f55",
        },
        info: {
          main: "#0288d1",
          light: "#03a9f4",
          dark: "#01579b",
        },
        warning: {
          main: "#ff8a00",
          light: "#ffcc80",
          dark: "#f57c00",
        },
        "label-primary": "#38373E",
        "label-secondary": "#8A8A8E",
        separator: "#3c3c4314",
      },
      height: {
        ...rem(41),
      },
      width: {
        ...rem(1113),
      },
      spacing: {
        ...rem(301),
      },
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
      minWidth: {
        ...rem(155),
        200: "200px",
      },
      maxWidth: {
        ...rem(30),
      },
      zIndex: {
        100: "100",
        999: "999",
      },
      borderRadius: {
        4: "4px",
        6: "6px",
        8: "8px",
        12: "12px",
      },
      aria: {
        invalid: "invalid=true",
      },
      boxShadow: {
        elevated: "0px 8px 20px 0px rgba(0, 0, 0, 0.16)",
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".text-large-title": {
          fontSize: "28px",
          lineHeight: "34px",
          fontWeight: 700,
          letterSpacing: "-0.3px",
        },
        ".text-title1": {
          fontSize: "20px",
          lineHeight: "34px",
          fontWeight: 700,
          letterSpacing: "-0.45px",
        },
        ".text-title2": {
          fontSize: "17px",
          lineHeight: "22px",
          fontWeight: 700,
          letterSpacing: "-0.43px",
        },
        ".text-title3": {
          fontSize: "15px",
          lineHeight: "20px",
          fontWeight: 700,
          letterSpacing: "-0.23px",
        },
        ".text-title4": {
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 700,
          letterSpacing: "-0.23px",
        },
        ".text-body-title": {
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 700,
          letterSpacing: "-0.18px",
        },
        ".text-body-text": {
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 500,
          letterSpacing: "-0.28px",
        },
        ".text-sub-title": {
          fontSize: "13px",
          lineHeight: "18px",
          fontWeight: 700,
          letterSpacing: "-0.28px",
        },
        ".text-sub-text": {
          fontSize: "12px",
          lineHeight: "16px",
          fontWeight: 500,
          letterSpacing: "-0.15px",
        },
        ".text-body-action15": {
          fontSize: "15px",
          lineHeight: "20px",
          fontWeight: 700,
          letterSpacing: "-0.23px",
        },
        ".text-body-action13": {
          fontSize: "13px",
          lineHeight: "18px",
          fontWeight: 700,
          letterSpacing: "-0.18px",
        },
        ".text-title-modal": {
          fontSize: "18px",
          lineHeight: "24px",
          fontWeight: 700,
          letterSpacing: "-0.45px",
        },
      });
    },
  ],
};
