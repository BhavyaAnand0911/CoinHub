import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <HStack
        p={"3"}
        shadow={"base"}
        bgColor={"blackAlpha.900"}
        justifyContent={"space-evenly"}
      >
        <Button
          w={"70px"}
          variant={"unstyled"}
          color={"white"}
          backgroundColor={"whiteAlpha.300"}
        >
          <Link to="/">Home</Link>
        </Button>
        <Button
          w={"70px"}
          variant={"unstyled"}
          color={"white"}
          backgroundColor={"whiteAlpha.300"}
        >
          <Link to="/coins">Coins</Link>
        </Button>
        <Button
          w={"98px"}
          variant={"unstyled"}
          color={"white"}
          backgroundColor={"whiteAlpha.300"}
        >
          <Link to="/exchanges">Exchanges</Link>
        </Button>
      </HStack>
    </div>
  );
};

export default Header;
