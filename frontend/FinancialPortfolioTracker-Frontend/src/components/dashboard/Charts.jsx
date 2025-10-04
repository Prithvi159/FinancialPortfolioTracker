import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { Pie, Line } from "react-chartjs-2";
import dashboardConfig from "../../json/dashboard.json";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import './charts.css'

ChartJS.register(
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const Charts = ({ pieData, lineData, selectedTicker, historicalLoading }) => (
  <>
    <Card>
      <CardContent>
        <Typography variant="h6">{dashboardConfig.charts.pie.title}</Typography>
        <div className="chart-container">
          <Pie data={pieData} />
        </div>
      </CardContent>
    </Card>

    {selectedTicker && (
      <Card>
        <CardContent>
          <Typography variant="h6">
            {dashboardConfig.charts.line.title} for {selectedTicker}
          </Typography>
          <div className="chart-container">
            {historicalLoading ? (
              <CircularProgress />
            ) : (
              <Line key={selectedTicker} data={lineData} />
            )}
          </div>
        </CardContent>
      </Card>
    )}
  </>
);

export default Charts;
