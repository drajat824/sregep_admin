import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";

import AdminRoute from "./Utils/Route/AdminRoute";
import PublicRoute from "./Utils/Route/PublicRoute";
import TeacherRoute from "./Utils/Route/TeacherRoute";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import createBrowserHistory from "history/createBrowserHistory";
import {persistor, store} from "./store/store";

import {
  LoginPage,
  PressenceTeacherPage,
  StudentPage,
  DashboardPage,
  AttendancePage,
  TaskTeacherPage,
  GroupPage,
  RegisterPage,
  TeacherPage,
  LoginTeacherPage,
  DashboardTeacherPage,
  AttendanceTeacherPage,
  PressenceCheckTeacherPage
} from "./Pages";

export const history = createBrowserHistory();

document.body.style = "background: #F0F0F0;";

function Routes() {
  return (
    <div style={{ height: "100%" }}>
      <Router history={history}>
        <Switch>
          <PublicRoute path="/login" restricted={true} component={LoginPage} exact />
          <PublicRoute path="/register" restricted={true} component={RegisterPage} exact />

          <PublicRoute path="/login/teacher" restricted={true} component={LoginTeacherPage} exact />
          

          <AdminRoute path="/" component={DashboardPage} exact />
          <AdminRoute path="/student" component={StudentPage} exact />
          <AdminRoute path="/teacher" component={TeacherPage} exact />
          <AdminRoute path="/attendance" component={AttendancePage} exact />
          <AdminRoute path="/group" component={GroupPage} exact />

          <TeacherRoute path="/teacher-role/" component={DashboardTeacherPage} exact />
          <TeacherRoute path="/teacher-role/pressence" component={PressenceTeacherPage} exact />
          <TeacherRoute path="/teacher-role/task" component={TaskTeacherPage} exact />
          <TeacherRoute path="/teacher-role/attendace" component={AttendanceTeacherPage} exact />
          <TeacherRoute path="/teacher-role/pressence-check" component={PressenceCheckTeacherPage} exact />

        </Switch>
      </Router>
    </div>
  );
}

const App = () => {
  // const { store, persistor } = configureStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
