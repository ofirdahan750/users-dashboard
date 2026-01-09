import type { User } from "./user";
import type { UsersSortField } from "./store";

export type UsersListProps = {
  users: User[];
};

export type UsersListItemProps = {
  user: User;
  index: number;
};

export type SortOption = {
  groupLabel: string;
  options: Array<{
    value: UsersSortField;
    label: string;
  }>;
};
