import Link from "next/link";
import { useRouter } from "next/router";
import withPrivateRoute from "../components/withPrivateRoute";
import altogic from "../configs/altogic";
import { useAuthContext } from "../contexts/Auth.context";

function HomeView() {
  const router = useRouter();
  const [auth, setAuth] = useAuthContext();

  const handleSignOut = async () => {
    await altogic.auth.signOut();
    setAuth(null);
    router.push("sign-in");
  };

  return (
    <div style={styles.body}>
      <div>{auth && JSON.stringify(auth, null, 3)}</div>
      <button style={styles.button} onClick={handleSignOut}>
        Sign Out
      </button>
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

export default withPrivateRoute(HomeView);
