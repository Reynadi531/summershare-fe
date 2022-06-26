import { Box, Button, IconButton, Stack, Text } from "@chakra-ui/react";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { MdOutlineArrowBackIos } from "react-icons/md";

import Main from "components/Layout/Container";
import Navbar from "components/Layout/Navbar";
import { VIEW_POST_ENDPOINT } from "libs/constant";
import type IPost from "types/IPost";

interface IParams {
  id: string;
}

type Data = {
  status_code: number;
  message: string;
  data: IPost;
  error: string;
};

const PostDetail: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const dataWithType = data as Data;
  return (
    <>
      <NextSeo title="Post detail" />
      <Main>
        <Navbar />
        <Box minH="800px">
          {dataWithType.status_code === 404 ? (
            <Text>Not found</Text>
          ) : (
            <Box maxW="container.lg" mx="auto">
              <Stack direction="row">
                <Stack spacing="4" alignItems="center" flex="1" direction="row">
                  <IconButton
                    aria-label="back"
                    icon={<MdOutlineArrowBackIos />}
                    onClick={() => router.back()}
                  />
                  <Text color="gray.600">
                    {dataWithType.data.user.username}
                  </Text>
                </Stack>
                <Box>
                  <Text color="gray.600">
                    {new Date(dataWithType.data.created_at).toDateString()}
                  </Text>
                </Box>
              </Stack>
              <Box
                borderColor="gray.500"
                borderWidth="1px"
                minH="500px"
                my="4"
                p="4"
                rounded="lg"
              >
                <Text textAlign="justify">{dataWithType.data.body}</Text>
              </Box>
              <Stack direction="row">
                <Box flex="1">
                  <Button
                    as="a"
                    w="100px"
                    color="white"
                    bg="brand"
                    _hover={{ color: "black", bgColor: "gray.100" }}
                    href={`mailto:${
                      dataWithType.data.user.email
                    }?subject=Hey i want to join this idea&body=Hey i found this on summer share, i want to join this idea. ${window.location.toString()}`}
                  >
                    Join
                  </Button>
                </Box>
              </Stack>
            </Box>
          )}
        </Box>
      </Main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { id } = ctx.params as unknown as IParams;
  const res = await fetch(VIEW_POST_ENDPOINT(id));
  const data: Data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default PostDetail;
