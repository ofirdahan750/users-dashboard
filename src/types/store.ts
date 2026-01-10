import type { store } from "store";
import type { User } from "./user";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type UsersSortField =
  | "name-asc"
  | "name-desc"
  | "username-asc"
  | "username-desc"
  | "email-asc"
  | "email-desc"
  | "phone-asc"
  | "phone-desc"
  | "address-asc"
  | "address-desc"
  | "company-asc"
  | "company-desc"
  | "website-asc"
  | "website-desc";

export type UsersSortFieldName = "name" | "username" | "email" | "phone" | "address" | "company" | "website";

export type UsersSortDirection = "asc" | "desc";

export type UsersState = {
  users: User[];
  errorMessage: string ;
  sortField: UsersSortField;
};
