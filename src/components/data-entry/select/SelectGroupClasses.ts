import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses';

const classes = {
  root: '',
  border: 'border',
  error: 'error',
  errorBorder: 'errorBorder',
  disabled: 'disabled',
  text: 'text',
  selectUl: {
    root: '',
    disabled: 'disabled',
    overflow: 'overflow',
    font: { root: '', sm: 'sm', md: 'md', lg: 'lg' },
    border: 'border',
    hover: 'hover',
    selected: 'selected',
    hoverSelected: 'hoverSelected',
  },
  normal: { root: '', sm: 'sm', md: 'md', lg: 'lg' },
};
export const selectGroupClasses = attachPrefixClasses(classes, 'selectGroup');