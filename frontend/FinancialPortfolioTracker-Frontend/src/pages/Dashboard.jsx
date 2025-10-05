import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Box,
  Button,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useState, useEffect } from "react";
import dashboardConfig from "../json/dashboard.json"
import {
  usePortfoliosQuery,
  useCreatePortfolioMutation,
  usePortfolioQuery,
  useInsightsQuery,
  useAddAssetMutation,
  useRemoveAssetMutation,
  useHistoricalDataQuery,
} from '../api/hooks.js';
import "./dashboard.css";
import PortfolioDialog from "../components/dashboard/PortfolioDialog.jsx";
import PortfolioSelector from "../components/dashboard/PortfolioSelector.jsx";
import AssetForm from "../components/dashboard/AssetForm.jsx";
import AssetTable from "../components/dashboard/AssetTable.jsx";
import Charts from "../components/dashboard/Charts.jsx";
import Insights from "../components/dashboard/Insights.jsx";


const Dashboard = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [asset, setAsset] = useState({ ticker: "", quantity: 0 });
  const [selectedTicker, setSelectedTicker] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");

  const {
    data: portfolios,
    isLoading: portfoliosLoading,
    error: portfoliosError,
  } = usePortfoliosQuery();

  const createPortfolio = useCreatePortfolioMutation();
  const { data: portfolioData, isLoading: portfolioLoading } = usePortfolioQuery(selectedPortfolio);
  const { data: insights, isLoading: insightsLoading } = useInsightsQuery(selectedPortfolio);
  const addAsset = useAddAssetMutation(selectedPortfolio);
  const removeAsset = useRemoveAssetMutation(selectedPortfolio);
  const { data: historicalData, isLoading: historicalLoading } = useHistoricalDataQuery(
    selectedPortfolio,
    selectedTicker
  );

  useEffect(() => {
    if (portfolios && portfolios.length > 0 && !selectedPortfolio) {
      setSelectedPortfolio(portfolios[0].id);
    }
  }, [portfolios, selectedPortfolio]);

  const handleCreatePortfolio = async () => {
    if (portfolioName) {
      await createPortfolio.mutateAsync(portfolioName);
      setDialogOpen(false);
      setPortfolioName("");
    }
  };

  const handleAddAsset = async () => {
    if (asset.ticker && asset.quantity > 0) {
      await addAsset.mutateAsync(asset);
      setAsset({ ticker: "", quantity: 0 });
    }
  };

  if (portfoliosLoading)
    return (
      <Box className="loader-container">
        <CircularProgress color="primary" />
      </Box>
    );

  if (portfoliosError)
    return <Alert severity="error">Error loading portfolios</Alert>;

  const pieData = {
    labels: portfolioData?.assets.map((a) => a.ticker) || [],
    datasets: [
      {
        data: portfolioData?.assets.map((a) => a.totalValue) || [],
        backgroundColor: dashboardConfig.charts.pie.colors,
      },
    ],
  };

  const sortedDates = historicalData ? Object.keys(historicalData).sort() : [];
  const lineData = {
    labels: sortedDates,
    datasets: [
      {
        label: dashboardConfig.charts.line.title,
        data: sortedDates.map((date) => historicalData[date]?.["4. close"] || 0),
        borderColor: dashboardConfig.charts.line.lineColor,
        fill: false,
      },
    ],
  };

  return (
    <Box className="dashboard-page">
      <AppBar position="static" elevation={0} className="dashboard-header-bar">
        <Toolbar className="dashboard-toolbar">
          <Typography variant="h6" className="dashboard-brand">
            FinSight
          </Typography>
        </Toolbar>
      </AppBar>

      <Container className="dashboard-container">
        <div className="dashboard-header">
          <Typography variant="h4" className="dashboard-title">
            {dashboardConfig.title}
          </Typography>

          {portfolios?.length > 0 && (
            <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
              <Button
                variant="contained"
                className="create-btn"
                onClick={() => setDialogOpen(true)}
                startIcon={<AddCircleOutline />}
              >
                {dashboardConfig.buttons.createPortfolio}
              </Button>

              <PortfolioSelector
                portfolios={portfolios}
                selectedPortfolio={selectedPortfolio}
                onChange={setSelectedPortfolio}
              />
            </Box>
          )}
        </div>

        <Divider sx={{ my: 2 }} />

        <PortfolioDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          portfolioName={portfolioName}
          setPortfolioName={setPortfolioName}
          onCreate={handleCreatePortfolio}
        />

        {(!portfolios || portfolios.length === 0) ? (
          <Box className="empty-state">
            <Typography variant="body1" color="text.secondary">
              No portfolios yet. Create one to get started.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="create-btn"
              onClick={() => setDialogOpen(true)}
              startIcon={<AddCircleOutline />}
            >
              {dashboardConfig.buttons.createPortfolio}
            </Button>
          </Box>
        ) : (
          selectedPortfolio && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <AssetForm
                  asset={asset}
                  setAsset={setAsset}
                  onAddAsset={handleAddAsset}
                  isLoading={addAsset.isPending}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Charts
                  pieData={pieData}
                  lineData={lineData}
                  selectedTicker={selectedTicker}
                  historicalLoading={historicalLoading}
                />
              </Grid>

              {portfolioData?.assets?.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <AssetTable
                      assets={portfolioData.assets}
                      onRemoveAsset={(ticker) => removeAsset.mutateAsync(ticker)}
                      onViewHistorical={setSelectedTicker}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Insights insights={insights} />
                  </Grid>
                </>
              )}
            </Grid>
          )
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;