import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index.js";
import {
  Container,
  HStack,
  Heading,
  Image,
  VStack,
  Text,
} from "@chakra-ui/react";
import Loader from "./Loader.jsx";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    const fetchExchanges = async () => {
      const { data } = await axios.get(`${server}/exchanges`);
      setExchanges(data);
      setLoading(false);
      //console.log(data);
    };
    fetchExchanges();
  }, []);
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => {
              return (
                <ExchangeCard
                  key={i.id}
                  name={i.name}
                  image={i.image}
                  rank={i.trust_score_rank}
                  url={i.url}
                />
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, image, rank, url }) => {
  return (
    <a href={url} target="blank">
      <VStack
        bgColor={"blue.100"}
        w={"40"}
        p={"10"}
        shadow={"xl"}
        borderRadius={"2xl"}
        transition={"all 0.2s"}
        m={"5"}
        marginTop={"10"}
        css={{
          "&:hover": {
            transform: "scale(1.2)",
          },
        }}
      >
        <Image src={image} w={"10"} h={"10"} objectFit={"contain"}></Image>
        <Heading size={"md"} noOfLines={1}>
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
