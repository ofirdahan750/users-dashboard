import type { EmptyStateProps } from "types";

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <section className="state state--muted" aria-live="polite">
      <p className="state__text">{message}</p>
    </section>
  );
};
