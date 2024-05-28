import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  root: '',
  defaultTabItem: '0',
  solid: {
    root: 'solid',
    selected: 'solidSelected',
  },
  underline: {
    root: 'underline',
    selected: 'underlineSelected',
  },
  handle: {
    root: 'handle',
    selected: 'handleSelected',
  },
  rounded: {
    root: '',
    none: 'suqare',
    sm: 'roundedSm',
    md: 'roundedMd',
    lg: 'roundedLg',
    xl: 'roundedXl',
  },
  selected: 'selected',
  color: {
    root: '',
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    error: 'error',
    info: 'info',
    warning: 'warning',
    gray: 'gray',
    dark: 'dark',
  },
  size: {
    root: '',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  },
  tabIcon: 'tabIcon',
  closeIcon: 'closeIcon',
  inline: 'inline',
  hidden: 'hidden',
} as const;

export const tabItemClasses = attachPrefixClasses(classes, 'tab-item', false);

export type TabItemClasses = typeof tabItemClasses;
