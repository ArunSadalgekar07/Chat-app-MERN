import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "#DCF8C6" : "#FFFFFF",
        color: "#303030",
        borderRadius: "10px",
        padding: "1rem",
        maxWidth: "60%",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        marginBottom: "0.5rem",
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}

      {content && <Typography style={{ margin: "0.5rem 0" }}>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index} style={{ margin: "0.5rem 0" }}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "#1A73E8",
                  textDecoration: "none",
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"} style={{ marginTop: "0.5rem" }}>
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
