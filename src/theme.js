import { createMuiTheme } from "@material-ui/core/styles";

const rk = {
  fontFamily: "Recipe Korea",
  src: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/Recipekorea.woff') format('woff')`,
  fontWeight: "normal",
  fontStyle: "normal",
};

const theme = createMuiTheme({
  typography: {
    fontFamily: "Recipe Korea",
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#2196f3",
      light: "#4dabf5",
      dark: "#1769aa",
      contrastText: "#fff",
    },
  },
  breakpoints: {
    values: {
      xs: 350,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [rk],
      },
    },
  },
});

export default theme;
