import { attachPrefixClasses } from '@modules/utils';

const classes = {
  root: '',
  prefix: 'prefix',
  suffix: 'suffix',
  type: {
    fill: 'fill',
    twotone: 'twotone',
    text: 'text',
    bordered: 'bordered',
    dashed: 'dashed',
  },
  shape: {
    round: 'round',
    rect: 'rect',
    'round-full': 'round-full',
    circle: 'circle',
  },
  size: {
    base: {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    },
    circle: {
      sm: 'circle-sm',
      md: 'circle-md',
      lg: 'circle-lg',
    },
  },
  color: {
    base: {
      primary: 'primary',
      secondary: 'secondary',
      success: 'success',
      error: 'error',
      info: 'info',
      warning: 'warning',
      gray: 'gray',
      dark: 'dark',
    },
    twotone: {
      primary: 'twotone-primary',
      secondary: 'twotone-secondary',
      success: 'twotone-success',
      error: 'twotone-error',
      info: 'twotone-info',
      warning: 'twotone-warning',
      gray: 'twotone-gray',
      dark: 'twotone-dark',
    },
  },
  content: 'content',
};

export const buttonExClasses = attachPrefixClasses(classes, 'btn-ex', false);
