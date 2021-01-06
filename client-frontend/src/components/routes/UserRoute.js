import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoadingRedirect from "./LoadingRedirect";

export const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingRedirect />
  );
};
