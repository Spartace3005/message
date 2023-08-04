import React, { useMemo } from "react";
import { useContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { InputContext } from "./inputContext";

const Message: React.FC = () => {
  const newText = useContext(InputContext);
  const [messageTimestamps, setMessageTimestamps] = useState<Date[]>([]);

  useMemo(()=>{

  },[newText.message])

  useEffect(() => {
    // Update timestamps for each message when newText.message changes
    setMessageTimestamps((prevTimestamps) => [...prevTimestamps, new Date()]);
  }, [newText.message]);

  const formatTime = (date: Date): string => {
    return format(date, "HH:mm");
  };

  return (
    <div className="main">
      <div className="message owner">
        <div className="messageInfor">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/560/855/635/spy-x-family-anya-forger-hd-wallpaper-preview.jpg"
            alt=""
          />
          <span>{formatTime(messageTimestamps[0] || new Date())}</span>
        </div>
        <div className="messageContent">
          <p>Hello</p>
          <img src="https://images4.alphacoders.com/110/1104372.jpg" alt="" />
        </div>
      </div>
      {newText.message.map((item: any, index: any) => {
        return (
          <div className="main" key={item.createAt}>
            <div className = {item.role === "assistant" ? "message" : "message owner"} >
              <div className="messageInfor">
                <img
                  src="https://c4.wallpaperflare.com/wallpaper/560/855/635/spy-x-family-anya-forger-hd-wallpaper-preview.jpg"
                  alt=""
                />
                <span>
                  {formatTime(messageTimestamps[index + 1] || new Date())}
                </span>
              </div>
              <div className="messageContent">
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Message;
