import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, Reducer } from "@reduxjs/toolkit";
import type {
  User,
  UsersSortField,
  UsersSortFieldName,
  UsersSortDirection,
  UsersState,
  RootState,
} from "types";
import { SLICE_NAME_USERS, SORT_VALUE_NAME_ASC, SORT_FIELDS } from "constants";

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users"; // users API URL

export const fetchUsers = createAsyncThunk<User[]>(
  `${SLICE_NAME_USERS}/fetchUsers`, // fetch users thunk
  async () => {
    const response = await fetch(USERS_API_URL); // fetch users from API

    if (!response.ok) {
      // if users are not loaded
      throw new Error("Failed to load users."); // throw error if users are not loaded
    }

    return response.json(); // return users from API
  }
);

const getFieldValue = (user: User, field: UsersSortFieldName): string => {
  // get field value from user
  const config = SORT_FIELDS.find((f) => f.field === field); // find field value from user
  return config ? config.getValue(user) : ""; // return field value from user
};

const parseSortField = (
  sortField: UsersSortField
): [UsersSortFieldName, UsersSortDirection] => {
  // parse sort field
  const [field, direction] = sortField.split("-") as [
    UsersSortFieldName, // UsersSortFieldName type - used to sort users by different fields
    UsersSortDirection, // UsersSortDirection type - used to sort users by different directions
  ];
  return [field, direction]; // return parsed sort field
};

const filterUsers = (users: User[], searchTerm: string): User[] => {
  // filter users by search term
  const normalizedSearch = searchTerm.trim().toLowerCase(); // trim and lowercase search term

  if (!normalizedSearch) {
    return users; // return users if search term is empty
  }

  return users.filter((user) => {
    // Remove @ from username for search comparison
    const usernameWithoutAt = user.username.replace(/^@/, "").toLowerCase(); // remove @ from username for search comparison
    const searchWithoutAt = normalizedSearch.replace(/^@/, ""); // remove @ from search for search comparison

    const searchableFields = [
      user.name, // name of user
      usernameWithoutAt, // Use username without @
      user.email, // email of user
      user.phone, // phone of user
      user.website, // website of user
      user.company.name, // company name of user
      user.address.street, // street of user
      user.address.suite, // suite of user
      user.address.city, // city of user
      user.address.zipcode, // zipcode of user
    ];

    const searchableText = searchableFields.join(" ").toLowerCase(); // join searchable fields and lowercase them

    return searchableText.includes(searchWithoutAt); // return true if searchable text includes search without @
  });
};

const sortUsers = (users: User[], sortField: UsersSortField): User[] => {
  // sort users by field
  const [field, direction] = parseSortField(sortField); // parse sort field

  return [...users].sort((a, b) => {
    const aValue = getFieldValue(a, field).toLowerCase(); // get field value from user
    const bValue = getFieldValue(b, field).toLowerCase(); // get field value from user

    const comparison = aValue.localeCompare(bValue); // compare field values
    // if direction is descending, return the negative of the comparison
    // if direction is ascending, return the comparison
    return direction === "desc"
      ? -comparison // if direction is descending, return the negative of the comparison
      : comparison; // if direction is ascending, return the comparison
  });
};

export const applySearchAndSort = (
  users: User[],
  searchTerm: string,
  sortField: UsersSortField
): User[] => {
  const filtered = filterUsers(users, searchTerm); // filter users by search term
  return sortUsers(filtered, sortField); // sort users by field
};

const initialState: UsersState = {
  users: [], // initial users
  errorMessage: "", // initial error message
  sortField: SORT_VALUE_NAME_ASC, // initial sort field
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
    // fetch users extra reducers
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.errorMessage = ""; // clear error message
        state.users = []; // clear users
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload; // set users
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.errorMessage = action.error.message ?? "Unknown error occurred."; // set error message
        state.users = []; // clear users
      });
  },
});

export const { setSortField } = usersSlice.actions; // set sort field action

export const usersReducer: Reducer<UsersState> = usersSlice.reducer;

// Selector to compute filtered users
export const selectFilteredUsers = (state: RootState): User[] => {
  // select filtered users
  return applySearchAndSort(
    // apply search and sort to users
    state.users.users,
    state.search.searchTerm,
    state.users.sortField
  );
};
