import { useEffect, useState } from "react";
import axios from "axios";
import { getAllChannels } from "@/database";
import Link from "next/link";
import Head from "next/head";

export default function Channels({ channels:initChannels }) {
  const [channels, setChannels] = useState(initChannels)
  const [name, setName] = useState("");


  const handleSubmit = async (e) => {
       
    e.preventDefault()
    console.log('submit', name)
    // Send to the database (POST)
    if (name.length > 0) {
        const result = await axios.post(`/api/channels`, {
           name
        })
        setName('')
        const newChannel = result.data

        setChannels([...channels, newChannel])
      
    }
   
}

  return (
    <>
      <Head>
        <title>D3 Chat</title>
        <meta name="description" content="D3 chat app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex flex-col p-4 items-center h-screen  ">
        <h1 className="text-4xl">CHANNELS</h1>

        <div className="p-4 m-4 w-min  h-40">
          <div className="flex items-center">
            <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Create Channel"
            className="p-2 m-2 border-solid text-currant-400 border-2 border-currant-800 bg-none rounded transition-all"></input>
            <div 
            onClick={handleSubmit}
            className=" flex justify-center items-center bg-currant-800 hover:scale-95 cursor-pointer p-2 w-10 rounded-full transition-all">
                +
            </div>
          </div>

          {channels.map((channel) => {
            return (
              <div
                className="p-2 m-2 border-solid border-2 border-currant-800 hover:bg-currant-800 rounded transition-all"
                key={channel.id}
              >
                <Link href={`/channels/${channel.id}`}>
                  <h3 className="text-currant-100">{channel.name}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const channels = await getAllChannels();

  return {
    props: {
      channels: JSON.parse(JSON.stringify(channels)),
    },
  };
}
