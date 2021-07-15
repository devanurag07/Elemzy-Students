import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import TimeTable from "../components/HomeC/TimeTable";
import UpcomingExams from "../components/HomeC/UpcomingExams";
import UpcomingEvents from "../components/HomeC/UpcomingEvents";
import RankingGraph from "../components/HomeC/RankingGraph";

const Home = () => {
  return (
    <Grid container spacing={3} style={{ margin: "0", width: "100%" }}>
      <Grid item sm={4} style={{ minHeight: "100vh" }}>
        <TimeTable />
      </Grid>
      <Grid item sm={5}>
        <RankingGraph />
      </Grid>
      <Grid item sm={3}>
        <UpcomingEvents />
        <UpcomingExams />
      </Grid>
    </Grid>
  );
};

export default Home;
