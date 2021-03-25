import "./App.css";
import { ChatProvider } from "./ContextAPI";
import MainPage from "./mainpage/MainPage";
import Chat from "./Chat";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
const App = () => {
  return (
    <ChatProvider>
      <Router>
        <div className="app">
          <Route path="/" exact component={MainPage} />
          <Route path="/chat" component={Chat} />
        </div>
      </Router>
    </ChatProvider>
  );
};

export default App;
