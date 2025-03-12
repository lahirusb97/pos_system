import { yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#448aff",
        },
        secondary: {
          main: yellow[600],
        },
      },
    },
  },
  typography: {
    button: {
      textTransform: "capitalize",
    },
  },
});

export default theme;
