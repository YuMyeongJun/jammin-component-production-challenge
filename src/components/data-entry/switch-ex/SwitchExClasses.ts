import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  root: '',
  size: {
    root: '',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  },
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
  wrapper: 'wrapper',
  input: 'input',
  bar: 'bar',
} as const;

export const switchExClasses = attachPrefixClasses(classes, 'switch-ex', true);
