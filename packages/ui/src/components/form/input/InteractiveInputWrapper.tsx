import { useState, type ChangeEvent } from 'react';
import Input, { type InputProps } from './index';

export function InteractiveInputWrapper(args: InputProps) {
  const [value, setValue] = useState(args.value || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    args.onChange?.(e);
  };

  return (
    <Input
      {...args}
      value={value}
      onChange={handleChange}
      onBlur={args.onBlur}
      onFocus={args.onFocus}
      onKeyDown={args.onKeyDown}
      onKeyUp={args.onKeyUp}
    />
  );
}
