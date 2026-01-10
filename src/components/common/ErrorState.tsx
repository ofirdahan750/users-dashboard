import { Button } from "@mui/material";
import { ERROR_TEXT, RETRY_BUTTON_TEXT } from "constants";
import type { ErrorStateProps } from "types";

export const ErrorState = ({
  message = ERROR_TEXT,
  onRetry,
}: ErrorStateProps) => {
  return (
    <section className="state state--error" role="alert" aria-live="assertive">
      <p className="state__text">{message}</p>
      {onRetry && (
        <Button variant="contained" onClick={onRetry}>
          {RETRY_BUTTON_TEXT}
        </Button>
      )}
    </section>
  );
};
