import { SORT_FIELDS } from "./sortConfig";
import type { SortOption } from "../types/userProps";

export const SORT_OPTIONS: SortOption[] = SORT_FIELDS.map((field) => ({
  groupLabel: field.label,
  options: [
    {
      value: `${field.field}-asc` as const,
      label: `${field.label} (A → Z)`,
    },
    {
      value: `${field.field}-desc` as const,
      label: `${field.label} (Z → A)`,
    },
  ],
}));
