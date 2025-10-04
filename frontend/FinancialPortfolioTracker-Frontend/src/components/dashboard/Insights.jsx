import { Card, CardContent, Typography } from "@mui/material";
import dashboardConfig from "../../json/dashboard.json";

const Insights = ({ insights }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{dashboardConfig.insights.title}</Typography>
      <Typography>Diversification Score: {insights?.diversificationScore?.toFixed(4)}</Typography>
      <Typography>Recommendation: {insights?.recommendation}</Typography>
    </CardContent>
  </Card>
);

export default Insights;
