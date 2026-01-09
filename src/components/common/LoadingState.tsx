import { LOADING_TEXT } from "../../constants/texts";
import type { LoadingStateProps } from "../../types/uiProps";
import { Spinner } from "./Spinner";

export const LoadingState = ({ message = LOADING_TEXT }: LoadingStateProps) => {
  return (
    <section className="state state--info" aria-live="polite" aria-busy="true">
      <Spinner />
      <p className="state__text">{message}</p>
    </section>
  );
};
