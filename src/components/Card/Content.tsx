import { Box, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import type React from "react";

type Props = {
  body: string;
  author: string;
  time: string;
  href: string;
};

const Content: React.FC<Props> = ({ body, author, time, href }) => {
  return (
    <Link href={href}>
      <Box
        _hover={{ cursor: "pointer" }}
        h="200px"
        bgColor="gray.100"
        p="4"
        rounded="lg"
      >
        <Stack h="100%" direction="column">
          <Box flex="1">
            <Text>{body}</Text>
          </Box>
          <Stack direction="row">
            <Box flex="1">
              <Text color="gray.600">{author}</Text>
            </Box>
            <Text color="gray.600">{new Date(time).toDateString()}</Text>
          </Stack>
        </Stack>
      </Box>
    </Link>
  );
};

export default Content;
