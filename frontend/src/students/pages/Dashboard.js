import React, { useEffect } from "react";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import Classroom from "./Classroom";
import Notifications from "../components/Notifications";
import { createNotification, loadClassroom } from "../actions/classroomActions";
import MyRanking from "./MyRanking";
import SubjectExamResults from "./SubjectExamResults";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function Dashboard() {
  useEffect(() => {
    createNotification("Classroom Loading");
    loadClassroom();
  }, ["input"]);

  return (
    <div>
      <Notifications />
      <Grid container>
        <Grid item sm={1}>
          <Sidebar />
        </Grid>
        <Grid item sm={11}>
          {/* <Classroom /> */}
          <SubjectExamResults />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
