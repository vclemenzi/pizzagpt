import Head from "next/head";
import Link from "next/link";

export function How() {
  return (
    <>
      <Head>
        <title>PizzaGPT</title>
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center py-10">
        <div>
          <h1 className="text-2xl font-bold">How get a OpenAI API Key?</h1>

          <hr className="my-5" />

          <p>
            Go to{" "}
            <Link
              href="https://openai.com/"
              className="text-blue-500 hover:text-blue-700"
            >
              OpenAI
            </Link>{" "}
            and create an account.

            <img src="/create-account.png" alt="Create Account" />
          </p>

          <hr className="my-5" />

          <p>
            After you have created an account, go to{" "}
            <Link
              href="https://platform.openai.com/account/api-keys"
              className="text-blue-500 hover:text-blue-700"
            >
              API Keys
            </Link>{" "}
            and create a new key. And copy it.
            <img src="/create-api-key.png" alt="Create API Key" />
          </p>

          <hr className="my-5" />

          <p>
            After you have created the key, go back to{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-700">
              Login
            </Link>{" "}
            and paste the key in the input.
            <img src="/paste-api-key.png" alt="Paste API Key" />
          </p>

            <hr className="my-5" />

            <p>
                All done! I wish this helps you.
            </p>
        </div>
      </main>
    </>
  );
}

export default How;
