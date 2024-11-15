import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import config from "@/postcss.config.mjs";
import "@/styles/globals.css";

// Define the custom theme
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  components: {
    // Customize the Button component globally
    Button: {
      baseStyle: {
        _hover: {
          backgroundColor: "red.600", // Adjust the hover color for Button
          opacity: 0.9, // Optional: to adjust opacity on hover
        },
      },
    },
    // Customize the Input component globally
    Input: {
      baseStyle: {
        _hover: {
          backgroundColor: "gray.600", // Adjust the hover color for Input
        },
      },
    },
    // Customize the Select component globally
    Select: {
      baseStyle: {
        _hover: {
          backgroundColor: "red.900", // Adjust the hover color for Select
        },
      },
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
