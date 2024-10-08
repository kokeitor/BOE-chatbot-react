import { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

export function ChatContextProvider(props) {
  const [chatMemory, setChatMemory] = useState([]);
  const [loadingApiResponse, setloadingApiResponse] = useState(false);
  const [errorStatusCode, setErrorStatusCode] = useState(null);

  // Use effect function to log the context var changes
  useEffect(() => {
    chatMemory.forEach((m, index) =>
      console.log(
        `Memory ${index + 1} --> IA: ${m.iaResponse} -- User Message: ${
          m.userMessage
        }`
      )
    );
  }, [chatMemory]);

  useEffect(() => {
    console.log(`Loading Api Response : ${loadingApiResponse} `);
  }, [loadingApiResponse]);
  useEffect(() => {
    console.log(`Error Status code : ${errorStatusCode} `);
  }, [errorStatusCode]);

  // Context functions to change value of context vars
  const addMemory = (memory) => {
    setChatMemory((prevMemory) => [...prevMemory, memory]);
  };
  const restartMemory = () => {
    setChatMemory([]);
  };
  const changeLoadingApiResponse = (state) => {
    if (state === true || state === false) {
      setloadingApiResponse(state);
    } else {
      console.log(`Incorrect value for loadingApiResponse : ${state}`);
    }
  };
  const setErrorStatus = (status) => {
    setErrorStatusCode(status);
  };

  return (
    <ChatContext.Provider
      value={{
        chatMemory: chatMemory,
        addMemory: addMemory,
        restartMemory: restartMemory,
        loadingApiResponse: loadingApiResponse,
        changeLoadingApiResponse: changeLoadingApiResponse,
        errorStatusCode: errorStatusCode,
        setErrorStatus: setErrorStatus,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
}
