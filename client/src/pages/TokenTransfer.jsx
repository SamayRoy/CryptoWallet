import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

const availableTokens = [
  { symbol: "BTC", balance: 1.5 },
  { symbol: "ETH", balance: 10 },
  { symbol: "ADA", balance: 1000 },
  { symbol: "DOT", balance: 100 },
];

function TokenTransfer() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("");

  const handleTransfer = () => {
    console.log(`Transferring ${amount} ${selectedToken} to ${recipient}`);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom mt={3}>
        Token Transfer
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} mt={1}>
          <TextField
            fullWidth
            label="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="token-select-label">Token</InputLabel>
            <Select
              labelId="token-select-label"
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              input={<OutlinedInput label="Token" />}
            >
              {availableTokens.map((token) => (
                <MenuItem key={token.symbol} value={token.symbol}>
                  {token.symbol} (Balance: {token.balance})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleTransfer}>
            Transfer
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TokenTransfer;
