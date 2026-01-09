import { Button as MuiButton } from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material";
import type { ButtonProps } from "../../types/uiProps";

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  // convert our variant to mui variant
  const muiVariant = variant === "primary" ? "contained" : variant === "secondary" ? "outlined" : "text";

  // remove color prop if it exists
  const muiProps = { ...props };
  if ("color" in muiProps) {
    delete muiProps.color;
  }

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
