import { Button as MuiButton } from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material";
import type { ButtonProps } from "types";

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  // convert our variant to mui variant
  const muiVariant = variant === "primary" ? "contained" : variant === "secondary" ? "outlined" : "text"; // convert our variant to mui variant

  const muiProps = { ...props }; // spread props to mui button


  return (
    <MuiButton
      variant={muiVariant}
      className={`button button--${variant} ${className}`.trim()}
      {...(muiProps as MuiButtonProps)}
    >
      {children}
    </MuiButton>
  );
};
