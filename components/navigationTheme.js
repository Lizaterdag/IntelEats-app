import { DefaultTheme } from '@react-navigation/native';
import { theme } from './theme'; // Import your custom theme

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary, // Use your primary color
    background: theme.colors.background, // Use your background color
    card: theme.colors.background, // Background color for header and tab bars
    text: theme.colors.text, // This sets the default text color
    // You can continue mapping your theme colors to navigation theme colors as needed
  },
};
