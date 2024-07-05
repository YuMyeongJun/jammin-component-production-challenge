import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

export const classes = {
  nav: 'nav',
  wrap: 'wrap',
  collapse: 'collapse',
  light: 'light',
};

export const menuClasses = attachPrefixClasses(classes, 'menu', true);
