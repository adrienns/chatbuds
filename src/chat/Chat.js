import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import { ChatContext } from "../ContextAPI";
import axios from "axios";
import "./Chat.css";
import Participants from "./Participants";
import ChatMessage from "./ChatMessage";
import { random_color } from "../randomColors.js";
import ScrollToBottom from "../ScrollToBotttom";
import { API_URL } from "../utils/constants";
const socket = io.connect(`${API_URL}`);

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const { name } = useContext(ChatContext);

  console.log(messages);

  const fetchChatHistory = () => {
    axios.get(`${API_URL}/api/chats`).then(
      (res) => setMessages(res.data),

      (error) => {
        console.log(error);
      }
    );
  };

  const fetchUsers = () => {
    console.log("fetch users");
    axios.get(`${API_URL}/api/users`).then((res) => setUsers(res.data));
    console.log(users);
  };

  // const getMaximumId = () => {
  //   if (messages) {
  //     const { messageId } = messages[messages.length - 1];
  //     return messageId;
  //   }
  //   return 0;
  // };

  useEffect(() => {
    // axios
    // .post("http://localhost:9000/api/join", { name, random_color })
    // .then((res) => {
    //   fetchChatHistory();
    //   fetchUsers();
    //   console.log("joining");
    // });
    socket.emit("join", { name, random_color }, (error) => {
      fetchChatHistory();
      fetchUsers();
      console.log("joining");
      if (error) {
        console.log(error);
      }
    });
  }, [name]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
      if (message.shouldFetchUsers) {
        fetchUsers();
      }
    });
  }, [messages]);

  const handleChatText = (event) => {
    const value = event.target.value;

    setMessage(value);
  };

  const submitChatText = (event) => {
    event.preventDefault();
    // const mostRecentId = getMaximumId();
    // const chatObject = { text, name, mostRecentId };
    if (name) {
      socket.emit("sendMessage", message, name, () => setMessage(""));
    }
  };

  // const appendToDisplayedText = (elementsToAppend) => {
  //   const mergedText = message.concat(elementsToAppend);
  //   setMessage(mergedText);
  // };

  return (
    <div className="chat-window-container">
      <div className="chat-window-inner-container">
        <div className="chat-window-participants">
          <h4 className="participants-text">participants</h4>{" "}
          <div className="participants_name">
            {messages.length === 0
              ? null
              : users.map((el, index) => (
                  <Participants el={el} index={index} />
                ))}
          </div>
        </div>
        <form onSubmit={submitChatText} className="chat-window-body">
          <div className="chat-text">CHAT ROOM</div>

          <div className="chat-body">
            {messages &&
              messages.map((el, index) => (
                <ChatMessage el={el} index={index} />
              ))}
            <ScrollToBottom />
          </div>

          <div className="massage-submit">
            <input
              className="chat-text-bar"
              type="text"
              value={message}
              onChange={handleChatText}
              name="name"
              placeholder="write your message here..."
              required
              autoComplete="off"
            />
            <button className="chat-bar-btn" type="submit">
              SEND
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
