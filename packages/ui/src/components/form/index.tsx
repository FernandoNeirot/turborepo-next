import { Button, type ButtonProps } from "./button";
import Input from "./input";
import { Search } from "./search";

export const Form = {
  Button,
  Input,
  Search
};

export type FormType = {
  Button: typeof Button;
  ButtonProps: ButtonProps;
  Input: typeof Input;
  Search: typeof Search;
};

export default Form;