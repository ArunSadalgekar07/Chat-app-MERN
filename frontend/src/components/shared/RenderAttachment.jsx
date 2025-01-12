import React from "react";
import { transformImage } from "../../lib/features";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";

const RenderAttachment = (file, url) => {
  switch (file) {
    case "video":
      return (
        <video
          src={url}
          preload="none"
          width={"200px"}
          controls
          style={{
            border: "2px solid #4CAF50",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      );

    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt="Attachment"
          width={"200px"}
          height={"150px"}
          style={{
            objectFit: "contain",
            border: "2px solid #2196F3",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      );

    case "audio":
      return (
        <audio
          src={url}
          preload="none"
          controls
          style={{
            border: "2px solid #FF5722",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      );

    default:
      return (
        <FileOpenIcon
          style={{
            fontSize: "48px",
            color: "#9E9E9E",
          }}
        />
      );
  }
};

export default RenderAttachment;
