'use client';

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useBody } from '@hooks/useBody';
import { IHasChildren } from '@models';

export const BodyPortal = ({ children }: IHasChildren) => {
  const body = useBody();

  return <>{body && ReactDOM.createPortal(<>{children}</>, body)}</>;
};
