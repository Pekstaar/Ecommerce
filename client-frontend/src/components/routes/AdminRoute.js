import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentAdmin } from "../../functions/auth";
import { Route } from "react-router-dom";
import LoadingRedirect from "./LoadingRedirect";

export const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("CURRENT ADMIN RESPONSE", res);
          setOk(true);
        })
        .catch((err) => console.log("Admin verificatoion error!", err));
    }
  }, [user]);

  return ok ? <Route {...rest} render={() => children} /> : <LoadingRedirect />;
};
