import React from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
  ResponsiveContainer,
} from "recharts";

const RankingGraph = () => {
  const graphData = useSelector(
    (state) => state.classroom.dashboard_data.ranking_graph
  );

  const data = [{ name: "Starting", doc: 0 }];

  for (let month in graphData) {
    const no_of_documents = graphData[month];
    const dataChunk = {};
    dataChunk.name = month;
    dataChunk.doc = no_of_documents;
    data.push(dataChunk);
  }

  return (
    <ResponsiveContainer width={"100%"} height="60%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="doc" stroke="red" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RankingGraph;
