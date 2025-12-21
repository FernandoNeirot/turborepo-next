import { Button, type ButtonProps } from "./button/Button";


export const Form = {
  Button
};

export type FormType = {
  Button: typeof Button;
  ButtonProps: ButtonProps;
};

export default Form;