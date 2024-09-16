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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const initialTokens = [
  { symbol: "BTC", balance: (Math.random() * 2).toFixed(4) },
  { symbol: "ETH", balance: (Math.random() * 20).toFixed(4) },
  { symbol: "ADA", balance: (Math.random() * 1000).toFixed(4) },
  { symbol: "DOT", balance: (Math.random() * 100).toFixed(4) },
];

function WatchList() {
  const [tokens, setTokens] = useState([]);
  const [newToken, setNewToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Initialize with random token data
    setTokens(initialTokens);
  }, []);

  const handleAddToken = () => {
    if (newToken.trim()) {
      if (
        tokens.some(
          (token) =>
            token.symbol.toLowerCase() === newToken.trim().toLowerCase()
        )
      ) {
        setError("Token already exists in the watch list.");
        return;
      }
      const newTokenObj = {
        symbol: newToken.trim().toUpperCase(),
        balance: (Math.random() * 100).toFixed(4), // Random balance for new token
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
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom mt={2}>
        Watch List
      </Typography>
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
                secondary={`Balance: ${token.balance}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveToken(token.symbol)}
                >
                  <DeleteIcon />
                </IconButton>
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
  );
}

export default WatchList;
