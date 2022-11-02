import { useState } from "react";
import Link from "next/link";
import altogic from "../configs/altogic";
import { useRouter } from "next/router";
import { useAuthContext } from "../contexts/Auth.context";

function SignInView() {
  const router = useRouter();
  const [auth, setAuth] = useAuthContext();

  const [inpEmail, setInpEmail] = useState("");
  const [inpPassword, setInpPassword] = useState("");

  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    try {
      const { user, errors } = await altogic.auth.signInWithEmail(
        inpEmail,
        inpPassword
      );

      if (errors) {
        throw errors;
      }

      setAuth(user);
      router.push("/", undefined, { shallow: true });
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <input
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChange={(e) => setInpEmail(e.target.value)}
          value={inpEmail}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          autoCapitalize="none"
          onChange={(e) => setInpPassword(e.target.value)}
          value={inpPassword}
        />
        <button style={styles.button} onClick={handleSignIn}>
          Sign In
        </button>
      </div>
      <label style={styles.alreadyLabel}>
        Dont have an account yet?{" "}
        <Link href="/sign-up">
          <label style={styles.link}>Create an account</label>
        </Link>
      </label>
      <div>{error && JSON.stringify(error, null, 3)}</div>
    </div>
  );
}

const styles = {
  body: {
    display: "flex",
    flexDirection: "column",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: 350,
    height: 55,
    margin: 10,
    padding: 8,
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
  button: {
    width: 150,
    height: 55,
    borderRadius: 14,
    color: "white",
    backgroundColor: "blue",
  },
  successLabel: {
    color: "green",
    marginTop: 12,
  },
  link: {
    color: "blue",
  },
  label: {
    marginTop: 12,
  },
};

export default SignInView;
