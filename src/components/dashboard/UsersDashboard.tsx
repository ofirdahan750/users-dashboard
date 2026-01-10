import { useEffect } from "react";
import { fetchUsers, selectFilteredUsers } from "../../store/usersSlice";
import {
  DASHBOARD_SUBTITLE,
  DASHBOARD_TITLE,
  EMPTY_SEARCH_TEXT,
  EMPTY_STATE_TEXT,
  THEME_TOGGLE_LIGHT_TEXT,
  THEME_TOGGLE_DARK_TEXT,
  THEME_TOGGLE_ARIA_LABEL,
} from "../../constants/texts";
import { THEME_LIGHT } from "../../constants/theme";
import { UsersToolbar } from "./UsersToolbar";
import { UsersList } from "./UsersList/UsersList";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toggleTheme } from "../../store/themeSlice";
import { LoadingState } from "../common/LoadingState";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";
import { Button } from "../common/Button";

export const UsersDashboard = () => {
  const dispatch = useAppDispatch();

  const filteredUsers = useAppSelector(selectFilteredUsers);
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const errorMessage = useAppSelector((state) => state.users.errorMessage);
  const users = useAppSelector((state) => state.users.users);
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  
  const theme = useAppSelector((state) => state.theme.mode);

  // Fetch users from the API when the component first loads
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);




  // Determine which empty message to show based on the current state:
  // - If there are no users at all and no search is active, show "No users found"
  // - If there's an active search but no results, show "No users match your search"
  const emptyMessage =
    !users.length && !searchTerm ? EMPTY_STATE_TEXT : EMPTY_SEARCH_TEXT;

  // Toggle between light and dark theme
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // Retry fetching users when error occurs
  const handleRetry = () => {
    dispatch(fetchUsers());
  };

  return (
    <div className={`app-root app-root--theme-${theme}`}>
      {isLoading && (
        <div className="app-root__loading-overlay">
          <div className="app-root__loading-spinner">
            <div className="app-root__loading-spinner-circle"></div>
          </div>
        </div>
      )}
      <header className="app-header">
        <section className="app-header__titles">
          <h1 className="app-header__title">{DASHBOARD_TITLE}</h1>
          <p className="app-header__subtitle">{DASHBOARD_SUBTITLE}</p>
        </section>

        <nav className="app-header__actions">
          <Button
            variant="secondary"
            onClick={handleThemeToggle}
            aria-label={THEME_TOGGLE_ARIA_LABEL}
          >
            {/* Show "Switch to Dark" when in light mode, "Switch to Light" when in dark mode */}
            {theme === THEME_LIGHT
              ? THEME_TOGGLE_LIGHT_TEXT
              : THEME_TOGGLE_DARK_TEXT}
          </Button>
        </nav>
      </header>

      {/* Main content area of the dashboard */}
      <main className="app-main">
        <section className="app-main__panel">
          {/* Toolbar with search and sort controls - always visible */}
          <UsersToolbar />

          {/* Show loading spinner while fetching users from the API */}
          {isLoading && <LoadingState />}

          {/* If loading finished but there was an error, show error message with retry button */}
          {!isLoading && errorMessage && (
            <ErrorState onRetry={handleRetry} />
          )}

          {/* If no error and no users found, show empty state message */}
          {!isLoading && !errorMessage && !filteredUsers.length && (
            <EmptyState message={emptyMessage} />
          )}

          {/* If everything is good and we have users, display the list */}
          {!isLoading && !errorMessage && filteredUsers.length && (
            <UsersList users={filteredUsers} />
          )}
        </section>
      </main>
    </div>
  );
};
