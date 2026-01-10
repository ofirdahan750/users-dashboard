import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { UsersDashboard } from "./components/dashboard/UsersDashboard";
import { THEME_LIGHT, THEME_DARK } from "constants";
import { useAppSelector } from "hooks";

const AppContent = () => {
  const theme = useAppSelector((state) => state.theme.mode);

  // setup mui theme
  const muiTheme = createTheme({
    palette: {
      mode: theme === THEME_LIGHT ? THEME_LIGHT : THEME_DARK, // set mui theme mode to light or dark
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <UsersDashboard />
    </MuiThemeProvider>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;
