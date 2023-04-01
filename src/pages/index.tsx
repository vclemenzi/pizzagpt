import { type NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import { Markdown } from "~/components/Markdown";

const Home: NextPage = () => {
  const [key, setKey] = useState("");
  const [response, setResponse] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem("key");

    if (!key) {
      window.location.href = "/login";
    } else {
      setKey(key);
    }
  }, []);

  const ask = (question: string) => {
    setLoading(true);

    axios({
      method: "POST",
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      data: {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: question,
          },
        ],
      },
    })
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setResponse(res.data.choices[0].message.content as string);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAsk = () => {
    ask(question);
  };

  const handleLogout = () => {
    localStorage.removeItem("key");
    window.location.href = "/login";
  };

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
        <div className="flex h-20 w-full items-center justify-center p-3 md:p-10 lg:p-10">
          <button
            className="mr-4 rounded-md bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M7 12h14l-3 -3m0 6l3 -3" />
            </svg>
          </button>

          <input
            type="text"
            className="h-10 w-full rounded-lg border border-gray-300 px-4"
            placeholder="Ask ChatGPT something..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button
            className="ml-4 h-10 w-20 rounded-md bg-blue-500 text-white"
            onClick={handleAsk}
          >
            Ask
          </button>
        </div>
        {/* Chat Thread */}
        <div className="h-[90vh] overflow-y-scroll sm:h-[90vh] md:h-[93vh] lg:h-[93vh]">
          {loading ? (
            <>
              <div className="flex items-center p-3 md:p-10 lg:p-10">
                <img
                  src="/chatgpt.svg"
                  alt="ChatGPT"
                  className="mr-2 h-5 w-5 animate-spin"
                />
                <h1>Wating for the response from OpenAI API...</h1>
              </div>
            </>
          ) : (
            <div className="p-3 md:p-10 lg:p-10">
              <Markdown>{response}</Markdown>
            </div>
          )}
        </div>

        {/* Chat Input */}
      </main>
    </>
  );
};

export default Home;
