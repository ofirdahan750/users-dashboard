import { useState, useEffect, type ChangeEvent } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ListSubheader,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import type { SelectChangeEvent } from "@mui/material";
import {
  SEARCH_LABEL,
  SEARCH_PLACEHOLDER,
  SORT_LABEL,
  SORT_OPTIONS,
  SEARCH_DEBOUNCE_DELAY,
} from "constants";
import { setSortField, setSearchTerm } from "store";
import type { AppDispatch, UsersSortField, Theme } from "types";
import { useAppDispatch, useAppSelector, useDebounce } from "hooks";

export const UsersToolbar = () => {
  const dispatch: AppDispatch = useAppDispatch(); // send actions to store

  const searchTerm: string = useAppSelector((state) => state.search.searchTerm); // current search from store
  const sortField: UsersSortField = useAppSelector(
    (state) => state.users.sortField
  ); // current sort field from store
  const theme: Theme = useAppSelector((state) => state.theme.mode); // current theme mode

  const [localSearchTerm, setLocalSearchTerm] = useState<string>(searchTerm); // local search input value
  const debouncedSearchTerm: string = useDebounce<string>(
    localSearchTerm,
    SEARCH_DEBOUNCE_DELAY
  ); // search value after debounce delay

  // Send debounced value to store
  useEffect((): void => {
    dispatch(setSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  // Sync input field with store value
  useEffect((): void => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Keep user input in local state (before debouncing to store)
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLocalSearchTerm(event.target.value);
  };

  // Save sort selection to store
  const handleSortChange = (event: SelectChangeEvent<string>): void => {
    dispatch(setSortField(event.target.value as UsersSortField));
  };

  // Clear search from input and store
  const handleClearSearch = (): void => {
    setLocalSearchTerm("");
    dispatch(setSearchTerm(""));
  };

  return (
    <nav className="toolbar" aria-label="Users search and sort controls">
      <div className="toolbar__field">
        <TextField
          key={theme}
          id="user-search"
          label={SEARCH_LABEL}
          placeholder={SEARCH_PLACEHOLDER}
          value={localSearchTerm}
          onChange={handleSearchChange}
          fullWidth
          variant="outlined"
          className="toolbar__input"
          autoComplete="off"
          slotProps={{
            input: {
              endAdornment: localSearchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClearSearch}
                    edge="end"
                    size="small"
                    aria-label="Clear search"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </div>

      <div className="toolbar__field">
        <FormControl fullWidth className="toolbar__select">
          <InputLabel id="user-sort-label">{SORT_LABEL}</InputLabel>
          <Select
            key={theme}
            labelId="user-sort-label"
            id="user-sort"
            value={sortField}
            label={SORT_LABEL}
            onChange={handleSortChange}
          >
            {SORT_OPTIONS.flatMap((group) => [
              <ListSubheader key={group.groupLabel}>
                {group.groupLabel}
              </ListSubheader>,
              ...group.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              )),
            ])}
          </Select>
        </FormControl>
      </div>
    </nav>
  );
};
