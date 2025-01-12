import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { transformImage } from "../../lib/features";

// Todo Transform
const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={1}>
      <AvatarGroup
        max={max}
        sx={{
          position: "relative",
          "& .MuiAvatar-root": {
            border: "2px solid white",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box width={"auto"} height={"auto"} display="flex" alignItems="center">
          {avatar.map((i, index) => (
            <Avatar
              key={index}
              src={transformImage(i)}
              alt={`Avatar ${index}`}
              sx={{
                width: "3rem",
                height: "3rem",
                marginLeft: index === 0 ? 0 : "-1rem",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                  zIndex: 1,
                },
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
