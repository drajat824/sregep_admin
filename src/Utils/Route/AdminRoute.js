import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {

  let { token, admin } = useSelector((state) => state.Auth);

  return (
    <Route
      {...rest}
      render={(props) => (!!token && !!admin ? <Component {...props} /> : !!token? <Redirect to="/teacher-role" /> : <Redirect to="/login" />)}
    />
  );
};

export default AdminRoute;
