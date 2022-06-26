import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { NextSeo } from "next-seo";

import Content from "components/Card/Content";
import Main from "components/Layout/Container";
import Navbar from "components/Layout/Navbar";
import { VIEW_ALL_POST } from "libs/constant";
import type IPageInfo from "types/IPageInfo";
import type IPost from "types/IPost";

type IData = {
  pageInfo: IPageInfo;
  posts: IPost[];
};

type Data = {
  status_code: number;
  message: string;
  data: IData;
  error: string;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const url = VIEW_ALL_POST(1, 10, "created_at", "desc");
  const res = await fetch(url);
  const data: Data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const isError = data.status_code !== 200 ? data.error : null;
  const datainjected = data as Data;
  return (
    <>
      <NextSeo title="Home" />
      <Main>
        <Navbar />
        <Box justifyContent="center" alignItems="center" minH="800px">
          {isError ? (
            <Text>Something went wrong...</Text>
          ) : (
            <SimpleGrid columns={[1, 1, 2, 3]} spacing={8}>
              {datainjected.data.posts === null ? (
                <Text>No posts yet...</Text>
              ) : (
                <>
                  {datainjected.data.posts.map((post) => (
                    <Content
                      author={post.user.username}
                      time={post.created_at}
                      body={post.body}
                      href={`/post/${post.id}`}
                    />
                  ))}
                </>
              )}
            </SimpleGrid>
          )}
        </Box>
      </Main>
    </>
  );
};

export default Home;
