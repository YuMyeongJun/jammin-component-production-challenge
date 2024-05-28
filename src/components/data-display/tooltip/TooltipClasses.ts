import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses';

const classes = {
  root: '',
  container: 'container',
  data: 'data',
  arrow: 'arrow',
  base: 'base',
  font: { root: '', xs: 'xs', sm: 'sm', md: 'md', lg: 'lg' },
  fontBold: 'fontBold',
};
export const tooltipClasses = attachPrefixClasses(classes, 'tooltip');
