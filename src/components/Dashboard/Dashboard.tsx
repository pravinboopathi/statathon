import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Assessment,
  DataUsage,
  Api,
  QueryBuilder,
  People,
  Timeline,
  TrendingUp,
  ArrowForward,
} from '@mui/icons-material';
import { govColors } from '../../theme/governmentTheme';

export const Dashboard: React.FC = () => {
  return (
    <Box>
      {/* Welcome Banner */}
      <Alert 
        severity="info" 
        sx={{ 
          mb: 3, 
          backgroundColor: govColors.government.lightBlue,
          border: `1px solid ${govColors.primary.main}`,
        }}
      >
        <AlertTitle sx={{ fontWeight: 600 }}>
          Welcome to MoSPI Statistical Data Gateway
        </AlertTitle>
        Access India's comprehensive microdata repository through modern APIs. Query PLFS, HCES, and 178+ surveys with SQL-based filters.
      </Alert>

      {/* Statistics Overview */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Card sx={{ minWidth: 250, flex: 1 }}>
          <CardContent>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                backgroundColor: govColors.primary.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: govColors.primary.main,
                margin: '0 auto 16px',
              }}
            >
              <Assessment sx={{ fontSize: 32 }} />
            </Box>
            <Typography variant="h6" fontWeight={600} mb={1}>
              178+ Surveys
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Available Datasets
            </Typography>
            <Typography variant="h4" color="primary.main" mb={1}>
              178
            </Typography>
            <Typography variant="caption">Including PLFS, HCES, ASI</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 250, flex: 1 }}>
          <CardContent>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                backgroundColor: govColors.secondary.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: govColors.secondary.main,
                margin: '0 auto 16px',
              }}
            >
              <DataUsage sx={{ fontSize: 32 }} />
            </Box>
            <Typography variant="h6" fontWeight={600} mb={1}>
              100M+ Records
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Total Data Points
            </Typography>
            <Typography variant="h4" color="secondary.main" mb={1}>
              100M+
            </Typography>
            <Typography variant="caption">Across all surveys</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 250, flex: 1 }}>
          <CardContent>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                backgroundColor: govColors.success.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: govColors.success.main,
                margin: '0 auto 16px',
              }}
            >
              <Api sx={{ fontSize: 32 }} />
            </Box>
            <Typography variant="h6" fontWeight={600} mb={1}>
              API Access
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              RESTful Endpoints
            </Typography>
            <Typography variant="h4" color="success.main" mb={1}>
              50+
            </Typography>
            <Typography variant="caption">Ready to use</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 250, flex: 1 }}>
          <CardContent>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                backgroundColor: govColors.secondary.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: govColors.secondary.main,
                margin: '0 auto 16px',
              }}
            >
              <People sx={{ fontSize: 32 }} />
            </Box>
            <Typography variant="h6" fontWeight={600} mb={1}>
              450+ Researchers
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Active Users
            </Typography>
            <Typography variant="h4" color="secondary.main" mb={1}>
              450+
            </Typography>
            <Typography variant="caption">This month</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Quick Actions */}
      <Typography variant="h5" fontWeight={600} mb={2}>
        Quick Actions
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <QueryBuilder sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" fontWeight={600} mb={1}>
              Build Query
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Create custom SQL queries on survey data
            </Typography>
            <Button 
              variant="contained" 
              endIcon={<ArrowForward />}
              sx={{ textTransform: 'none' }}
            >
              Start Query
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Assessment sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h6" fontWeight={600} mb={1}>
              Browse Datasets
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Explore available surveys and metadata
            </Typography>
            <Button 
              variant="outlined" 
              endIcon={<ArrowForward />}
              sx={{ textTransform: 'none' }}
            >
              Explore Data
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Api sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" fontWeight={600} mb={1}>
              API Documentation
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Learn how to integrate with our APIs
            </Typography>
            <Button 
              variant="outlined" 
              endIcon={<ArrowForward />}
              sx={{ textTransform: 'none' }}
            >
              View Docs
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* Featured Surveys */}
      <Typography variant="h5" fontWeight={600} mb={2}>
        Featured Surveys
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Card sx={{ minWidth: 300, flex: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                PLFS 2023-24
              </Typography>
              <Chip label="Latest" size="small" color="primary" />
            </Box>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Periodic Labour Force Survey - Employment and unemployment indicators across rural and urban areas.
            </Typography>
            <List dense>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Timeline fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Quarterly employment rates"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <TrendingUp fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Labour force participation"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />
            <Button size="small" variant="text" sx={{ textTransform: 'none' }}>
              Access PLFS Data →
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 300, flex: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                HCES 2022-23
              </Typography>
              <Chip label="Popular" size="small" color="secondary" />
            </Box>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Household Consumer Expenditure Survey - Consumer spending patterns and poverty indicators.
            </Typography>
            <List dense>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <DataUsage fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Monthly consumption expenditure"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Assessment fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Expenditure distribution"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />
            <Button size="small" variant="text" sx={{ textTransform: 'none' }}>
              Access HCES Data →
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* API Access Guide */}
      <Typography variant="h5" fontWeight={600} mb={2}>
        Getting Started with MoSPI APIs
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1" color="text.secondary" mb={2}>
            Access India's statistical microdata through RESTful APIs. Query 178+ surveys including PLFS, HCES, and ASI with SQL-based filters.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" sx={{ textTransform: 'none' }}>
              View API Documentation
            </Button>
            <Button variant="outlined" sx={{ textTransform: 'none' }}>
              Get API Key
            </Button>
            <Button variant="outlined" sx={{ textTransform: 'none' }}>
              Download Sample Data
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default  Dashboard