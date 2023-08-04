import React from "react";
import { useState, createContext } from "react";
import axiosCreate from "../API/createAPI";
import axios from "axios";
import Input from "antd/es/input/Input";

interface InputContextProps {
  loading : boolean
  input: string;
  message: any;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<any>>;
  handleSendBtn: () => void;
  mess: () => void;
}

const InputContext = createContext<InputContextProps>({
  loading: false,
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
  const [loading , setLoading] = useState<boolean>(false)
  const mess = async () => {
    const inputMess = await axios({
      url: "https://server-nestjs.up.railway.app/chat",
      method: "POST",
    });
    setMessage(inputMess.data.reverse());
    console.log(inputMess.data);
  };

  const handleSendBtn = async () => {
    setMessage([...message, {content: input , role :'user'}]);
    setInput("");
    setLoading (true)
    const sendMessage = await axios({
      url: "https://server-nestjs.up.railway.app/chat/send",
      method: "POST",
      data: { 
        id:"40f53f47-9e77-44c1-ad50-3cb2447b3b5f",
        content: input,
      },
    });
    setLoading(false)
    setMessage([...message, {content: input , role :'user'},{content: sendMessage.data , role : "assistant"}]);
    console.log(sendMessage);
  };

  const inputValue: InputContextProps = {
    loading,
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
