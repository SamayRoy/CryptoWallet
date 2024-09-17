import React, { useState, useContext } from "react";
import { TransactionContext} from '../context/TransactionContext.jsx';
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
  const {connectWallet, connectedAccount, formData, setFormData,sendTransaction, handleChange} = useContext(TransactionContext);
  // cont [selectedToken, setSelectedToken] = useState("");

    
  const handleTransfer = (e) => {
    const {addressTo, amount, message} = formData;
    e.preventDefault(); //preventing reload

    if(!addressTo || !amount || !message) return;
    sendTransaction();
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
            name="addressTo"
            value={formData.addressTo || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            name="amount"
            value={formData.amount || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Message"
            name="message"  
            type="text"
            value={formData.message || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="keyword"
            name="keyword"  
            type="text"
            value={formData.keyword || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        {/* <Grid item xs={12}>
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
        </Grid> */}
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
