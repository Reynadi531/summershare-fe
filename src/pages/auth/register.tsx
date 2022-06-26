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
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import Main from "components/Layout/Container";
import Navbar from "components/Layout/Navbar";
import { REGISTER_ENDPOINT } from "libs/constant";

const RegisterPage: NextPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isSubmit, setIsSubmit] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !username || !password) {
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

    const data = await fetch(REGISTER_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsSubmit(false);

    if (data.status === 200) {
      toast({
        title: "Success",
        description:
          "You have successfully registered. Youll be redirected to login page in a few seconds",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setTimeout(() => {
        router.push("/auth/login");
      }, 5000);
    } else {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <NextSeo title="Register" />
      <Main>
        <Navbar />
        <Box my="10%" mx="auto" maxH="800px" maxW="500px">
          <Heading
            color="brand"
            fontFamily="Bungee"
            fontWeight="medium"
            textAlign="center"
          >
            Register
          </Heading>
          <FormControl>
            <Stack spacing="4" direction="column">
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                placeholder="Email"
                id="email"
                type="email"
                ref={emailRef}
              />
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
                Register
              </Button>
            </Stack>
          </FormControl>
        </Box>
      </Main>
    </>
  );
};

export default RegisterPage;
