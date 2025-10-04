import { Card, CardContent, Typography, Button } from "@mui/material";
import FormRenderer from "../FormRenderer";
import dashboardConfig from "../../json/dashboard.json";

const AssetForm = ({ asset, setAsset, onAddAsset, isLoading }) => (
  <Card className="section-card">
    <CardContent>
      <Typography variant="h6">Add Asset</Typography>
      <FormRenderer
        fields={dashboardConfig.fields.assetInputs}
        values={asset}
        onChange={(name, value) =>
          setAsset({
            ...asset,
            [name]: typeof value === "string" ? value.toUpperCase() : parseFloat(value),
          })
        }
      />
      <Button variant="contained" onClick={onAddAsset} disabled={isLoading} fullWidth>
        {dashboardConfig.buttons.addAsset}
      </Button>
    </CardContent>
  </Card>
);

export default AssetForm;