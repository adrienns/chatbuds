import { ChatContext } from "../ContextAPI";
import React, { useContext } from "react";
import ChatWindow from "../chatwindow/ChatWindow";
import IntoText from "../IntroText";
import "./MainPage.css";

const MainPage = () => {
  const { chatIsOpen } = useContext(ChatContext);
  console.log(chatIsOpen);
  return (
    <div>
      <div
        className={chatIsOpen ? "mainpage-wrapper-closed" : "mainpage-wrapper"}
      >
        <div className="main-page-text-wrapper">
          <div className="main-page-text" data-text="Hi! Nice to meet you!">
            Hi! Nice to meet you!
          </div>
          <IntoText />
        </div>

        <div className="lines-wrapper">
          <div className="line-1 float">
            <h2 className="chatty"></h2>
          </div>
          <div className="line-2 float"></div>
          <div className="line-3 float"></div>
        </div>
      </div>
      <ChatWindow />
    </div>
  );
};

export default MainPage;
