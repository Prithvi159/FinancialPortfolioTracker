import { Card, CardContent, Typography, Button } from "@mui/material";
import dashboardConfig from "../../json/dashboard.json";
import "./table.css"

const AssetTable = ({ assets, onRemoveAsset, onViewHistorical }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">Assets</Typography>
      <div className="table-wrapper">
        <table className="asset-table">
          <thead>
            <tr>
              {dashboardConfig.tables.assets.columns.map((col) => (
                <th key={col.field}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assets.map((a) => (
              <tr key={a.ticker}>
                <td>{a.ticker}</td>
                <td>{a.quantity}</td>
                <td>${a.currentPrice.toFixed(2)}</td>
                <td>${a.totalValue.toFixed(2)}</td>
                <td>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => onRemoveAsset(a.ticker)}
                  >
                    {dashboardConfig.buttons.removeAsset}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onViewHistorical(a.ticker)}
                    className="view-btn"
                  >
                    {dashboardConfig.buttons.viewHistorical}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

export default AssetTable;
