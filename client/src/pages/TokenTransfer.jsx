import React, { useContext, useState, useEffect } from "react";
import { TransactionContext } from '../context/TransactionContext.jsx';
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Card,
  IconButton,
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { Info as InfoIcon } from '@mui/icons-material';


const CardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginTop: 0,
  },
  marginTop: theme.spacing(0),
  marginBottom: theme.spacing(0),
}));

const EthCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  height: 160,
  width: '100%',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(0),
  background: 'linear-gradient(to right, #4b0082, #191970)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  [theme.breakpoints.up('sm')]: {
    width: 450,
    height: 250,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: '2px solid white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    width: 50,
    height: 50,
  },
}));

const EthereumCard = ({ connectedAccount, shortenAddress }) => {
  return (
    <CardWrapper>
      <EthCard>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" width="100%" height="100%">
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" width="100%">
            <IconWrapper>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png" 
                alt="Ethereum Logo" 
                style={{ width: '60%', height: '60%' }}
              />
            </IconWrapper>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/471/471664.png" 
              alt="Info Icon" 
              style={{ width: 20, height: 20 }}
            />
          </Box>
          <Box mt="auto">
            <Typography variant="body1" color="white" fontWeight="light">
              {shortenAddress(connectedAccount)}
            </Typography>
            <Typography variant="h5" color="white" fontWeight="medium" mt={1}>
              Ethereum
            </Typography>
          </Box>
        </Box>
      </EthCard>
    </CardWrapper>
  );
};

const isValidEthereumAddress = (address) => {
  return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
};


  const formatAddress = (address) => {
    if (!address) return 'Not Connected';
    return `${address.slice(0, 5)}....${address.slice(-5)}`;
  };  

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    background: {
      default: '#13151F',
      paper: '#1E2130',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const FullPageBox = styled(Box)(({ theme, sidebarOpen }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(sidebarOpen && {
    width: `calc(100% - 240px)`,
    marginLeft: 240,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  border: 0,
  borderRadius: theme.spacing(1),
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
}));

const FeatureGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(4),
  '& .MuiGrid-item': {
    textAlign: 'center',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
  },
}));

function TokenTransfer({ darkMode, sidebarOpen }) {
  const { connectWallet,
    connectedAccount,
    formData,
    setFormData,
    sendTransaction,
    handleChange,
    fetchWalletNetWorth, } = useContext(TransactionContext);
  const [loading, setLoading] = useState(false);


  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // const theme = createTheme({
  //   palette: {
  //     mode: darkMode ? 'dark' : 'light',
  //     background: {
  //       default: darkMode ? '#13151F' : '#F5F5F5',
  //       paper: darkMode ? '#1E2130' : '#FFFFFF',
  //     },
  //     text: {
  //       primary: darkMode ? '#FFFFFF' : '#000000',
  //     },
  //   },
  // });
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#9c27b0',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
  });


  const handleTransfer = async (e) => {
    e.preventDefault();
    const { addressTo, amount } = formData;
    if (!/^(0x)?[0-9a-fA-F]{40}$/.test(addressTo)) return alert("Invalid Ethereum address.");
    if (amount <= 0) return alert("Amount must be greater than zero.");
    if (!addressTo || !amount) return;
    setLoading(true);
    try {
      await sendTransaction();
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <FullPageBox>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom>
              Send Crypto<br />across the world
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
            </Typography>
            <Box sx={{justifyContent: 'space-between'}}><GradientButton variant="contained" size="large" sx={{ mt: 2}} onClick={connectWallet}>
              Connect Wallet
            </GradientButton></Box>
             
            <FeatureGrid container spacing={2}>
              {['Reliability', 'Security', 'Ethereum', 'Web 3.0', 'Low fees', 'Blockchain'].map((feature) => (
                <Grid item xs={4} key={feature}>
                  <Typography variant="body2">{feature}</Typography>
                </Grid>
              ))}
            </FeatureGrid>
          </Grid>
          
          <Grid item xs={12} md={6}>
          <Box sx =   {{mb:5  }}> <EthereumCard 
    connectedAccount={connectedAccount}
    shortenAddress={formatAddress}/></Box>

            <form onSubmit={handleTransfer}>
              <StyledTextField
                fullWidth
                label="Address To"
                name="addressTo"
                value={formData.addressTo || ''}
                onChange={handleChange}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="Amount (ETH)"
                type="number"
                name="amount"
                value={formData.amount || ''}
                onChange={handleChange}
                variant="outlined"
              />
              <GradientButton
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
              >
                Send Now
              </GradientButton>
            </form>
          </Grid>
        </Grid>
      </FullPageBox>
    </ThemeProvider>
  );
}

export default TokenTransfer;