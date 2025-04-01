// hooks/useWebSocket.js
import { useEffect, useRef, useState } from "react";

export const useWebSocket = (url:any, token:any) => {
  const [messages, setMessages] = useState<any>([]);
  const [isConnected, setIsConnected] = useState(false);
  const websocket = useRef<any>(null);

  useEffect(() => {
    // Create the WebSocket connection with the authorization token
    websocket.current = new WebSocket(`${url}?token=${token}`);

    // Handle connection open
    websocket.current.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    // Handle incoming messages
    websocket.current.onmessage = (event:any) => {
        console.log(event)
      const message = JSON.parse(event.data);
      setMessages((prevMessages:any) => [...prevMessages, message]);
    };

    // Handle connection close
    websocket.current.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    // Handle errors
    websocket.current.onerror = (error:any) => {
      console.error("WebSocket error:", error);
    };

    // Clean up on unmount
    return () => {
      websocket.current.close();
    };
  }, [url, token]);

  // Function to send messages
  const sendMessage = (message:any) => {
    if (websocket.current && isConnected) {
      websocket.current.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected");
    }
  };

  return { messages, isConnected, sendMessage };
};