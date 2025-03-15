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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // ✅ Ensure no uppercase globally for all buttons
        },
      },
    },
  },
});

export default theme;
