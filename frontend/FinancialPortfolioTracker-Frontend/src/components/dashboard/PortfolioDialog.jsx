import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

const PortfolioDialog = ({ open, onClose, portfolioName, setPortfolioName, onCreate }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create Portfolio</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="Portfolio Name"
                fullWidth
                variant="outlined"
                value={portfolioName}
                onChange={(e) => setPortfolioName(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onCreate} variant="contained">
                Create
            </Button>
        </DialogActions>
    </Dialog>
);

export default PortfolioDialog;