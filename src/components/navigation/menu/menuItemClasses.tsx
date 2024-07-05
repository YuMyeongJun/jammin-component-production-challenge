import { attachPrefixClasses } from '@modules/utils';

export const classes = {
  wrap: {
    base: '',
    item: 'item',
    light: 'light',
    title: 'title',
    hasChildren: 'hasChildren',
    selected: 'selected',
    arrow: {
      base: '',
      collapse: 'collapse',
      rotate: 'rotate',
    },
    icon: 'icon',
  },
  container: {
    base: '',
    close: 'close',
    open: 'open',
    popper: 'popper',
    light: 'light',
  },
};

export const menuItemClasses = attachPrefixClasses(classes, 'menu-item', true);
