import type { User } from "./user";
import type { UsersSortField } from "./store";
import type { Theme } from "./theme";

export type LoadingState = {
  isLoading: boolean;
};

export type SearchState = {
  searchTerm: string;
};

export type ThemeState = {
  mode: Theme;
};

export type UsersState = {
  users: User[];
  errorMessage: string;
  sortField: UsersSortField;
};
