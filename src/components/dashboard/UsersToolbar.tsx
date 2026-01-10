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
} from "../../constants/texts";
import { SORT_OPTIONS } from "../../constants/sortOptions";
import { SEARCH_DEBOUNCE_DELAY } from "../../constants/store";
import { setSortField } from "../../store/usersSlice";
import { setSearchTerm } from "../../store/searchSlice";
import type { AppDispatch, UsersSortField } from "../../types/store";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useDebounce } from "../../hooks/useDebounce";
import type { Theme } from "../../types/theme";

export const UsersToolbar = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const searchTerm: string = useAppSelector((state) => state.search.searchTerm);
  const sortField: UsersSortField = useAppSelector(
    (state) => state.users.sortField
  );
  const theme: Theme = useAppSelector((state) => state.theme.mode);

  const [localSearchTerm, setLocalSearchTerm] = useState<string>(searchTerm);
  const debouncedSearchTerm: string = useDebounce(
    localSearchTerm,
    SEARCH_DEBOUNCE_DELAY
  );

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    dispatch(setSortField(event.target.value as UsersSortField));
  };

  const handleClearSearch = () => {
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
