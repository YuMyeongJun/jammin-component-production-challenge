import React, { forwardRef, useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classNames from 'classnames';

import { ITextareaProps } from './Textarea.types';
import { textareaClasses } from './TextareaClasses';

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>((args, ref) => {
  const {
    style,
    readOnly,
    isError,
    direction,
    showCount,
    controlSize = 'md',
    useFocus = true,
    ...inputProps
  } = args;

  const handleTextArea = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      return args.onChange?.(e);
    },
    [args],
  );

  const resultClassName = classNames(
    textareaClasses.root,
    direction ?? textareaClasses.border,
    args.className,
    {
      invalid: isError,
    },
    {
      [textareaClasses.size.sm]: controlSize === 'sm',
      [textareaClasses.size.md]: controlSize === 'md',
      [textareaClasses.size.lg]: controlSize === 'lg',
    },
    !useFocus
      ? 'focus:border-[var(--bc-border-color)] focus:ring-0 group-focus-within:border-[var(--bc-border-color)]'
      : '',
  );

  //console.log('@use focus', useFocus);

  return (
    <TextareaAutosize
      {...inputProps}
      className={resultClassName}
      onChange={handleTextArea}
      placeholder={args.placeholder}
      maxLength={args.maxLength}
      ref={ref}
      readOnly={readOnly}
      autoComplete={args.autoComplete ? 'true' : 'false'}
      disabled={args.disabled}
    />
  );
});

Textarea.displayName = 'bc_textarea';
