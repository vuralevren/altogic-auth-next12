import Link from "next/link";
import { useRouter } from "next/router";
import altogic from "../configs/altogic";
import Image from "next/image";
import { useState } from "react";
import Avatar from "../components/Avatar";
import UserInfo from "../components/UserInfo";
import Sessions from "../components/Sessions";

function HomeView({ userProp, sessionsProp }) {
  const router = useRouter();

  const [user, setUser] = useState(userProp);
  const [sessions, setSessions] = useState(sessionsProp);

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/signOut", {
        method: "POST",
      });
      const { errors } = await response.json();

      if (!response.ok) {
        throw errors;
      }
      router.push("sign-in");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="h-screen py-4 space-y-4 flex flex-col text-center items-center">
      <Avatar user={user} setUser={setUser} />
      <UserInfo user={user} setUser={setUser} />
      <Sessions sessions={sessions} setSessions={setSessions} />
      <button
        className="bg-gray-400 rounded py-2 px-3 text-white"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </section>
  );
}

export async function getServerSideProps(context) {
  const token = context.req.cookies.session_token;
  const { user, errors } = await altogic.auth.getUserFromDBbyCookie(
    context.req,
    context.res
  );

  if (!user) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const { sessions } = await altogic.auth.getAllSessions();
  const sessionsProp = sessions.map((session) =>
    session.token === token ? { ...session, isCurrent: true } : session
  );
  return {
    props: { userProp: user, sessionsProp },
  };
}

export default HomeView;
