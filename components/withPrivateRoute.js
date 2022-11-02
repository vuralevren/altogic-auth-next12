import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import altogic from "../configs/altogic";
import { useAuthContext } from "../contexts/Auth.context";

function withPrivateRoute(WrappedComponent) {
  const HocComponent = ({ ...props }) => {
    const router = useRouter();
    const [auth, setAuth, isSessionExist] = useAuthContext();

    const [isLoading, setLoading] = useState(true);

    const { token } = router.query;

    const handleToken = async () => {
      setLoading(true);
      const { user } = await altogic.auth.getAuthGrant(token);

      if (user) {
        setAuth(user);
      }
      setLoading(false);
    };

    useEffect(() => {
      if (token && !auth) {
        // If the user come from magic link, token's handled
        handleToken();
      } else {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      if (isSessionExist === false) {
        // Navigate to sign in, if the user has not session or don't come from magic link
        router.push("/sign-in");
      }
    }, [isSessionExist]);
    return (
      <>
        {isLoading ? (
          <label>Loading...</label>
        ) : auth ? (
          <WrappedComponent {...props} />
        ) : (
          <label>You are redirecting to the login...</label>
        )}
      </>
    );
  };
  return HocComponent;
}

export default withPrivateRoute;
