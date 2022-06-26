import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRef, useState } from "react";

import Main from "components/Layout/Container";
import Navbar from "components/Layout/Navbar";
import useAuth from "hooks/useAuth";
import { LOGIN_ENDPOINT } from "libs/constant";

const LoginPage: NextPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isSubmit, setIsSubmit] = useState(false);

  const toast = useToast();

  const onSubmit = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please fill all the fields",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setIsSubmit(true);

    const data = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsSubmit(false);

    const dataJson = await data.json();

    if (data.status === 200) {
      useAuth.setState({
        isAuthenticated: true,
        token: dataJson.data.token,
        exp: dataJson.data.exp,
      });

      setTimeout(() => {
        window.location.assign("/");
      }, 1000);
    } else {
      if (dataJson?.error === "invalid password") {
        toast({
          title: "Error",
          description: "Wrong password",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: "Something went wrong",
        description: dataJson?.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <NextSeo title="Login" />
      <Main>
        <Navbar />
        <Box my="10%" mx="auto" maxH="800px" maxW="500px">
          <Heading
            color="brand"
            fontFamily="Bungee"
            fontWeight="medium"
            textAlign="center"
          >
            Login
          </Heading>
          <FormControl>
            <Stack spacing="4" direction="column">
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                id="username"
                type="text"
                ref={usernameRef}
              />
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                id="password"
                type="password"
                ref={passwordRef}
              />
              <Button isLoading={isSubmit} onClick={onSubmit}>
                Login
              </Button>
            </Stack>
          </FormControl>
        </Box>
      </Main>
    </>
  );
};

export default LoginPage;
