import React, { useState, useEffect, useContext } from "react";
import altogic from "../configs/altogic";

const Context = React.createContext();

const useFetchAuth = () => {
  const [fetchedAuth, setFetchedAuth] = useState(null);
  const [isSessionExist, setIsSessionExist] = useState(true);

  useEffect(() => {
    // Check if session information is exist in storage
    const authFromStorage = altogic.auth.getUser();
    if (authFromStorage) {
      setFetchedAuth(authFromStorage);
    } else {
      setIsSessionExist(false);
    }
  }, []);

  return { fetchedAuth, isSessionExist };
};

const Provider = (props) => {
  const { fetchedAuth, isSessionExist } = useFetchAuth();
  const [auth, setAuth] = useState(fetchedAuth);

  useEffect(() => {
    // Set session information to auth state if it's exist in storage
    setAuth(fetchedAuth);
  }, [fetchedAuth]);

  useEffect(() => {
    // Set session information to storage when auth state's changed
    altogic.auth.setUser(auth);
  }, [auth]);

  return (
    <Context.Provider value={[auth, setAuth, isSessionExist]}>
      {props.children}
    </Context.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(Context);
  return context;
};

export default Provider;
