import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  appName?: "web" | "storybook";
  isDisabled?: boolean;
  name?: string;
  id?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  variant?: "default" | "search";
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      appName,
      isDisabled,
      onChange,
      name,
      id,
      value,
      type = "text",
      placeholder,
      onBlur,
      onFocus,
      onKeyDown,
      onKeyUp,
      variant = "default",
      ...rest
    },
    ref
  ) => {
    const classByAppName =
      variant === "search"
        ? "focus:ring-transparent"
        : appName === "web"
          ? "focus:ring-blue-300"
          : "focus:ring-purple-300";
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            className={`text-sm font-medium ${isDisabled ? "text-gray-300" : "text-gray-700"}`}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          disabled={isDisabled}
          className={`
          px-3 py-2 ${variant === "search" ? "" : "border "} focus:outline-none focus:ring-2 ${classByAppName}
          ${
            error
              ? "border-red-500"
              : isDisabled
                ? "border-gray-200 cursor-not-allowed text-gray-400"
                : "border-gray-300"
          }`}
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-label={label}
          {...rest}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
        {helperText && !error && (
          <span
            className={`text-sm ${isDisabled ? "text-gray-200" : "text-gray-500"}`}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
