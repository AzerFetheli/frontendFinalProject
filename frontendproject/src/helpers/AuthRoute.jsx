import React, { useContext } from "react";
import { userContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "../Layouts/Website/Main/pages/loader/Loader";

export default function AuthRoute({ children }) {
  const { user } = useContext(userContext);
  if (user) return <>{children}</>;
  else if (user === null) return <Loader />;
  else {
    return <Navigate to={"/login"} />;
  }
}
