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
import React from 'react';
import { 
  Box, 
  Typography, 
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  Switch,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Dashboard as DashboardIcon, 
  SwapHoriz as TransferIcon, 
  Settings as SettingsIcon,
} from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useLocation } from "react-router-dom";


// const Sidebar = ({ darkMode, toggleTheme, sidebarOpen, setSidebarOpen }) => {
//   const location = useLocation();

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           width: 240,
//           bgcolor: 'background.paper',
//           height: '100vh',
//           p: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           borderRadius: '0px 10px 10px 0px',
//           boxShadow: darkMode ? '0 0 20px rgba(0, 0, 0, 0.5)' : '0 0 20px rgba(0, 0, 0, 0.1)',
//           position: 'fixed',
//           left: sidebarOpen ? 0 : -240,
//           transition: 'left 0.3s ease',
//           zIndex: 1100,
//         }}
//       > 
//         <Typography variant="h5" sx={{ mt: 1, mb: 1, color: 'text.primary', alignItems: 'center' }}>CryptoNite
            
//         </Typography>
//         <IconButton
//         onClick={toggleSidebar}
//         sx={{
//           position: 'fixed',
//           left: sidebarOpen ? 240 : 20,
//           top: 20,
//           transition: 'left 0.3s ease',
//           zIndex: 1200,
//         }}
//       >
//         {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
//       </IconButton>
        
//         <List sx={{ flexGrow: 1 }}>
//           {[
//             { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
//             { text: 'Transfer', icon: <TransferIcon />, path: '/transfer' },
//             { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
//           ].map((item) => (
//             <ListItemButton
//               key={item.text}
//               component={RouterLink}
//               to={item.path}
//               selected={location.pathname === item.path}
//               sx={{
//                 '&.Mui-selected': {
//                   bgcolor: 'action.selected',
//                   '& .MuiListItemIcon-root': {
//                     color: 'primary.main',
//                   },
//                   '& .MuiListItemText-primary': {
//                     color: 'primary.main',
//                   },
//                 },
//                 '&:hover': { 
//                   bgcolor: 'action.hover',
//                 },
//                 '& .MuiListItemIcon-root': {
//                   color: 'text.primary',
//                 },
//                 '& .MuiListItemText-primary': {
//                   color: 'text.primary',
//                 },
//                 borderRadius: '12px',
//                 mb: 1,
//                 transition: 'background-color 0.3s ease, color 0.3s ease',
//                 boxShadow: location.pathname === item.path ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
//               }}
//             >
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           ))}
//         </List>
//         <Box sx={{ display: 'flex', justifyContent: 'left', mt: 2, alignItems: 'center' }}>
//           <ThemeSwitch checked={darkMode} onChange={toggleTheme} />
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Sidebar;


const Sidebar = ({ darkMode, toggleTheme, sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    return (
      <>
        <Box
          sx={{
            width: 240,
            bgcolor: 'background.paper',
            height: '100vh',
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '0px 10px 10px 0px',
            boxShadow: darkMode ? '0 0 20px rgba(0, 0, 0, 0.5)' : '0 0 20px rgba(0, 0, 0, 0.1)',
            position: 'fixed',
            left: sidebarOpen ? 0 : -240,  // Moves the sidebar in and out of view
            transition: 'left 0.3s ease',
            zIndex: 1100,
          }}
        >
          <Typography variant="h5" sx={{ color: 'text.primary', alignItems: 'center' }}>CryptoNite</Typography>
          <IconButton
            onClick={toggleSidebar}
            sx={{
              position: 'fixed',
              left: sidebarOpen ? 240 : 20,  // Adjust icon button position based on sidebar state
              top: 20,
              transition: 'left 0.3s ease',
              zIndex: 1200,
              ml: { md: 1}
            }}
          >
            {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
  
          <List sx={{ flexGrow: 1 }}>
            {[
              { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
              { text: 'Transfer', icon: <TransferIcon />, path: '/transfer' },
              { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
            ].map((item) => (
              <ListItemButton
                key={item.text}
                component={RouterLink}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'action.selected',
                    '& .MuiListItemIcon-root': { color: 'primary.main' },
                    '& .MuiListItemText-primary': { color: 'primary.main' },
                  },
                  '&:hover': { bgcolor: 'action.hover' },
                  '& .MuiListItemIcon-root': { color: 'text.primary' },
                  '& .MuiListItemText-primary': { color: 'text.primary' },
                  borderRadius: '12px',
                  mb: 1,
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                  boxShadow: location.pathname === item.path ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
  
          <Box sx={{ display: 'flex', justifyContent: 'left', mt: 2, alignItems: 'center' }}>
            <ThemeSwitch checked={darkMode} onChange={toggleTheme} />
          </Box>
        </Box>
      </>
    );
  };
  
  const Layout = ({ darkMode, toggleTheme, sidebarOpen, setSidebarOpen, children }) => {
    return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: sidebarOpen ? '240px' : '0px',  // Adjust the margin to push content
            transition: 'margin-left 0.3s ease',
            padding: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    );
  };
  
  export default Layout;