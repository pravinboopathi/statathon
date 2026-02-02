import { createTheme } from '@mui/material/styles';

// Official Indian Government Color Palette (based on MoSPI and india.gov.in)
const govColors = {
  // Primary Government Blue (Navy Blue from official websites)
  primary: {
    main: '#003366', // Deep Navy Blue
    light: '#1565C0',
    dark: '#001E3C',
    contrastText: '#FFFFFF',
  },
  // Secondary Orange (Official India.gov.in accent)
  secondary: {
    main: '#FF6600', // Government Orange
    light: '#FF8F39',
    dark: '#CC5200',
    contrastText: '#FFFFFF',
  },
  // Success Green (Indian flag inspired)
  success: {
    main: '#138808', // Indian flag green
    light: '#4CAF50',
    dark: '#0D5D04',
    contrastText: '#FFFFFF',
  },
  // Background colors (Clean government standard)
  background: {
    default: '#F6F8FA', // Light grey background
    paper: '#FFFFFF',
    grey: '#F0F2F5',
    dark: '#E8EAED',
  },
  // Text colors (Professional hierarchy)
  text: {
    primary: '#1C1E21', // Dark primary text
    secondary: '#65676B', // Medium grey
    disabled: '#8A8D91', // Light grey
    tertiary: '#606770', // Subtle text
  },
  // Government specific colors
  government: {
    saffron: '#FF9933', // Indian flag saffron
    navy: '#003366', // Primary navy
    darkBlue: '#1E3A8A', // Deep blue
    gold: '#D4AF37', // Government gold
    red: '#DC2626', // Alert red
    lightBlue: '#E3F2FD', // Light blue background
  },
  // Status colors
  info: {
    main: '#0EA5E9',
    light: '#38BDF8',
    dark: '#0284C7',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#F59E0B',
    light: '#FCD34D',
    dark: '#D97706',
    contrastText: '#1F2937',
  },
  error: {
    main: '#DC2626',
    light: '#EF4444',
    dark: '#B91C1C',
    contrastText: '#FFFFFF',
  },
};

// Professional Government Typography (accessibility compliant)
const govTypography = {
  fontFamily: [
    'Roboto',
    'Inter',
    'system-ui',
    '-apple-system',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    fontSize: '2.25rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.025em',
  },
  h2: {
    fontSize: '1.875rem',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.02em',
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0em',
  },
  h5: {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.0075em',
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.0075em',
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.02857em',
    textTransform: 'none' as const,
  },
};

// Government Theme Creation
export const governmentTheme = createTheme({
  palette: {
    mode: 'light',
    primary: govColors.primary,
    secondary: govColors.secondary,
    success: govColors.success,
    info: govColors.info,
    warning: govColors.warning,
    error: govColors.error,
    background: govColors.background,
    text: govColors.text,
    divider: '#E4E6EA',
    grey: {
      50: '#F8F9FA',
      100: '#F0F2F5',
      200: '#E4E6EA',
      300: '#CED0D4',
      400: '#8A8D91',
      500: '#65676B',
      600: '#606770',
      700: '#1C1E21',
      800: '#1C1E21',
      900: '#1C1E21',
    },
  },
  typography: govTypography,
  spacing: 8,
  shape: {
    borderRadius: 6,
  },
  components: {
    // AppBar - Government header styling
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: govColors.primary.main,
          boxShadow: '0 2px 8px rgba(0, 51, 102, 0.15)',
          borderBottom: `3px solid ${govColors.secondary.main}`,
        },
      },
    },
    // Button - Professional government buttons
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          fontWeight: 500,
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          },
        },
        containedPrimary: {
          backgroundColor: govColors.primary.main,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: govColors.primary.dark,
          },
        },
        containedSecondary: {
          backgroundColor: govColors.secondary.main,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: govColors.secondary.dark,
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    // Card - Clean government cards
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          border: '1px solid #E4E6EA',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    // Table - Government data tables
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: govColors.background.grey,
          '& .MuiTableCell-head': {
            fontWeight: 600,
            color: govColors.text.primary,
            borderBottom: `2px solid ${govColors.primary.main}`,
          },
        },
      },
    },
    // TextField styling
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            '& fieldset': {
              borderColor: '#CED0D4',
            },
            '&:hover fieldset': {
              borderColor: govColors.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: govColors.primary.main,
              borderWidth: 2,
            },
          },
        },
      },
    },
  },
});

// Export colors for use in components
export { govColors };

export default governmentTheme;
