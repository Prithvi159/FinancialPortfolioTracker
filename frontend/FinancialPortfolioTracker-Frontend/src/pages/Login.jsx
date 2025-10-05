import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Divider,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormRenderer from "../components/FormRenderer";
import loginConfig from "../json/login.json";
import { useLoginMutation, useRegisterMutation } from "../api/hooks";
import { setToken } from "../redux/slice/authSlice";
import "./login.css"

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const handleSubmit = async () => {
    setError("");
    try {
      if (isRegister) {
        await registerMutation.mutateAsync(form);
        setError("Registered successfully. Please login.");
        setIsRegister(false);
      } else {
        const token = await loginMutation.mutateAsync(form);
        dispatch(setToken(token));
        navigate("/dashboard");
      }
    } catch {
      setError(isRegister ? "Registration failed" : "Invalid credentials");
    }
  };

  return (
    <Box className="login-page">
      <AppBar position="static" elevation={0} className="login-header">
        <Toolbar className="login-toolbar">
          <Typography variant="h6" className="login-brand">
            FinSight
          </Typography>
        </Toolbar>
      </AppBar>

      <Box className="login-wrapper">
        <Container maxWidth="xs">
          <Paper elevation={8} className="login-card">
            <Typography
              variant="h4"
              align="center"
              fontWeight={600}
              sx={{ color: "primary.main", mb: 3 }}
            >
              {isRegister ? loginConfig.title.register : loginConfig.title.login}
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Box className="form-section">
              <FormRenderer
                fields={loginConfig.fields}
                values={form}
                onChange={(name, value) => setForm({ ...form, [name]: value })}
              />
            </Box>

            {error && (
              <Alert severity="error" sx={{ mt: 2, fontSize: "0.9rem" }}>
                {error}
              </Alert>
            )}

            <Box className="button-section">
              <Button
                onClick={handleSubmit}
                disabled={loginMutation.isPending || registerMutation.isPending}
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                className="login-button"
              >
                {isRegister
                  ? loginConfig.buttons.submit.register
                  : loginConfig.buttons.submit.login}
              </Button>

              <Button
                onClick={() => setIsRegister(!isRegister)}
                color="secondary"
                fullWidth
                className="toggle-btn"
              >
                {isRegister
                  ? loginConfig.buttons.toggle.register
                  : loginConfig.buttons.toggle.login}
              </Button>
            </Box>

            {(loginMutation.isPending || registerMutation.isPending) && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CircularProgress color="primary" />
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
