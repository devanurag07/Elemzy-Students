import React, { useEffect, useRef } from "react";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import Notifications from "../components/Notifications";
import { createNotification, loadClassroom } from "../actions/classroomActions";

// Page
import Classroom from "./Classroom";
import MyRanking from "./MyRanking";
import Home from "./Home";
import SubjectExamResults from "./SubjectExamResults";

// Router
import { Switch, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  sideBar: {
    minWidth: "150px",
    position: "absolute",
  },
  dashboardPage: {
    marginLeft: "150px",
  },
}));

function Dashboard() {
  useEffect(() => {
    createNotification("Classroom Loading");
    loadClassroom();
  }, ["input"]);

  const classes = useStyles();
  const sidebarElem = useRef(null);

  const getSideBarWidth = () => {
    if (sidebarElem.current) {
      return `${sidebarElem.current.offsetWidth}px`;
    }
    return "150px";
  };

  return (
    <div>
      <Notifications />

      <div className={classes.sideBar} useRef={useRef}>
        <Sidebar />
      </div>
      <div
        className={classes.dashboardPage}
        style={{ marginLeft: `${getSideBarWidth()}` }}
      >
        {/* Dashboard Pages */}

        <Switch>
          <Route path="/student/dashboard" exact>
            <Home />
          </Route>

          <Route path="/student/classroom">
            <Classroom />
          </Route>

          <Route path="/student/ranking" exact>
            <MyRanking />
          </Route>

          <Route path="/student/results" exact>
            <SubjectExamResults />
          </Route>
        </Switch>
      </div>
      {/* <Classroom /> */}
    </div>
  );
}

export default Dashboard;
