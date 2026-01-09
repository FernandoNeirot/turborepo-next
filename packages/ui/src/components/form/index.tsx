import React from "react";
import { Button, type ButtonProps } from "./button";
import Input from "./input";
import Radiobutton, { type RadiobuttonProps } from "./radiobutton";
import { Search } from "./search";
import Textarea from "./texarea";

const FormButton = (props: ButtonProps) => <Button {...props} />;
const FormInput = (props: React.ComponentProps<typeof Input>) => (
  <Input {...props} />
);
const FormRadiobutton = (props: RadiobuttonProps) => (
  <Radiobutton {...props} />
);
const FormTextarea = (props: React.ComponentProps<typeof Textarea>) => (
  <Textarea {...props} />
);
export const Form = {
  Button: FormButton,
  Input: FormInput,
  Radiobutton: FormRadiobutton,
  Search,
  Textarea: FormTextarea,
};

export type FormType = {
  Button: typeof FormButton;
  ButtonProps: ButtonProps;
  Input: typeof Input;
  Radiobutton: typeof FormRadiobutton;
  RadiobuttonProps: RadiobuttonProps;
  Search: typeof Search;
  Textarea: typeof Textarea;
};

export default Form;
