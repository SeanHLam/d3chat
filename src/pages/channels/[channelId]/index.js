import { getAllMessages } from "@/database";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";

export default function Channel({ channelId, messages: initMessages }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
  }, []);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState(initMessages);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit", text);
    // Send to the database (POST)
    if (text.length > 0) {
      const result = await axios.post(`/api/channels/${channelId}/messages`, {
        userName,
        text,
      });
        setText("");
      const newMessage = result.data;

      setMessages([...messages, newMessage]);
    }
  };

  return (
    <>
      <Head>
        <title>D3 Chat</title>
        <meta name="description" content="D3 chat app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex flex-col     p-4  w-screen h-screen  ">
        
        <div className="h-max scrollbar-hide overflow-scroll overflow-y-scroll flex flex-col">
          {messages.map((message) => {
            return (
              <div className="p-2"  key={message.id}>
                <h2 className="text-2xl text-currant-800 text-left">{message.userName}</h2>
                <h3 className="text-left text-currant-100">{message.text}</h3>
              </div>
            );
          })}
        </div>

        <div className="">
          <form className="" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className=" p-2 border-solid text-currant-400 border-2 border-currant-800 bg-none rounded transition-all"
            />
            < button className="p-2 m-2 border-solid border-2 border-currant-800 hover:bg-currant-800 rounded transition-all" type="submit">Send</button>
          </form>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const channelId = context.params.channelId;
  const messages = await getAllMessages(channelId);

  return {
    props: {
      channelId: JSON.parse(JSON.stringify(channelId)),
      messages: JSON.parse(JSON.stringify(messages)),
    },
  };
}
