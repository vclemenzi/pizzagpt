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
        {/* Chat Thread */}
        <div className="md:h-[93vh] lg:h-[93vh] sm:h-[85vh] h-[85vh] overflow-y-scroll">
          {loading ? (
            <>
              <div className="p-10 flex items-center">
                <img src="/chatgpt.svg" alt="ChatGPT" className="h-5 w-5 mr-2 animate-spin" />
                <h1>Wating for the response from OpenAI API...</h1>
              </div>
            </>
          ) : (
            <div className="p-10">
              <Markdown>{response}</Markdown>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="flex h-20 w-full items-center justify-center p-10">
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

        {/* Footer */}
        <div className="flex justify-center items-center h-20 w-full bg-gray-100">
          <p className="text-gray-500">
            Made with ❤️ by{" "} Valerio Clemenzi | PizzaGPT is not affiliated with OpenAI
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
