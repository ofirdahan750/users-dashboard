import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";
import type {
  UsersSortField,
  UsersSortFieldName,
  UsersSortDirection,
  UsersState,
  RootState,
} from "../types/store";
import { SLICE_NAME_USERS, SORT_VALUE_NAME_ASC } from "../constants/store";
import { SORT_FIELDS } from "../constants/sortConfig";

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk<User[]>(
  `${SLICE_NAME_USERS}/fetchUsers`,
  async () => {
    const response = await fetch(USERS_API_URL);

    if (!response.ok) {
      throw new Error("Failed to load users.");
    }

    return response.json();
  }
);

const getFieldValue = (user: User, field: UsersSortFieldName): string => {
  const config = SORT_FIELDS.find((f) => f.field === field);
  return config ? config.getValue(user) : "";
};

const parseSortField = (
  sortField: UsersSortField
): [UsersSortFieldName, UsersSortDirection] => {
  const [field, direction] = sortField.split("-") as [
    UsersSortFieldName,
    UsersSortDirection,
  ];
  return [field, direction];
};

const filterUsers = (users: User[], searchTerm: string): User[] => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (!normalizedSearch) {
    return users;
  }

  return users.filter((user) => {
    // Remove @ from username for search comparison
    const usernameWithoutAt = user.username.replace(/^@/, "").toLowerCase();
    const searchWithoutAt = normalizedSearch.replace(/^@/, "");

    const searchableFields = [
      user.name,
      usernameWithoutAt, // Use username without @
      user.email,
      user.phone,
      user.website,
      user.company.name,
      user.address.street,
      user.address.suite,
      user.address.city,
      user.address.zipcode,
    ];

    const searchableText = searchableFields.join(" ").toLowerCase();

    return searchableText.includes(searchWithoutAt);
  });
};

const sortUsers = (users: User[], sortField: UsersSortField): User[] => {
  const [field, direction] = parseSortField(sortField);

  return [...users].sort((a, b) => {
    const aValue = getFieldValue(a, field).toLowerCase();
    const bValue = getFieldValue(b, field).toLowerCase();

    const comparison = aValue.localeCompare(bValue);

    return direction === "desc" ? -comparison : comparison;
  });
};

export const applySearchAndSort = (
  users: User[],
  searchTerm: string,
  sortField: UsersSortField
): User[] => {
  const filtered = filterUsers(users, searchTerm);
  return sortUsers(filtered, sortField);
};

const initialState: UsersState = {
  users: [],
  errorMessage: null,
  sortField: SORT_VALUE_NAME_ASC,
};

export const usersSlice = createSlice({
  name: SLICE_NAME_USERS,
  initialState,
  reducers: {
    setSortField: (state, action: PayloadAction<UsersSortField>) => {
      state.sortField = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.errorMessage = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.errorMessage = action.error.message ?? "Unknown error occurred.";
      });
  },
});

export const { setSortField } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;

// Selector to compute filtered users
export const selectFilteredUsers = (state: RootState): User[] => {
  return applySearchAndSort(
    state.users.users,
    state.search.searchTerm,
    state.users.sortField
  );
};
