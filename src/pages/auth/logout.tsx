import { Box, Center, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import Main from "components/Layout/Container";
import Navbar from "components/Layout/Navbar";
import useAuth from "hooks/useAuth";

const LogoutPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    useAuth.setState({
      isAuthenticated: false,
      exp: 0,
      token: "",
    });

    setIsLoading(false);
    setTimeout(() => {
      window.location.assign("/");
    }, 1000);
  }, [setIsLoading]);

  return (
    <>
      <NextSeo title="Logout" />
      <Main>
        <Navbar />
        <Box my="10%" mx="auto" minH="800px">
          <Stack direction="column" spacing="12">
            <Heading textAlign="center">Logout</Heading>
            <Center>
              {isLoading ? (
                <Stack
                  direction="column"
                  textAlign="center"
                  alignItems="center"
                  justifyContent="center"
                  spacing="8"
                >
                  <Spinner size="xl" />
                  <Text fontSize="2xl">Please wait...</Text>
                </Stack>
              ) : (
                <Text>Youll be redirected soon</Text>
              )}
            </Center>
          </Stack>
        </Box>
      </Main>
    </>
  );
};

export default LogoutPage;
