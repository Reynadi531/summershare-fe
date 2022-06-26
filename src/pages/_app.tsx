import "@fontsource/inter";
import { ChakraProvider } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";

import defaultSeoConfig from "../../next-seo.config";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <NextSeo {...defaultSeoConfig} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
