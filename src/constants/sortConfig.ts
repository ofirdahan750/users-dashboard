import type { UsersSortFieldName, User } from "types";

export type SortFieldConfig = {
  field: UsersSortFieldName;
  label: string;
  getValue: (user: User) => string;
};

export const SORT_FIELDS: SortFieldConfig[] = [
  {
    field: "name",
    label: "Name",
    getValue: (user) => user.name,
  },
  {
    field: "username",
    label: "Username",
    getValue: (user) => user.username,
  },
  {
    field: "email",
    label: "Email",
    getValue: (user) => user.email,
  },
  {
    field: "phone",
    label: "Phone",
    getValue: (user) => user.phone,
  },
  {
    field: "address",
    label: "Address",
    getValue: (user) => `${user.address.street} ${user.address.suite} ${user.address.city} ${user.address.zipcode}`,
  },
  {
    field: "company",
    label: "Company",
    getValue: (user) => user.company.name,
  },
  {
    field: "website",
    label: "Website",
    getValue: (user) => user.website,
  },
];
