import { useState } from "react";
import Link from "next/link";
import altogic from "../configs/altogic";
import { useRouter } from "next/router";

function SignInView() {
  const router = useRouter();

  const [inpEmail, setInpEmail] = useState("evrenvural4@gmail.com");
  const [inpPassword, setInpPassword] = useState("123456789");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signIn", {
        method: "POST",
        body: JSON.stringify({
          email: inpEmail,
          password: inpPassword,
        }),
      });

      if (!response.ok) {
        const { errors } = await response.json();
        throw errors;
      }
      router.replace("/");
    } catch (err) {
      setLoading(false);
      setError(err.items);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-96 gap-4">
      <div className="flex flex-col gap-2 w-full md:w-96">
        <h1 className="self-start text-3xl font-bold">Login to your account</h1>
        {error?.map(({ message }) => (
          <div key={message} className="bg-red-600 text-white text-[13px] p-2">
            <p>{message}</p>
          </div>
        ))}

        <input
          type="email"
          placeholder="Type your email"
          onChange={(e) => setInpEmail(e.target.value)}
          value={inpEmail}
        />
        <input
          autoComplete="new-password"
          type="password"
          placeholder="Type your password"
          onChange={(e) => setInpPassword(e.target.value)}
          value={inpPassword}
        />
        <div className="flex justify-between gap-4">
          <Link className="text-indigo-600" href="/sign-up">
            Don't have an account? Register now
          </Link>
          <button
            type="submit"
            className="border py-2 px-3 border-gray-500 hover:bg-gray-500 hover:text-white transition shrink-0"
            disabled={loading}
            onClick={handleSignIn}
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
}

export default SignInView;
