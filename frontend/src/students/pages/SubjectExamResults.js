import { Typography, Grid, Button, Paper, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadSubjectExamResults } from "../actions/classroomActions";
import SubjectSelector from "../components/SubjectSelector";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
  },
  resultsHeading: {
    fontSize: "1.2rem",
    fontWeight: "505",
    fontFamily: "Poppins",
  },
  resultRowsContainer: {
    marginTop: "2em",
  },
}));

const SubjectExamResults = () => {
  const currentSubject = useSelector((state) => state.classroom.currentSubject);

  const standard = useSelector((state) => state.classroom.classroom.standard);
  const currentSubjectName = currentSubject.name;

  const subject_results_list = currentSubject.subject_exams_results;

  const classes = useStyles();

  useEffect(() => {
    const subject_pk = currentSubject.id;
    if (subject_pk) {
      loadSubjectExamResults(subject_pk);
      console.log("Loading");
    }
  }, [currentSubject.id]);

  return (
    <div className={classes.root}>
      <Typography className={classes.resultsHeading}> Results</Typography>
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
      <Grid container className={classes.resultRowsContainer}>
        {subject_results_list.map((result_obj) => {
          return (
            <ExamResultRow
              standard={standard}
              subject_name={currentSubjectName}
              result_obj={result_obj}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default SubjectExamResults;

const useStyles2 = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "1em",
    borderRadius: "0.3em",
    boxShadow: "0px 0px 1px 0px",

    "& .MuiGrid-item": {
      display: "flex",
      justify: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "505",

      "& .MuiTypography-root": {
        padding: "0.3em 3em",
        borderRadius: "23em",
        background: "#ff6b00",
        fontWeight: "505",
        fontFamily: "Poppins",
        color: "white",
      },
    },
  },

  resultDate: {
    color: "black !important",
    background: "white !important",
  },
}));

const ExamResultRow = ({ standard, subject_name, result_obj }) => {
  const classes = useStyles2();
  return (
    <Paper className={classes.root}>
      <Grid container justify="space-around">
        <Grid item sm={1}>
          <Typography component="div">{standard}</Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography component="div">{subject_name}</Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography component="div">{result_obj.exam_name}</Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography component="div" className={classes.resultDate}>
            {result_obj.created_at.split("T")[0]}
          </Typography>
        </Grid>
        <Grid item sm={2}>
          <Button variant="contained" color="primary">
            View Result
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
