import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Box,
  Alert,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";


const StyledDeleteButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.common.black,
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.common.white,
  border: theme.palette.mode === 'dark' ? 'none' : `1px solid ${theme.palette.grey[300]}`,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : theme.palette.grey[100],
  },
  '&.MuiIconButton-root': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[400] : "#2196f3",
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.mode === 'dark' ? theme.palette.grey[400] : "#2196f3",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
background: 'linear-gradient(90deg, #2196f3 0%, #9c27b0 100%)',
border: 0,
borderRadius: theme.shape.borderRadius,
color: theme.palette.common.white,
height: 48,
padding: '0 30px',
marginTop: theme.spacing(2),
}));

const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
borderRadius: '50%',
padding: theme.spacing(1),
backgroundColor: theme.palette.mode === 'dark' 
  ? theme.palette.grey[800] 
  : "#000080",
color: theme.palette.mode === 'dark'
  ? theme.palette.primary.light
  : theme.palette.primary.dark,
'&:hover': {
  backgroundColor: theme.palette.mode === 'dark' 
    ? theme.palette.grey[700] 
    : theme.palette.primary.main,
},
}));


const SunIcon = ({ width = 20.88, height = 20.88, className = '' }) => (
<svg
  width={width}
  height={height}
  viewBox="0 0 122.88 122.88"
  xmlns="http://www.w3.org/2000/svg"
  className={className}
>
  <title>sun-color</title>
  <path
    fill="#fcdb33"
    d="M30,13.21A3.93,3.93,0,1,1,36.8,9.27L41.86,18A3.94,3.94,0,1,1,35.05,22L30,13.21Zm31.45,13A35.23,35.23,0,1,1,36.52,36.52,35.13,35.13,0,0,1,61.44,26.2ZM58.31,4A3.95,3.95,0,1,1,66.2,4V14.06a3.95,3.95,0,1,1-7.89,0V4ZM87.49,10.1A3.93,3.93,0,1,1,94.3,14l-5.06,8.76a3.93,3.93,0,1,1-6.81-3.92l5.06-8.75ZM109.67,30a3.93,3.93,0,1,1,3.94,6.81l-8.75,5.06a3.94,3.94,0,1,1-4-6.81L109.67,30Zm9.26,28.32a3.95,3.95,0,1,1,0,7.89H108.82a3.95,3.95,0,1,1,0-7.89Zm-6.15,29.18a3.93,3.93,0,1,1-3.91,6.81l-8.76-5.06A3.93,3.93,0,1,1,104,82.43l8.75,5.06ZM92.89,109.67a3.93,3.93,0,1,1-6.81,3.94L81,104.86a3.94,3.94,0,0,1,6.81-4l5.06,8.76Zm-28.32,9.26a3.95,3.95,0,1,1-7.89,0V108.82a3.95,3.95,0,1,1,7.89,0v10.11Zm-29.18-6.15a3.93,3.93,0,0,1-6.81-3.91l5.06-8.76A3.93,3.93,0,1,1,40.45,104l-5.06,8.75ZM13.21,92.89a3.93,3.93,0,1,1-3.94-6.81L18,81A3.94,3.94,0,1,1,22,87.83l-8.76,5.06ZM4,64.57a3.95,3.95,0,1,1,0-7.89H14.06a3.95,3.95,0,1,1,0,7.89ZM10.1,35.39A3.93,3.93,0,1,1,14,28.58l8.76,5.06a3.93,3.93,0,1,1-3.92,6.81L10.1,35.39Z"
  />
</svg>
);



const MoonIcon = () => (
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17 11.5C15.8 15.5 11.9 18.2 7.9 17.9C3.9 17.6 0.699997 14.4 0.399997 10.4C0.0999974 6.4 2.8 2.5 6.8 1.3C6.3 2.7 6.2 4.2 6.5 5.6C7 8.1 8.9 10 11.4 10.5C12.8 10.8 14.3 10.7 15.7 10.2C16.5 10.6 16.8 11.1 17 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
);

// Fetch CoinGecko token prices by ids (CoinGecko uses different ids than symbols)
const fetchTokenPrice = async (id) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
    );
    const data = await response.json();
    return data[id]?.usd || null;
  } catch (error) {
    console.error("Error fetching token price:", error);
    return null;
  }
};

// Map token symbols to CoinGecko ids (only a subset here, but you can expand this)
const tokenSymbolToId = {
  BTC: "bitcoin",
  ETH: "ethereum",
  ADA: "cardano",
  DOT: "polkadot",
};

const initialTokens = [
  { symbol: "BTC", balance: (Math.random() * 2).toFixed(4) },
  { symbol: "ETH", balance: (Math.random() * 20).toFixed(4) },
  { symbol: "ADA", balance: (Math.random() * 1000).toFixed(4) },
  { symbol: "DOT", balance: (Math.random() * 100).toFixed(4) },
];

export default function WatchList() {
  const [darkMode, setDarkMode] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [newToken, setNewToken] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState('light');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };
  
  const theme = React.useMemo(
  () =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        background: {
          default: darkMode ? '#121212' : '#ffffff',
          paper: darkMode ? '#1e1e1e' : '#ffffff',
        },
        text: {
          primary: darkMode ? '#ffffff' : '#000000',
          secondary: darkMode ? '#b3b3b3' : '#666666',
        },
      },
    }),
  [darkMode],
  );

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  useEffect(() => {
    // Initialize with initial token data, and fetch their prices
    const fetchInitialPrices = async () => {
      const updatedTokens = await Promise.all(
        initialTokens.map(async (token) => {
          const price = await fetchTokenPrice(tokenSymbolToId[token.symbol]);
          return { ...token, price };
        })
      );
      setTokens(updatedTokens);
    };
    fetchInitialPrices();
  }, []);

  const handleAddToken = async () => {
    if (newToken.trim()) {
      const tokenSymbol = newToken.trim().toUpperCase();

      if (tokens.some((token) => token.symbol === tokenSymbol)) {
        setError("Token already exists in the watch list.");
        return;
      }

      const tokenId = tokenSymbolToId[tokenSymbol];
      if (!tokenId) {
        setError("Invalid token symbol or not supported.");
        return;
      }

      const price = await fetchTokenPrice(tokenId);
      const newTokenObj = {
        symbol: tokenSymbol,
        balance: (Math.random() * 100).toFixed(4), // Simulated random balance
        price,
      };

      setTokens([...tokens, newTokenObj]);
      setNewToken("");
      setError("");
    } else {
      setError("Please enter a valid token symbol.");
    }
  };

  const handleRemoveToken = (symbol) => {
    setTokens(tokens.filter((token) => token.symbol !== symbol));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2}>
          <Typography variant="h3" component="h1">
            Watch List
          </Typography>
          <ThemeToggleButton onClick={handleThemeChange}>
        {darkMode ? <MoonIcon /> : <SunIcon />}
      </ThemeToggleButton>
        </Box>
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}
        {tokens && tokens.length > 0 ? (
          <List>
            {tokens.map((token) => (
              <ListItem key={token.symbol}>
                <ListItemText
                  primary={token.symbol}
                  secondary={`Balance: ${token.balance}, Price: $${token.price}`}
                />
                <ListItemSecondaryAction>
                  <StyledDeleteButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveToken(token.symbol)}
                  >
                    <DeleteIcon />
                  </StyledDeleteButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No tokens in your watch list yet.</Typography>
        )}
        <Box mt={2} display="flex" alignItems="center">
          <TextField
            label="Add new token"
            value={newToken}
            onChange={(e) => setNewToken(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddToken()}
            fullWidth
            margin="normal"
          />
          <Button
            onClick={handleAddToken}
            variant="contained"
            color="primary"
            style={{ marginLeft: "10px" }}
          >
            Add
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}