import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import RankingDocumentForm from "../components/MyRankingC/RankingDocumentForm";

const useStyles = makeStyles((theme) => ({
  root: {},
  rankingDocumentFormContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const MyRanking = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item sm={6}>
          Graph
        </Grid>
        <Grid
          item
          sm={6}
          justify="center"
          className={classes.rankingDocumentFormContainer}
        >
          <RankingDocumentForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default MyRanking;
