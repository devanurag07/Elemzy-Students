import React from "react";
import { useSelector } from "react-redux";

import { Paper, Grid, Typography, makeStyles } from "@material-ui/core";
import { getRandomColor } from "../../usefulFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
}));

const UpcomingExams = () => {
  const upcoming_exams = useSelector(
    (state) => state.classroom.dashboard_data.upcoming_exams
  );

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h6">UpComing Exams</Typography>
      <Grid container>
        {upcoming_exams.map((exam) => {
          return (
            <Grid item sm={12}>
              <UpcomingExamCard exam={exam} />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default UpcomingExams;

const useStyles2 = makeStyles((theme) => ({
  root: {
    padding: "0.3em 0.7em",
    marginTop: "0.5em",

    "& MuiPaper-root": {
      boxShadow: "none",
    },

    "& *": {
      fontWeight: "505",
      fontFamily: "Poppins",
    },
  },
  exam_time_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    "& div": {
      fontSize: "0.8em",
    },
  },
  examDescription: {
    fontSize: "0.7em",
  },
  examDetail: {
    padding: "1em 0.2em",
  },
  examDate: {
    color: "gray",
    fontSize: "0.8em",
  },
}));
const UpcomingExamCard = ({ exam }) => {
  const classes = useStyles2();

  const color = getRandomColor();

  return (
    <div className={classes.root}>
      <div className={classes.examDate}>{exam.exam_date}</div>
      <Paper style={{ background: color.background, color: color.foreground }}>
        <Grid container>
          <Grid item sm={2} className={classes.exam_time_container}>
            <Typography component="div">
              {exam.start_time.slice(0, 5)}
            </Typography>
            <Typography component="div">
              {exam.finish_time.slice(0, 5)}
            </Typography>
          </Grid>

          <Grid item sm={10} className={classes.examDetail}>
            <Typography component="h6">{exam.title}</Typography>
            <Typography component="div" className={classes.examDescription}>
              {exam.description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
