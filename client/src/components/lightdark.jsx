// StyledButtons.jsx
import { Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #2196f3 0%, #9c27b0 100%)',
  border: 0,
  borderRadius: '70px',
  color: theme.palette.common.white,
  height: 48,
  padding: '0 30px',
  marginTop: theme.spacing(2),
}));

export const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
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