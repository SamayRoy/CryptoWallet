import React, { useState, useEffect, useContext } from "react";
import { TransactionContext} from '../context/TransactionContext.jsx'
import {
  Container,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Button,
  Box
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TabletButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  padding: '10px 30px',
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
  transition: 'background-color 0.3s ease',
}));

function Dashboard() {
  const [portfolioValue, setPortfolioValue] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);

  const {connectWallet, connectedAccount, formData,setFormData, sendTransaction, handleChange} = useContext(TransactionContext);

  useEffect(() => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Generate random portfolio value between 5000 and 50000
      const randomValue = Math.floor(Math.random() * (50000 - 5000 + 1) + 5000);
      setPortfolioValue(randomValue);

      // Generate random historical data
      const labels = ["January", "February", "March", "April", "May"];
      const data = labels.map(() =>
        Math.floor(Math.random() * (randomValue - 1000 + 1) + 1000)
      );

      setHistoricalData({
        labels: labels,
        datasets: [
          {
            label: "Portfolio Value",
            data: data,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    }, 1000); // Simulate 1 second delay
  }, []);

  if (portfolioValue === null || historicalData === null) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6">Total Portfolio Value</Typography>
            <Typography variant="h4">
              ${portfolioValue.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6">Historical Performance</Typography>
            <Line data={historicalData} />
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
        {1 && (<TabletButton variant="contained" onClick={connectWallet}>
          Connect Wallet
        </TabletButton>)}
      </Box>
    </Container>
  );
}

export default Dashboard; 