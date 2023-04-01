import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

function Login() {
  const [key, setKey] = useState("");

  useEffect(() => {
    const key = localStorage.getItem("key");

    if (key) {
        window.location.href = "/";
    }
    }, []);

  const handleLogin = () => {
    localStorage.setItem("key", key);
    window.location.href = "/";
  };

  return (
    <>
      <Head>
        <title>PizzaGPT</title>
      </Head>
      <div className="-mt-56 flex min-h-screen flex-col items-center justify-center px-14 py-2 text-center">
        <div className="rounded-lg bg-white p-10 shadow-xl">
          <h1 className="mb-5 text-2xl">Insert your key</h1>
          <p className="mb-5 text-gray-500">
            Insert your OpenAI API Key to use PizzaGPT (<Link href="/how" className="text-blue-500 hover:text-blue-700">how?</Link>)
          </p>
          <input
            className="w-full rounded border border-gray-300 p-2"
            id="key"
            type="password"
            placeholder="OpenAI API Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />

          <button
            className="mt-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={handleLogin}
          >
            Start using PizzaGPT
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
