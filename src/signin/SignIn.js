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

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("djkfhfkdshhdkg");
  };

  return (
    <form className="submit-name-container" onSubmit={onSubmit}>
      <input
        className="your-name-bar"
        type="text"
        onChange={handleName}
        name="name"
        maxLength="20"
        placeholder="your name..."
        autoComplete="off"
      ></input>
      <Link
        onClick={(event) => (!name ? event.preventDefault() : null)}
        to={`/chat?name=${name}`}
      >
        <button type="submit" className="submit-btn">
          SUBMIT{" "}
        </button>
      </Link>
    </form>
  );
};

export default SignIn;
