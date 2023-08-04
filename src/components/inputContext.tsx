import React from "react";
import { useState, createContext } from "react";
import axiosCreate from "../API/createAPI";
import axios from "axios";
import Input from "antd/es/input/Input";

interface InputContextProps {
  input: string;
  message: any;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<any>>;
  handleSendBtn: () => void;
  mess: () => void;
}

const InputContext = createContext<InputContextProps>({
  input: "",
  message: "",
  setInput: () => {},
  setMessage: () => {},
  handleSendBtn: () => {},
  mess: () => {},
});

const InputProvider: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  const [input, setInput] = useState<string>("");
  const [message, setMessage] = useState<any>([]);
  const mess = async () => {
    const inputMess = await axios({
      url: "https://server-nestjs.up.railway.app/chat",
      method: "POST",
    });
    setMessage(inputMess.data);
    console.log(inputMess.data);
  };

  const handleSendBtn = async () => {
    setMessage([...message, {content: Input }]);

    setInput("");
    const sendMessage = await axios({
      url: "https://server-nestjs.up.railway.app/chat/send",
      method: "POST",
      data: {
        id:"40f53f47-9e77-44c1-ad50-3cb2447b3b5f",
        content: input,
      },
    });
    console.log(sendMessage);
  };

  const inputValue: InputContextProps = {
    input,
    message,
    setInput,
    setMessage,
    handleSendBtn,
    mess,
  };
  return (
    <InputContext.Provider value={inputValue}>{children}</InputContext.Provider>
  );
};
export { InputProvider, InputContext };
