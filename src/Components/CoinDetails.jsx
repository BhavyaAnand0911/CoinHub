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
  Progress,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../index";
import Chart from "./Chart.jsx";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState([]);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const param = useParams();
  const id = param.id;

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(`${server}/coins/${id}`);

      // so as to make the chart re-render when ever the currenct of days is changed.
      const { data: chartData } = await axios.get(
        `${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      setCoin(data);

      setChartArray(chartData.prices);
      setLoading(false);
    };
    fetchCoin();
  }, [id, days, currency]);

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);

        break;
      case "7d":
        setDays("7d");
        setLoading(true);

        break;
      case "14d":
        setDays("14d");
        setLoading(true);

        break;
      case "30d":
        setDays("30d");
        setLoading(true);

        break;
      case "60d":
        setDays("60d");
        setLoading(true);

        break;
      case "200d":
        setDays("200d");
        setLoading(true);

        break;
      case "365d":
        setDays("365d");
        setLoading(true);

        break;
      case "max":
        setDays("max");
        setLoading(true);

        break;

      default:
        break;
    }
  };
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} borderWidth={1} marginTop={"10"}>
            {/* rendering the chart component by passing all the required values */}
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>
          <HStack p={"4"} wrap={"wrap"} marginTop={"5"} overflowX={"auto"}>
            {btns.map((i) => {
              return (
                <Button key={i} onClick={() => switchChartStats(i)}>
                  {i}
                </Button>
              );
            })}
          </HStack>
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
              w={"100px"}
              h={"100px"}
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
              fontSize={"2xl"}
              alignSelf={"flex-start"}
              marginLeft={"13px"}
            >{`#${coin.market_cap_rank}`}</Badge>

            <CoustumBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />
            <Box w={"full"} p={"5"}>
              <Item
                title={"Max Supply"}
                value={coin.market_data.max_supply}
              ></Item>
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              ></Item>
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              ></Item>
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              ></Item>
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              ></Item>
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const CoustumBar = ({ high, low }) => {
  return (
    <>
      <VStack w={"full"}>
        <Progress value={50} colorScheme={"teal"} w={"full"}></Progress>
        <HStack justifyContent={"space-between"} w={"full"}>
          <Badge children={low} color={"red"}></Badge>
          <Text fontSize={"sm"}>24Hr Range</Text>
          <Badge children={high} color={"green"}></Badge>
        </HStack>
      </VStack>
    </>
  );
};

const Item = ({ title, value }) => {
  return (
    <>
      <HStack w={"full"} justifyContent={"space-between"} my={"5"}>
        <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
          {title}
        </Text>
        <Text>{value}</Text>
      </HStack>
    </>
  );
};

export default CoinDetails;
