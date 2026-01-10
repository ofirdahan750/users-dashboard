import { LOADING_TEXT } from "constants";
import type { LoadingStateProps } from "types";
import { Spinner } from "./Spinner";

export const LoadingState = ({ message = LOADING_TEXT }: LoadingStateProps) => {
  return (
    <section className="state state--info" aria-live="polite" aria-busy="true">
      <Spinner />
      <p className="state__text">{message}</p>
    </section>
  );
};
