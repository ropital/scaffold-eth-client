import {
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Header } from "components/Header/Header";
import { useWalletContext } from "context/WalletProvider";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const wallet = useWalletContext();
  const toast = useToast();
  const [cid, setCid] = useState("");
  const [txPending, setTxPending] = useState(false);

  console.log("wallet", wallet);

  const mint = async () => {
    if (!wallet.nftContract) return;

    try {
      setTxPending(true);
      const tx = await wallet.nftContract.mint(cid);
      await tx.wait();
      setTxPending(false);

      toast({
        status: "success",
        title: "Success!",
      });
    } catch (error) {
      console.log(error);
      toast({
        status: "error",
        title: "Failure",
      });
      setTxPending(false);
    }
  };

  return (
    <Box>
      <Header {...wallet} />
      <Box pt="70px" w="50%" margin="0 auto">
        <Heading mb="30px">Create your NFT</Heading>
        <FormLabel>cid of file in pinata</FormLabel>
        <Input onChange={(event) => setCid(event.target.value)} />
        <Button mt="30px" w="100%" onClick={mint} isLoading={txPending}>
          Mint
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
