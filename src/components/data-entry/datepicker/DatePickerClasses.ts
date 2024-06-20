import { attachPrefixClasses } from '@modules/utils';

const classes = {
  wrap: 'wrap',
  range: 'range',
  calendar: 'calendar',
  size: {
    md: 'md',
    lg: 'lg',
    sm: 'sm',
  },
};

export const datePickerClasses = attachPrefixClasses(classes, 'datepicker', true);
