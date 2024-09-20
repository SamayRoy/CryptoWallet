import React, { useState } from 'react';
import { ethers } from 'ethers';
import moment from 'moment';
import { Box, Typography, CircularProgress, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const { ethereum } = window;

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #2196f3 0%, #9c27b0 100%)',
  border: 0,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.common.white,
  height: 48,
  padding: '0 30px',
  marginTop: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  marginTop: theme.spacing(0.5),
  '& .MuiOutlinedInput-root': {
    borderRadius: '70px',
    '& fieldset': {
      borderColor: theme.palette.primary.main,
      borderRadius: '70px',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 20px',
  },
}));

const EthereumBlockFinder = () => {
  const [block, setBlock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [targetTimestamp, setTargetTimestamp] = useState('');

  const findNearestBlock = async (timestamp) => {
    setLoading(true);
    setError(null);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const targetTime = timestamp ? moment.unix(timestamp).utc() : moment.utc().startOf('day');
      const targetTimestamp = targetTime.unix();
      
      let averageBlockTime = 17 * 1.5;
      const currentBlockNumber = await provider.getBlockNumber();
      let block = await provider.getBlock(currentBlockNumber);
      let requestsMade = 0;
      let blockNumber = currentBlockNumber;

      while (block.timestamp > targetTimestamp) {
        let decreaseBlocks = Math.floor((block.timestamp - targetTimestamp) / averageBlockTime);
        if (decreaseBlocks < 1) break;
        blockNumber -= decreaseBlocks;
        block = await provider.getBlock(blockNumber);
        requestsMade += 1;
      }

      console.log("Target timestamp:", targetTimestamp);
      console.log("Target date:", targetTime.toDate().toUTCString());
      console.log("Block timestamp:", block.timestamp);
      console.log("Block date:", new Date(block.timestamp * 1000).toUTCString());
      console.log("Requests made:", requestsMade);

      setBlock(block);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    findNearestBlock(targetTimestamp);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Ethereum Block Finder</Typography>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          fullWidth
          label="Target Timestamp (Unix)"
          type="number"
          value={targetTimestamp}
          onChange={(e) => setTargetTimestamp(e.target.value)}
          helperText="Leave empty for current day"
        />
        <StyledButton
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
        >
          Find Nearest Block
        </StyledButton>
      </form>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {block && (
        <Box mt={2}>
          <Typography variant="h6">Nearest Ethereum Block</Typography>
          <Typography>Block Number: {block.number}</Typography>
          <Typography>Timestamp: {block.timestamp}</Typography>
          <Typography>Date: {new Date(block.timestamp * 1000).toUTCString()}</Typography>
        </Box>
      )}
    </Box>
  );
};

export { EthereumBlockFinder };