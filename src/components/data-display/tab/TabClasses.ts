import { attachPrefixClasses } from '@modules/utils';

const tabContainer = {
  root: '',
  horizontal: 'horizontal',
  vertical: 'vertical',
  left: 'left',
  right: 'right',
  vLeft: 'vLeft',
  vRight: 'vRight',
};

const tab = {
  root: '',
  horizontal: 'horizontal',
  vertical: 'vertical',
  left: 'left',
  right: 'right',
  center: 'center',
};

export const tabContainerClasses = attachPrefixClasses(
  tabContainer,
  'tab-container',
  false,
);

export const tabClasses = attachPrefixClasses(tab, 'tab', false);

export type TabClasses = typeof tabClasses;
export type TabContainerClasses = typeof tabContainerClasses;
