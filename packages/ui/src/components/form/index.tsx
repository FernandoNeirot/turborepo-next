import React from "react";
import { Button, type ButtonProps } from "./button";
import Input from "./input";
import { Search } from "./search";
import Textarea from "./texarea";

const FormButton = (props: ButtonProps) => <Button {...props} />;
const FormInput = (props: React.ComponentProps<typeof Input>) => (
  <Input {...props} />
);
const FormTextarea = (props: React.ComponentProps<typeof Textarea>) => (
  <Textarea {...props} />
);
export const Form = {
  Button: FormButton,
  Input: FormInput,
  Search,
  Textarea: FormTextarea,
};

export type FormType = {
  Button: typeof FormButton;
  ButtonProps: ButtonProps;
  Input: typeof Input;
  Search: typeof Search;
  Textarea: typeof Textarea;
};

export default Form;
