import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
      <motion.div
        style={{
          height: "80vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          w={"170vw"}
          h={"80vh"}
          objectFit={"contain"}
          src={
            "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3J5cHRvY3VycmVuY3l8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          }
        ></Image>
      </motion.div>

      <Text
        fontSize={"7xl"}
        textAlign={"center"}
        fontWeight={"extrabold"}
        color={"whiteAlpha.800"}
        mt={"10px"}
        zIndex={"10"}
        fontFamily={"Bebas Neue"}
        letterSpacing={"widest"}
      >
        WELCOME TO COINHUB!
      </Text>
    </Box>
  );
};

export default Home;
