import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const TeacherRoute = ({ component: Component, ...rest }) => {

  let { token, teacher } = useSelector((state) => state.Auth);

  return (
    <Route
      {...rest}
      render={(props) => (!!token && !!teacher ? <Component {...props} /> : !!token? <Redirect to="/" /> : <Redirect to="/login" />)}
    />
  );
};

export default TeacherRoute;
