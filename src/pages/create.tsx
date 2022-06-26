import {
  Box,
  Button,
  Heading,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useRef } from "react";

import Main from "components/Layout/Container";
import Navbar from "components/Layout/Navbar";
import useAuth from "hooks/useAuth";
import { CREATE_POST_ENDPOINT } from "libs/constant";

const CreatePage: NextPage = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const joinRef = useRef<HTMLSelectElement>(null);

  const toast = useToast();
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.assign("/auth/login");
    }
  });

  const onSubmit = async () => {
    const text = textRef.current?.value;
    const join = joinRef.current?.value;

    if (!text || !join) {
      return toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    const res = await fetch(CREATE_POST_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        body: text,
        is_joinable: join === "yes",
      }),
    });

    const data = await res.json();

    if (res.status === 200 || res.status === 201) {
      toast({
        title: "Success",
        description:
          "Post created successfully, youll be redirected to the home page",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      return setTimeout(() => {
        window.location.assign("/");
      }, 2000);
    }

    return toast({
      title: "Something went wrong",
      description: data?.error,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <NextSeo title="Create Post" />
      <Main>
        <Navbar />
        <Box minH="800px">
          <Stack direction="column" spacing="6">
            <Heading fontSize="xl" color="gray.600">
              Create post
            </Heading>
            <Textarea
              h="30vh"
              placeholder="Type your idea here..."
              ref={textRef}
            />
            <Select ref={joinRef} placeholder="Is it joinable?">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
            <Button
              color="white"
              bg="brand"
              _hover={{ color: "black", bgColor: "gray.100" }}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Main>
    </>
  );
};

export default CreatePage;
