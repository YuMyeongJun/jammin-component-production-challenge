import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  root: '',
  wrapper: 'wrapper',
  disabled: 'disabled',
  icon: 'icon',
  circle: 'circle',
  square: 'square',

  triggerClick: 'trigger-click',
  triggerHover: 'trigger-hover',
  badgeCounter: 'badge-counter',
  description: 'description',
  hiddenBtn: 'hidden-button',
  hiddenMenu: 'hidden-menu',
  btn: { root: '', displayNone: 'display-none' },
  cancelBtn: 'cancel-button',
} as const;

export const floatingActionButtonClasses = attachPrefixClasses(
  classes,
  'floating-action-button',
  true,
);
