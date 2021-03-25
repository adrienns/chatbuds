import React, { useContext } from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";
import { ChatContext } from "../ContextAPI";

const SignIn = () => {
  const { handleUserName, name } = useContext(ChatContext);

  const handleName = (event) => {
    const value = event.target.value;
    handleUserName(value);
  };

  return (
    <div className="submit-name-container">
      <input
        className="your-name-bar"
        type="text"
        onChange={handleName}
        name="name"
        maxLength="20"
        placeholder="your name..."
      ></input>
      <Link
        onClick={(event) => (!name ? event.preventDefault() : null)}
        to={`/chat?name=${name}`}
      >
        <button className="chat-window-btn">SUBMIT </button>
      </Link>
    </div>
  );
};

export default SignIn;
