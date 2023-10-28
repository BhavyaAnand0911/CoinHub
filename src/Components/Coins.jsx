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
  Button,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Loader from "./Loader.jsx";
import { Link } from "react-router-dom";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState([]);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"; // use if else instead of this for better readability
  useEffect(() => {
    const fetchCoins = async () => {
      const { data } = await axios.get(
        `${server}/coins/markets?vs_currency=${currency}&page=${page}`
      );
      setCoins(data);
      // here loading is set to false because as soon as the data will be fetched the loader has to dissapear
      setLoading(false);
      //console.log(data);
    };
    fetchCoins();
  }, [currency, page]);

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1); // creating an array and filling all with 1

  return (
    <Container maxW={"container.xl"}>
      {/* if loading is true loader will be renderd else the content */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"5"}>
            <HStack spacing={"5"}>
              <Radio value="inr">INR</Radio>
              <Radio value="eur">EUR</Radio>
              <Radio value="usd">USD</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => {
              return (
                <CoinCard
                  key={i}
                  name={i.name}
                  id={i.id}
                  image={i.image}
                  symbol={i.symbol}
                  price={i.current_price}
                  currencySymbol={currencySymbol}
                />
              );
            })}
          </HStack>
          <HStack w={"full"} overflowX={"auto"} p={"10"}>
            {btns.map((item, index) => {
              return (
                <Button
                  key={item}
                  bgColor={"blackAlpha.800"}
                  color={"white"}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </Button>
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

const CoinCard = ({ id, name, image, symbol, price, currencySymbol = "₹" }) => {
  return (
    <Link to={`/coin/${id}`} target="blank">
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
        <Heading size={"md"} noOfLines={2}>
          {symbol}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
      </VStack>
    </Link>
  );
};

export default Coins;
