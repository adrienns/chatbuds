import "./IntroText.css";
import React, { useState } from "react";

const IntroText = () => {
  return (
    <div className="introtext-wrapper">
      <div>
        <p>
          Do you remember when you just logged into a chatroom and started
          taking part in a conversation with friendly randomers? Did you just
          enjoy watching the chat flow and you occasionally jumped in?{" "}
          <strong>ChatBuds</strong> tries to bring these good memories back. :)
          Please keep the conversation clean, respect each others. The most
          important is to have fun!
        </p>
        <br></br>
        <p>
          All you need to do is to write your name here and you are all set!
        </p>
      </div>
    </div>
  );
};

export default IntroText;
