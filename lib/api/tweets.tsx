import { createContext, PropsWithChildren, useContext } from "react";
import { API_URL } from "./config";
import { useAuth } from "../../context/AuthContext";

const TweetsApiContext = createContext({});

const TweetsApiContextProvider = ({ children }: PropsWithChildren) => {
  const { authtoken } = useAuth();

  const listTweets = async () => {
    if (!authtoken) return;
    try {
      const res = await fetch(`${API_URL}/tweet`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      });

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getTweet = async (id: string) => {
    if (!authtoken) return;
    try {
      const res = await fetch(`${API_URL}/tweet/${id}`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const createTweet = async (data: { content: string }) => {
    if (!authtoken) return;
    const res = await fetch(`${API_URL}/tweet`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authtoken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status !== 200) throw new Error("Error creating tweet");

    return res.json();
  };

  

  return (
    <TweetsApiContext.Provider
      value={{
        listTweets,
        getTweet,
        createTweet,
      }}
    >
      {children}
    </TweetsApiContext.Provider>
  );
};

export default TweetsApiContextProvider;

export const useTweetApi = () => useContext(TweetsApiContext);
