import {
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../index";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState([]);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const param = useParams();
  const id = param.id;

  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(`${server}/coins/${id}`);
      setCoin(data);
      setLoading(false);
      console.log(data);
    };
    fetchCoin();
  }, [id]);

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/*Chart Updations*/}
          <Box width={"full"} borderWidth={1}>
            BOX
          </Box>
          <RadioGroup value={currency} onChange={setCurrency} p={"5"}>
            <HStack spacing={"5"}>
              <Radio value="inr">INR</Radio>
              <Radio value="eur">EUR</Radio>
              <Radio value="usd">USD</Radio>
            </HStack>
          </RadioGroup>
          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
              Last Updated On :{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image
              src={coin.image.large}
              w={"20"}
              h={"20"}
              objectFit={"contain"}
            ></Image>

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge
              bgColor={"blackAlpha.800"}
              color={"white"}
              fontSize={"3xl"}
            >{`#${coin.market_cap_rank}`}</Badge>
          </VStack>
        </>
      )}
    </Container>
  );
};

export default CoinDetails;
