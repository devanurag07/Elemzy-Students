import React, { useEffect, useState } from "react";
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

  const [quizFormAssignment, setQuizFormAssignment] = useState({});
  const [quizFormOpen, setQuizFormOpen] = useState(false);

  useEffect(() => {
    if (currentSubjectPk !== undefined) {
      loadSubjectAssignments(currentSubjectPk);
    }
    console.log("Hi hang");
  }, [currentSubjectPk]);

  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.assignmentPageHeading}>
        Assignments
      </Typography>
      <Paper className={classes.root}>
        {assignments_list.map((assignment) => {
          return (
            <AssignmentListItem
              assignment={assignment}
              setQuizFormAssignment={setQuizFormAssignment}
              setFormOpen={setQuizFormOpen}
            />
          );
        })}
      </Paper>

      <QuizForm
        assignment={quizFormAssignment}
        formOpen={quizFormOpen}
        setFormOpen={setQuizFormOpen}
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

const AssignmentListItem = ({
  assignment,
  setQuizFormAssignment,
  setFormOpen,
}) => {
  const classes = assignmentListStyles();

  const takeQuizBtnClickHandle = () => {
    setQuizFormAssignment(assignment);
    setFormOpen(true);
  };

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item sm={4} style={{ justifyContent: "flex-start" }}>
          <Typography className={classes.assignmentTitle}>
            {assignment.title}
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography className={classes.noOfQuestions}>
            {assignment.no_of_questions} Questions
          </Typography>
        </Grid>
        <Grid item sm={4} style={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={takeQuizBtnClickHandle}
          >
            Take QUIZ
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AssignmentsPage;
