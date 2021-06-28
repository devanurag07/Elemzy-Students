import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  loadSubjectAssignments,
  setCurrentSubject,
} from "../../actions/classroomActions";

import { Paper, Grid, Typography, Button, makeStyles } from "@material-ui/core";
import QuizForm from "./QuizForm";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em 0em",
    boxShadow: "none",
  },
  assignmentPageHeading: {
    padding: "1em 0em",
    fontFamily: "Poppins",
    fontWeight: "505",
  },
}));

const AssignmentsPage = () => {
  const currentSubject = useSelector((state) => state.classroom.currentSubject);
  const assignments_list = useSelector(
    (state) => state.classroom.currentSubject.assignments
  );

  const currentSubjectPk = currentSubject.id;

  useEffect(() => {
    if (currentSubjectPk !== undefined) {
      loadSubjectAssignments(currentSubjectPk);
    }
  }, [currentSubjectPk]);

  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.assignmentPageHeading}>
        Assignments
      </Typography>
      <Paper className={classes.root}>
        {assignments_list.map((assignment) => {
          return <AssignmentListItem assignment={assignment} />;
        })}
      </Paper>

      <QuizForm
        assignment={assignments_list.length > 0 ? assignments_list[0] : {}}
      />
    </div>
  );
};

const assignmentListStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
    background: "#ff6b0045",
    boxShadow: "none",

    "& .MuiGrid-item": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },

  assignmentTitle: {
    fontSize: "1rem 0.4rem",
    fontWeight: 505,
    fontFamily: "Poppins",
  },

  noOfQuestions: {
    fontSize: "1rem 0.4rem",
    fontWeight: 505,
    fontFamily: "Poppins",
    color: "blue",
  },
}));

const AssignmentListItem = ({ assignment }) => {
  const classes = assignmentListStyles();
  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item sm={4} style={{ justifyContent: "flex-start" }}>
          <Typography className={classes.assignmentTitle}>
            {assignment.title}
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography className={classes.noOfQuestions}>5 Questions</Typography>
        </Grid>
        <Grid item sm={4} style={{ justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" size="small">
            Take QUIZ
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AssignmentsPage;
