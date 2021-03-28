import React, { createContext, useState } from "react";

export const ChatContext = createContext();

const ChatProvider = (props) => {
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [name, setName] = useState("");

  const handleUserName = (value) => {
    setName(value);
  };

  return (
    <ChatContext.Provider
      value={{ chatIsOpen, name, setChatIsOpen, handleUserName }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

const ChatConsumer = ChatContext.Consumer;

export { ChatProvider, ChatConsumer };
