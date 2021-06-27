import React, { useEffect } from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { loadClassroom } from "../actions/classroomActions";
import SubjectSelector from "../components/SubjectSelector";
import ClassroomNav from "../components/ClassroomNav";
import { Route } from "react-router-dom";
import NotesPage from "./Classroom/NotesPage";

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

  useEffect(() => {
    loadClassroom();
  }, [""]);
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
      </div>
    </div>
  );
}

export default Classroom;
