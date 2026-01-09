import type { ButtonHTMLAttributes, ReactNode } from "react";

export type LoadingStateProps = {
  message?: string;
};

export type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
  retryButtonText?: string;
};

export type EmptyStateProps = {
  message: string;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};
