import { useState, type ChangeEvent } from "react";
import { type TextareaProps } from "./index";
import Textarea from "./index";

export function InteractiveTextareaWrapper(args: TextareaProps) {
  const [value, setValue] = useState(args.value || "");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    args.onChange?.(e);
  };

  return <Textarea {...args} value={value} onChange={handleChange} />;
}
