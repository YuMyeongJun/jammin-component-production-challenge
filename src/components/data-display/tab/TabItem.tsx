import React, { forwardRef } from 'react';
import IcTabClose from '@assets/icons/ic_basic_close.svg';
import classNames from 'classnames';

import { tabItemClasses } from './TabItemClasses';
import { ITabItemProps } from '.';

export const TabItem = React.forwardRef<HTMLDivElement, ITabItemProps>(function TabItem(
  props: ITabItemProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div ref={ref} className={classNames()}>
      {/*
      tab Icon
      tab text
      */}
      <span>Tab Item</span>
      {/* tab CloseIcon */}
      <IcTabClose />
    </div>
  );
});
