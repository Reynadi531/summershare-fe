import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type React from "react";
import "@fontsource/bungee/400.css";
import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";

import useAuth from "hooks/useAuth";

const Navbar: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setIsAuth(isAuthenticated);
  }, [setIsAuth, isAuthenticated]);

  const router = useRouter();
  return (
    <Flex h="20" justifyContent="center" alignItems="center">
      <Box flex="1">
        <Heading color="brand" fontWeight="medium" fontFamily="Bungee">
          <Link href="/">Summershare</Link>
        </Heading>
      </Box>
      <Box>
        {!isAuth ? (
          <Stack direction="row" spacing="6">
            <Button onClick={() => router.push("/auth/register")} px="8">
              Register
            </Button>
            <Button
              onClick={() => router.push("/auth/login")}
              px="8"
              color="white"
              bg="brand"
              _hover={{ color: "black", bgColor: "gray.100" }}
            >
              Login
            </Button>
          </Stack>
        ) : (
          <Stack
            direction="row"
            spacing="4"
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              aria-label="add"
              isRound
              color="white"
              bg="brand"
              _hover={{ color: "black", bgColor: "gray.100" }}
              icon={<BsPlusLg />}
              onClick={() => router.push("/create")}
            />
            <Button onClick={() => router.push("/auth/logout")} px="8">
              Logout
            </Button>
          </Stack>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
