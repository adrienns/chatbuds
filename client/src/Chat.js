import React, { useEffect, useState, useContext, useRef } from "react";
import io from "socket.io-client";
import { ChatContext } from "./ContextAPI";
import axios from "axios";
import "./signin/SignIn.css";

const socket = io.connect("http://localhost:9000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const { name } = useContext(ChatContext);

  const bottomEl = useRef(null);

  const scrollToBottom = () => {
    bottomEl.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const color = () => {};

  const colors = [
    "#05f79d",
    "#f7f605",
    "#38f705",
    "#00ff00",
    "#fbec07",
    "#04faed",
    "#fa7304",
    "#FFC000",
    "#00FFFF",
    "#F2FF66",
  ];
  let random_color = colors[Math.floor(Math.random() * colors.length)];

  const fetchChatHistory = () => {
    axios.get("http://localhost:9000/api/chats").then(
      (res) => setMessages(res.data),

      (error) => {
        console.log(error);
      }
    );
  };

  const fetchUsers = () => {
    console.log("fetch users");
    axios
      .get("http://localhost:9000/api/users")
      .then((res) => setUsers(res.data));
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
      scrollToBottom();
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
              : users.map((el, i) => (
                  <div className="participant-name-text" key={i}>
                    <span
                      style={{ background: el.random_color }}
                      className="participant-name-dot"
                    ></span>
                    <span> {el.name}</span>
                  </div>
                ))}
          </div>
        </div>
        <form onSubmit={submitChatText} className="chat-window-body">
          <div className="chat-text">CHAT ROOM</div>

          <div className="chat-body">
            {messages &&
              messages.map((el, index) => (
                <div className="chat-text-box" key={index}>
                  <span
                    className="user-name"
                    style={{ color: el.random_color }}
                  >
                    {el.name}
                  </span>{" "}
                  <span>{el.text}</span>
                </div>
              ))}
            <div ref={bottomEl} className="list-bottom"></div>
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
