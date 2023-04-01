import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [key, setKey] = useState("");

  useEffect(() => {
    const key = localStorage.getItem("key");

    if (!key) {
      window.location.href = "/login";
    } else {
      setKey(key);
    }
  }, []);

  return (
    <>
      <Head>
        <title>PizzaGPT</title>
        <meta
          name="description"
          content="Pizza GPT: A chatgpt client for the italian users because the main was banned :("
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        
      </main>
    </>
  );
};

export default Home;
