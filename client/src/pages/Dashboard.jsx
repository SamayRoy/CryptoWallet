import React, { useState,useEffect, useContext  } from 'react';
import { TransactionContext } from '../context/TransactionContext.jsx';


import * as Popover from '@radix-ui/react-popover';
import { Line } from 'react-chartjs-2';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { 
  Box, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Grid,
  Switch,
  IconButton,
  Select,
  MenuItem, 
  CircularProgress,
  Avatar,
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { 
  Dashboard as DashboardIcon, 
  SwapHoriz as TransferIcon, 
  Settings as SettingsIcon,
} from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from "react-router-dom";
import axios from 'axios';

const SimpleLineChart = ({ address, fromDate }) => {
  const [balanceHistory, setBalanceHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalanceHistory = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/wallet-history', {
          params: {
            address: address,
            from_date: moment(fromDate).unix()
          }
        });
        setBalanceHistory(response.data.balance_history);
        setError(null);
      } catch (error) {
        console.error('Error fetching balance history:', error);
        setError('Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    if (address && fromDate && toDate) {
      fetchBalanceHistory();
    }
  }, [address, fromDate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (balanceHistory.length === 0) return <div>No data available</div>;

  const width = 600;
  const height = 300;
  const padding = 40;

  const xScale = (index) => (index / (balanceHistory.length - 1)) * (width - 2 * padding) + padding;
  const yScale = (value) => height - ((value - minBalance) / (maxBalance - minBalance)) * (height - 2 * padding) - padding;

  const minBalance = Math.min(...balanceHistory.map(item => item.balance));
  const maxBalance = Math.max(...balanceHistory.map(item => item.balance));

  const pathData = balanceHistory.map((item, index) => 
    `${index === 0 ? 'M' : 'L'} ${xScale(index)} ${yScale(item.balance)}`
  ).join(' ');

  return (
    <svg width={width} height={height}>
      {/* X and Y axes */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="black" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="black" />
      
      {/* Data line */}
      <path d={pathData} fill="none" stroke="blue" strokeWidth="2" />

      {/* Data points */}
      {balanceHistory.map((item, index) => (
        <circle
          key={index}
          cx={xScale(index)}
          cy={yScale(item.balance)}
          r="4"
          fill="red"
        />
      ))}

      {/* X-axis labels */}
      {balanceHistory.map((item, index) => (
        index % Math.ceil(balanceHistory.length / 5) === 0 && (
          <text
            key={index}
            x={xScale(index)}
            y={height - padding + 20}
            textAnchor="middle"
            fontSize="12"
          >
            {moment.unix(item.date).format('YYYY/MM/DD')}
          </text>
        )
      ))}

      {/* Y-axis labels */}
      {[0, 0.25, 0.5, 0.75, 1].map((percent) => {
        const value = minBalance + (maxBalance - minBalance) * percent;
        return (
          <text
            key={percent}
            x={padding - 10}
            y={yScale(value)}
            textAnchor="end"
            fontSize="12"
            dominantBaseline="middle"
          >
            {value.toFixed(2)}
          </text>
        );
      })}
    </svg>
  );
};




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

const FullPageBox = styled(Box)(({ theme }) => ({
  maxHeight: '100vh',
  height: '95vh',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  maxWidth: '20000px',  
  margin: '0 auto',
  width: '100%',
}));

const popularCoins = [
  { name: 'Tether USD', address: '0xdac17f958d2ee523a2206206994597c13d831ec7' },
  { name: 'USD Coin', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
  { name: 'ETH', address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84' },
  { name: 'Polygon', address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0' },
  {name: 'Bitcoin', address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'},
  {name: 'Chainlink', address: '0x514910771af9ca656af840dff83e8264ecf986ca'},
  {name: 'Uniswap', address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'},
  {name: 'Litecoin', address: '0x6b175474e89094c44da98b954eedeac495271d0f'},
];

const ContentGrid = styled(Grid)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  scrollbarWidth: 'none', 
  'msOverflowStyle': 'none',
}));

const ScrollableBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'hidden',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none', 
  'msOverflowStyle': 'none', 
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


const Dashboard = ({ darkMode, sidebarOpen }) => {
  
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [fromdate, setfromdate] = useState(0);
  const [testdate, setTestdate] = useState(new Date());
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const { connectWallet,
      connectedAccount,
      formData,
      setFormData,
      sendTransaction,
      handleChange,
      fetchWalletNetWorth,
      walletNetWorth } = useContext(TransactionContext);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
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

  const StyledButton2 = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#333333' : '#2196f3',  // Dark mode: dark gray, Light mode: blue
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    height: 48,
    padding: '0 30px',
    marginTop: theme.spacing(2),
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#555555' : '#9c27b0',  // Border color based on theme mode
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? '#444444' : '#1e88e5',  // Dark mode: hover dark gray, Light mode: hover blue
    },
  }));
  
  // const MiniCalendar = () => {
  //   const [date, setDate] = useState(new Date());
  //   const [walletHistory, setWalletHistory] = useState(null);

  
  //   const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  //   const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    

  
  //   const handleDateClick = (day) => {
  //     setDate(new Date(date.getFullYear(), date.getMonth(), day));
  //   };
  //   const formattedDate = newDate.toISOString().split('T')[0];  
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/wallet-history', {
  //       params: {
  //         address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', 
  //         from_date: formattedDate,
  //       }
  //     });
  //     setWalletHistory(response.data);
  //     console.log('Wallet History:', response.data);
  //   } catch (error) {
  //     console.error('Error fetching wallet history:', error);
  //   }
  // };

  
  //   const renderCalendar = () => {
  //     const days = [];
  //     for (let i = 0; i < firstDayOfMonth; i++) {
  //       days.push(<div key={`empty-${i}`} className="empty-day"></div>);
  //     }
  //     for (let i = 1; i <= daysInMonth; i++) {
  //       days.push(
  //         <div
  //           key={i}
  //           onClick={() => handleDateClick(i)}
  //           className={`day ${i === date.getDate() ? 'selected' : ''}`}
  //         >
  //           {i}
  //         </div>
  //       );
  //     }
  //     return days;
  //   };
  //   return (
  //     <div className={`calendar-container ${theme}`}>
  //       <Popover.Root>
  //         <Popover.Trigger asChild>
  //           <StyledButton2 startIcon={<CalendarMonthIcon />}>
  //     {date.toDateString()}
  //   </StyledButton2>
  //         </Popover.Trigger>
  //         <Popover.Portal>
  //           <Popover.Content className="calendar-popup">
  //             <div className="calendar-header">
  //               <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}>
  //                 &lt;
  //               </button>
  //               <span>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
  //               <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}>
  //                 &gt;
  //               </button>
  //             </div>
  //             <div className="calendar-grid">
  //               <div>Sun</div>
  //               <div>Mon</div>
  //               <div>Tue</div>
  //               <div>Wed</div>
  //               <div>Thu</div>
  //               <div>Fri</div>
  //               <div>Sat</div>
  //               {renderCalendar()}
  //             </div>
  //           </Popover.Content>
  //         </Popover.Portal>
  //       </Popover.Root>
  //       <style jsx>{`
  //         .calendar-container {
  //           font-family: Arial, sans-serif;
  //           display: inline-block;
  //           padding: 20px;
  //           border-radius: 8px;
  //           transition: all 0.3s ease;
  //         }
  //         .calendar-container.light {
  //           background-color: #ffffff;
  //           color: #333333;
  //         }
  //         .calendar-container.dark {
  //           background-color: #333333;
  //           color: #ffffff;
  //         }
  //         .theme-toggle {
  //           background: "ffffff";
  //           border: none;
  //           cursor: pointer;
  //           margin-bottom: 10px;
  //         }
  //         .date-button {
  //           display: flex;
  //           align-items: center;
  //           padding: 10px;
  //           border: 1px solid #ccc;
  //           border-radius: 4px;
  //           cursor: pointer;
  //           background: none;
  //           color: inherit;
  //         }
  //         .calendar-icon {
  //           margin-right: 8px;
  //         }
  //         .calendar-popup {
  //           background-color: inherit;
  //           border: 1px solid #ccc;
  //           border-radius: 4px;
  //           padding: 10px;
  //         }
  //         .calendar-header {
  //           display: flex;
  //           justify-content: space-between;
  //           margin-bottom: 10px;
  //         }
  //         .calendar-grid {
  //           display: grid;
  //           grid-template-columns: repeat(7, 1fr);
  //           gap: 5px;
  //         }
  //         .day {
  //           padding: 5px;
  //           text-align: center;
  //           cursor: pointer;
  //           border-radius: 50%;
  //         }
  //         .day:hover {
  //           background-color: #f0f0f0;
  //         }
  //         .day.selected {
  //           background-color: #007bff;
  //           color: white;
  //         }
  //         .empty-day {
  //           padding: 5px;
  //         }
  //       `}</style>
  //     </div>
  //   );
  // };

  const WalletBalanceChart = ({ address, fromDate }) => {
    const [balanceHistory, setBalanceHistory] = useState([]);
  
    useEffect(() => {
      const fetchBalanceHistory = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/wallet-history', {
            params: {
              address: address,
              from_date: fromDate,
            }
          });
          setBalanceHistory(response.data.balance_history);
        } catch (error) {
          console.error('Error fetching balance history:', error);
        }
      };
  
      if (address && fromDate) {
        fetchBalanceHistory();
      }
    }, [address, fromDate]);
  
    const chartData = {
      labels: balanceHistory.map(item => item.date),
      datasets: [
        {
          label: 'Wallet Balance',
          data: balanceHistory.map(item => item.balance),
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Wallet Balance History',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Balance',
          },
        },
      },
    };
  
    return (
      <Line data={chartData} options={options} />
    );
  };
  

  const MiniCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [walletHistory, setWalletHistory] = useState(null);
  
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
    const handleDateClick = async (day) => {
      const newDate = new Date(date.getFullYear(), date.getMonth(), day);
      setDate(newDate);
      setTestdate(newDate);
      const formattedDate = newDate.toISOString().split('T')[0];
      setfromdate(formattedDate);
      try {
        const response = await axios.get('http://localhost:5000/api/wallet-history', {
          params: {
            address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', 
            from_date: formattedDate,
          }
        });
        setWalletHistory(response.data);
        console.log('Wallet History:', response.data);
      } catch (error) {
        console.error('Error fetching wallet history:', error);
      }
    };
  
    const renderCalendar = () => {
      const days = [];
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="empty-day"></div>);
      }
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(
          <div
            key={i}
            onClick={() => handleDateClick(i)}
            className={`day ${i === date.getDate() ? 'selected' : ''}`}
          >
            {i}
          </div>
        );
      }
      return days;
    };
  
    return (
      <div className={`calendar-container ${theme}`}>
        <Popover.Root>
          <Popover.Trigger asChild>
            <StyledButton2 startIcon={<CalendarMonthIcon />}>
              {date.toDateString()}
            </StyledButton2>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="calendar-popup">
              <div className="calendar-header">
                <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}>
                  &lt;
                </button>
                <span>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}>
                  &gt;
                </button>
              </div>
              <div className="calendar-grid">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                {renderCalendar()}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        {walletHistory && (
          <div className="wallet-history">
            <h3>Wallet History</h3>
            <pre>{JSON.stringify(walletHistory, null, 2)}</pre>
          </div>
        )}
        <style jsx>{`
          .calendar-container {
            font-family: Arial, sans-serif;
            display: inline-block;
            padding: 20px;
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          .calendar-container.light {
            background-color: #ffffff;
            color: #333333;
          }
          .calendar-container.dark {
            background-color: #333333;
            color: #ffffff;
          }
          .calendar-popup {
            background-color: inherit;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 10px;
          }
          .calendar-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 5px;
          }
          .day {
            padding: 5px;
            text-align: center;
            cursor: pointer;
            border-radius: 50%;
          }
          .day:hover {
            background-color: #f0f0f0;
          }
          .day.selected {
            background-color: #007bff;
            color: white;
          }
          .empty-day {
            padding: 5px;
          }
          .wallet-history {
            margin-top: 20px;
          }
        `}</style>
      </div>
    );
  };

  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '98vh' }}>
        <FullPageBox>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            
              <Typography variant="h4" sx={{mb: 1, color: 'text.primary', alignItems: 'center'}} >Portfolio</Typography>
              <Box sx={{justifyContent: 'space-between', alignItems: 'right'}}><GradientButton variant="contained" size="medium" sx={{ mt: 1}} onClick={connectWallet}>
              Connect Wallet
            </GradientButton></Box>
            
          </Box>          
          <ContentGrid container spacing={3} sx={{ flexGrow: 1 }}>
            <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
               <Paper sx={{ p: 2, mb: 1, flexGrow: 1, position: 'relative' }}>
  <Typography variant="h6" gutterBottom>
    Networth
  </Typography>
  <Typography variant="h4" gutterBottom>
    ${walletNetWorth}
  </Typography>
  
  {/* MiniCalendar positioned in the top-right corner */}
  <Box sx={{ position: 'absolute', top: 1, right: 16 }}>
    <MiniCalendar />
  </Box>

  {/* Chart or other content */}
  <Box sx={{ mt: 2, height: 300 }}>
  <SimpleLineChart address={connectedAccount} fromDate={testdate} />
  </Box>
</Paper>

              <Paper sx={{ p: 2, flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                {/* Add recent activity content here */}
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Paper sx={{ p: 2, mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom>Wallet</Typography>
                <AssetAllocation />
                <Typography variant="h4">$91,008.25</Typography>
                <Typography variant="body2">9 assets</Typography>
              </Paper>
              <Paper sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flexGrow: 1}}>
                <Typography variant="h5" gutterBottom>Watch List</Typography>
                  <ActiveAssets />
                </Box>
              </Paper>
            </Grid>
          </ContentGrid>
        </FullPageBox>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;

// const StyledButton = styled(Button)(({ theme }) => ({
//   background: 'linear-gradient(90deg, #2196f3 0%, #9c27b0 100%)',
//   border: 0,
//   borderRadius: theme.shape.borderRadius,
//   color: theme.palette.common.white,
//   height: 48,
//   padding: '0 30px',
//   marginTop: theme.spacing(2),
// }));

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(90deg, #333333 0%, #555555 100%)'
    : 'linear-gradient(90deg, #2196f3 0%, #9c27b0 100%)',
  border: 0,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.common.white,
  height: 48,
  padding: '0 30px',
  marginTop: theme.spacing(2),
  '&:hover': {
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(90deg, #444444 0%, #666666 100%)'
      : 'linear-gradient(90deg, #1e88e5 0%, #8e24aa 100%)',
  },
}));

const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const Sidebar = ({ activeItem, setActiveItem, darkMode, toggleTheme }) => {
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: 'background.paper',
        height: '100vh',
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0px 30px 30px 0px',
        boxShadow: darkMode ? '0 0 20px rgba(0, 0, 0, 0.5)' : '0 0 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" sx={{ mt: 1, mb: 1, color: 'text.primary', alignItems: 'center' }}>CryptoNite</Typography>
      <List sx={{ flexGrow: 1 }}>
      {['Dashboard', 'Transfer', 'Settings'].map((text) => (
        <ListItemButton
          key={text}
          onClick={() => text !== 'Transfer' && setActiveItem(text)}
          selected={activeItem === text}
          component={text === 'Transfer' ? RouterLink : 'button'}
          to={text === 'Transfer' ? "/transfer" : undefined}
          sx={{
            '&.Mui-selected': {
              bgcolor: 'action.selected',
              '& .MuiListItemIcon-root': {
                color: 'primary.main',
              },
              '& .MuiListItemText-primary': {
                color: 'primary.main',
              },
            },
            '&:hover': { 
              bgcolor: 'action.hover',
            },
            '& .MuiListItemIcon-root': {
              color: 'text.primary',
            },
            '& .MuiListItemText-primary': {
              color: 'text.primary',
            },
            borderRadius: '12px',
            mb: 1,
            transition: 'background-color 0.3s ease, color 0.3s ease',
            boxShadow: activeItem === text ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
          }}
        >
          <ListItemIcon>
            {text === 'Dashboard' && <DashboardIcon />}
            {text === 'Transfer' && <TransferIcon />}
            {text === 'Settings' && <SettingsIcon />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
    </List>

      <Box sx={{ display: 'flex', justifyContent: 'left', mt: 2, alignItems: 'center' }}>
        <ThemeSwitch checked={darkMode} onChange={toggleTheme} />
      </Box>
    </Box>
  );
};

const BarChart = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  height: '200px',
  '& .bar': {
    width: '30px',
    marginRight: '10px',
    background: theme.palette.primary.main,
    transition: 'height 0.3s ease',
  }
}));

const BalanceChart = () => {
  const data = [3000, 2800, 3200, 3100, 3400, 3092];
  const max = Math.max(...data);

  return (
    <BarChart>
      {data.map((value, index) => (
        <div 
          key={index} 
          className="bar" 
          style={{ height: `${(value / max) * 100}%` }}
          title={`$${value}`}
        />
      ))}
    </BarChart>
  );
};

const AssetAllocation = styled(Box)(({ theme }) => ({
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  background: 'conic-gradient(#627EEA 0deg 81.36deg, #F7931A 81.36deg 117deg, #26A17B 117deg 183.24deg, #F3BA2F 183.24deg 219.6deg, #C3A634 219.6deg 278.4deg, #8C8C8C 278.4deg 360deg)',
  marginBottom: theme.spacing(2),
}));

const ActiveAssets = () => {
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCoins.length > 0) {
      fetchAssetData();
    }
  }, [selectedCoins]);

  const fetchAssetData = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/getTokenPrices', {
        tokens: selectedCoins
      });
      
      const formattedAssets = Object.values(response.data).map(token => ({
        name: token.tokenName,
        symbol: token.tokenSymbol,
        icon: token.tokenLogo,
        price: `$${parseFloat(token.usdPrice).toFixed(6)}`,
        change: parseFloat(token['24hrPercentChange']).toFixed(2)
      }));
      
      setAssets(formattedAssets);
    } catch (error) {
      console.error('Error fetching asset data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCoinSelection = (event) => {
    setSelectedCoins(event.target.value);
  };

  return (
    <div >
      <Select
        multiple
        value={selectedCoins}
        onChange={handleCoinSelection}
        renderValue={(selected) => selected.map(coin => coin.name).join(', ')}
        sx={{ mb: 2, width: 300 }}
      >
        {popularCoins.map((coin) => (
          <MenuItem key={coin.address} value={coin}>
            {coin.name}
          </MenuItem>
        ))}
      </Select>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Currency</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">24H %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.symbol}>
                  <TableCell component="th" scope="row">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={asset.icon} alt={asset.name} sx={{ width: 24, height: 24, marginRight: 1 }} />
                      {asset.name} ({asset.symbol})
                    </div>
                  </TableCell>
                  <TableCell align="right">{asset.price}</TableCell>
                  <TableCell align="right" sx={{ color: parseFloat(asset.change) > 0 ? 'success.main' : 'error.main' }}>
                    {parseFloat(asset.change) > 0 ? '+' : ''}{asset.change}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};