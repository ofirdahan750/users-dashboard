import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { EMPTY_SEARCH_TEXT, EMPTY_STATE_TEXT } from "constants";

export type LoadingStateProps = {
  message?: string;
};

export type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
  retryButtonText?: string;
};

export type EmptyMessage = typeof EMPTY_STATE_TEXT | typeof EMPTY_SEARCH_TEXT;

export type EmptyStateProps = {
  message: string;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};
