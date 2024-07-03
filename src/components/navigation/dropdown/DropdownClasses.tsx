import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses';

const classes = {
  root: '',
  container: 'container',
  data: 'data',
  base: 'base',
};
export const dropdownClasses = attachPrefixClasses(classes, 'dropdown');
