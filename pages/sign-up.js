import { useState } from "react";
import Link from "next/link";
import altogic from "../configs/altogic";

function SignUpView() {
  const [inpEmail, setInpEmail] = useState("");
  const [inpPassword, setInpPassword] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      const { user, session, errors } = await altogic.auth.signUpWithEmail(
        inpEmail,
        inpPassword
      );
      if (errors) {
        throw errors;
      }
      console.log({ user, session });
      altogic.auth.setSessionCookie(session.token);
      const buNe = altogic.auth.getUserFromDBbyCookie();
      console.log(buNe);
      setSuccess(`We sent a verification link to ${inpEmail}`);
    } catch (err) {
      console.error(err);
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
        <button style={styles.button} onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
      <label style={styles.alreadyLabel}>
        Already have an account?{" "}
        <Link href="/sign-in">
          <label style={styles.link}>Login</label>
        </Link>
      </label>
      <div style={styles.successLabel}>{success && success}</div>
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

export default SignUpView;
