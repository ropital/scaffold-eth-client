import { Center } from "@chakra-ui/react";
import { useWalletContext } from "context/WalletProvider";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const wallet = useWalletContext();

  console.log("wallet", wallet);

  return <Center h="100vh">Hello world</Center>;
};

export default Home;
