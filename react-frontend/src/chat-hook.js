import { Socket } from "phoenix";
import { useCallback, useEffect, useRef, useState } from "react";

let id = 0;

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);
  const channel = useRef(null);

  useEffect(() => {
    socket.current = new Socket("ws://localhost:4000/socket");
    socket.current.connect();
    channel.current = socket.current.channel("room:lobby");
    channel.current.on("new_msg", (payload) => {
      setMessages((prev) => [...prev, { id: ++id, body: payload.body }]);
    });

    channel.current
      .join()
      .receive("ok", (resp) => {
        console.log("Joined successfully", resp);
      })
      .receive("error", (resp) => {
        console.log("Unable to join", resp);
      });
  }, []);

  const sendMessage = useCallback((message) => {
    channel.current.push("new_msg", { body: message });
  }, []);

  return { messages, sendMessage };
};
