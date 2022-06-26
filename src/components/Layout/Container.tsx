import { Container } from "@chakra-ui/react";
import type React from "react";

interface IContainerProps {
  children: React.ReactNode;
}

const Main: React.FC<IContainerProps> = ({ children }) => {
  return <Container maxW="container.xl">{children}</Container>;
};

export default Main;
