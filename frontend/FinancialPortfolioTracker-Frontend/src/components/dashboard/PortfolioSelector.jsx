import { Select, MenuItem } from "@mui/material";

const PortfolioSelector = ({ portfolios, selectedPortfolio, onChange }) => (
  <Select
    value={selectedPortfolio || ""}
    onChange={(e) => onChange(e.target.value)}
    className="portfolio-select"
  >
    {portfolios.map((p) => (
      <MenuItem key={p.id} value={p.id}>
        {p.name}
      </MenuItem>
    ))}
  </Select>
);

export default PortfolioSelector;
