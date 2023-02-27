import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('submit', userName)
    localStorage.setItem('userName', userName)
    router.push('/channels')
}


  return (
    <>
      <Head>
        <title>D3 Chat</title>
        <meta name="description" content="D3 chat app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex flex-col justify-center items-center h-screen">
        <h1 className="bold text-4xl text-currant-100">D3 Chat</h1>
       

        <form className="flex m-2 flex-col" onSubmit={handleSubmit}>
        <h2 className="text-currant-100">User Name:</h2>
          <input
            className="p-2 text-currant-400"
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className="mt-2 bg-currant-800 hover:bg-currant-600 transition-all text-currant-100 p-2" type="submit">LOGIN</button>
        </form>
      </main>
    </>
  );
}
