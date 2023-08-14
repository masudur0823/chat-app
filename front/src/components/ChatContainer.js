import React, { useState, useEffect, useRef } from "react";
import { IconButton, Avatar, Box, InputBase, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import http from "../utils/http";
import { formatDate } from "../helpers/dateHelpers";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { CustomButton2 } from "../assets/styles/buttons";

function ChatContainer({ contact }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // dummy messages start
  // ------------------------
  useEffect(() => {
    setMessages([
      {
        text: "hi boss",
        incoming: false,
        contactId: 1234,
        channel: "ddd1",
        createdAt: "2023-08-10T12:00",
      },
      {
        text: "hi boss",
        incoming: false,
        contactId: 1234,
        channel: "ddd1",
        createdAt: "2023-08-11T12:00",
      },
      {
        text: "yea",
        incoming: true,
        contactId: 1233,
        channel: "ddd1",
        createdAt: "2023-08-11T12:00",
      },
      {
        text: "How are you?",
        incoming: true,
        contactId: 1233,
        channel: "ddd1",
        createdAt: "2023-08-11T12:00",
      },
      {
        text: "good, Dit you see the project?",
        incoming: false,
        contactId: 1234,
        channel: "ddd1",
        createdAt: "2023-08-11T12:00",
      },
      {
        text: "is everything is ok",
        incoming: false,
        contactId: 1234,
        channel: "ddd1",
        createdAt: "2023-08-11T12:00",
      },
      {
        text: "yea, nice",
        incoming: true,
        contactId: 1233,
        channel: "ddd1",
        createdAt: "2023-08-11T12:00",
      },
    ]);
  }, []);
  // dummy messages start
  // ------------------------

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = (e) => {
    const { scrollTop } = e.currentTarget;

    if (scrollTop === 0 && !isLoading) {
      fetchMoreMessages();
    }
  };

  const fetchMoreMessages = () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage + 1);

    http
      .get(`/messages/${contact.id}`, { params: { page } })
      .then((response) => {
        const messagesData = response.data.map((msg) => ({
          ...msg,
          incoming: msg.incoming ?? true,
        }));
        setMessages((prevMessages) => [...messagesData, ...prevMessages]);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    http
      .get(`/messages/${contact.id}`)
      .then((response) => {
        const messagesData = response.data.map((msg) => ({
          ...msg,
          incoming: msg.incoming ?? true,
        }));
        setMessages(messagesData);
      })
      .catch((error) => console.error("Error:", error));
  }, [contact.id]);

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    http
      .post("/messages", {
        text: message,
        incoming: false,
        contactId: contact.id,
        channel: contact.channel,
      })
      .then(() => {
        setMessages([
          ...messages,
          { text: message, incoming: false, createdAt: new Date() },
        ]);
      })
      .catch((error) => {
        console.error("Error:", error);

        if (error.response && error.response.status === 403) {
          alert("Your subscription is not valid");
        }
      });

    setMessage("");
  };

  const handleSendFile = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*"; // Specify the file types you want to allow

    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      const formData = new FormData();

      formData.append("file", file);
      formData.append("contactId", contact.id);
      formData.append("channel", contact.channel);

      http
        .post("/messages/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          // Handle success
          console.log("File sent successfully");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    fileInput.click();
  };

  const addEmoji = (emojiObj) => {
    const emoji = emojiObj.native;
    setMessage((message) => message + emoji);
  };

  return (
    <>
      <Box ref={messagesContainerRef} className="chat-right-body">
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: msg.incoming ? "flex-start" : "flex-end",
              marginTop: 3,
              gap: 1,
            }}
          >
            {/* Display the date above the message */}
            <Typography
              sx={{ fontSize: 15, fontWeight: 300, color: "#818E94" }}
            >
              {formatDate(msg.createdAt)}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: msg.incoming ? "row" : "row-reverse",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Avatar
                sx={{
                  fontWeight: 500,
                  background: "#fff",
                  color: "primary.main",
                  border: "1px solid rgba(20, 133, 255, 0.10)",
                }}
              >
                {contact.name[0].toUpperCase()}
              </Avatar>
              <div
                style={{
                  marginLeft: msg.incoming ? "10px" : "0",
                  marginRight: msg.incoming ? "0" : "10px",
                  backgroundColor: msg.incoming ? "#fff" : "#fff",
                  color: msg.incoming ? "#001F2B" : "#001F2B",
                  borderRadius: 10,
                  padding: "5px 15px",
                  maxWidth: "70%",
                  wordBreak: "break-word",
                }}
              >
                {msg.incoming && (
                  <Typography color="primary" sx={{ fontWeight: "bold" }}>
                    {contact.name}
                  </Typography>
                )}
                {/* Check if the message type is image */}
                {msg.type === "image" ? (
                  <a
                    href={`http://localhost:3000${msg.text}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`http://localhost:3000${msg.text}`}
                      alt="sent content"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        window.open(
                          `http://localhost:3000${msg.text}`,
                          "_blank"
                        )
                      }
                    />
                  </a>
                ) : (
                  <Typography sx={{ fontWeight: 300 }}>{msg.text}</Typography>
                )}
              </div>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box className="chat-right-footer">
        {/* Add the emoji button here */}

        {/* my--- */}

        {showEmojiPicker && <Picker data={data} onEmojiSelect={addEmoji} />}

        <Box className="suggestionBox">
          <CustomButton2 variant="contained" color="primary2">
            How are you?
          </CustomButton2>
          <CustomButton2 variant="contained" color="primary2">
            Can we talk now?
          </CustomButton2>
          <CustomButton2 variant="contained" color="primary2">
            Are you available now?
          </CustomButton2>
          <CustomButton2 variant="contained" color="primary2">
            Add New Quick Answer
          </CustomButton2>
        </Box>

        <Box className="chat-input-container">
          <Box className="chat-input-inner">
            <InputBase
              multiline
              placeholder="Write Here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Box className="beside-chat-input">
              <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                😀
              </IconButton>

              <IconButton onClick={handleSendFile}>
                <AttachFileIcon />
              </IconButton>
              <IconButton
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <SendIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ChatContainer;
