import type { store } from "store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type UsersSortField = // UsersSortField type - used to sort users by different fields
  | "name-asc" // sort users by name in ascending order
  | "name-desc" // sort users by name in descending order
  | "username-asc" // sort users by username in ascending order
  | "username-desc" // sort users by username in descending order
  | "email-asc" // sort users by email in ascending order
  | "email-desc" // sort users by email in descending order
  | "phone-asc" // sort users by phone in ascending order
  | "phone-desc" // sort users by phone in descending order
  | "address-asc" // sort users by address in ascending order
  | "address-desc" // sort users by address in descending order
  | "company-asc" // sort users by company in ascending order
  | "company-desc" // sort users by company in descending order
  | "website-asc" // sort users by website in ascending order
  | "website-desc"; // sort users by website in descending order

export type UsersSortFieldName = // UsersSortFieldName type - used to sort users by different fields
  | "name" // sort users by name
  | "username" // sort users by username
  | "email" // sort users by email
  | "phone" // sort users by phone
  | "address" // sort users by address
  | "company" // sort users by company
  | "website"; // sort users by website

export type UsersSortDirection = "asc" | "desc";
