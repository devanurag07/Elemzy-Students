import React, { useEffect } from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { loadClassroom, setCurrentSubject } from "../actions/classroomActions";
import SubjectSelector from "../components/SubjectSelector";
import ClassroomNav from "../components/ClassroomNav";
import { Route } from "react-router-dom";
import NotesPage from "./Classroom/NotesPage";
import AssignmentsPage from "./Classroom/AssignmentsPage";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0.5em",
  },
  classroomHeading: {
    color: "#ff6b00",
  },
}));

function Classroom() {
  const classes = useStyles();
  const classroom = useSelector((state) => state.classroom.classroom);

  useEffect(() => {
    loadClassroom();
  }, [""]);

  useEffect(() => {
    setCurrentSubject(1);
    console.log("setting");
  }, [classroom.id]);

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.classroomHeading}>
        Classes
      </Typography>

      <Grid container justify="center">
        <Grid item sm={5}>
          <Grid container>
            <Grid item sm={12}>
              Select Subject and Date
            </Grid>

            <SubjectSelector />
          </Grid>
        </Grid>
      </Grid>

      <div className="classroom-nav-container" style={{ marginTop: "2em" }}>
        <ClassroomNav />
      </div>
      <div className="main-container" style={{ marginTop: "1em" }}>
        <Route path="/student/classroom/notes">
          <NotesPage />
        </Route>
        <Route path="/student/classroom/assignments">
          <AssignmentsPage />
        </Route>
      </div>
    </div>
  );
}

export default Classroom;
