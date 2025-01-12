import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constants/color";

const Home = () => {
  return (
    <Box bgcolor={"#f0f0f0"} height={"100vh"} display="flex" justifyContent="center" alignItems="center">
      <Typography p={"1rem"} variant="h5" color={"#333"}>
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
