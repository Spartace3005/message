import "./App.scss";
import React from "react";
import { useState, useContext } from "react";
import { InputContext } from "./components/inputContext";
import Button from "@mui/material/Button";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import Messages from "./components/Messages";
import Input from "./components/Input";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const messages = useContext(InputContext);
  const buttonClick = () => {
    handleOpen();
    messages.mess();
  };
  return (
    <div className="App">
      <div className="livechat">
        <Button onClick={buttonClick} className="header-icon">
          <ChatIcon sx={{ fontSize: 40 }} />
        </Button>
        {open && (
          <div className="modal">
            <div className="header">
              <div>Chat GPT</div>
              <div onClick={handleClose} className="close">
                <CloseIcon fontSize="large" className="close-icon" />
              </div>
            </div>
            <Messages />
            <Input />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
