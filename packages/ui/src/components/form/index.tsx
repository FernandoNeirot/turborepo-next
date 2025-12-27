import React from "react";
import { Button, type ButtonProps } from "./button";
import Input from "./input";
import { Search } from "./search";

// Wrapper para preservar correctamente los tipos opcionales
const FormButton = (props: ButtonProps) => <Button {...props} />;
const FormInput = (props: React.ComponentProps<typeof Input>) => <Input {...props} />;

export const Form = {
  Button: FormButton,
  Input: FormInput,
  Search
};

export type FormType = {
  Button: typeof FormButton;
  ButtonProps: ButtonProps;
  Input: typeof Input;
  Search: typeof Search;
};

export default Form;