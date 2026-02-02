import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Alert,
  AlertTitle,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Search,
  FilterList,
  Download,
  Visibility,
  QueryBuilder,
  Home as HomeIcon,
  TrendingUp,
  Agriculture,
  School,
  LocalHospital,
  Work,
  Timeline,
  DataUsage,
} from '@mui/icons-material';
import { govColors } from '../../theme/governmentTheme';

// Mock survey data based on MoSPI surveys
const surveyCategories = [
  {
    id: 'labour',
    name: 'Labour & Employment',
    icon: <Work />,
    color: govColors.primary.main,
    count: 25,
    description: 'Employment, unemployment, and labour force statistics',
  },
  {
    id: 'household',
    name: 'Household Surveys',
    icon: <HomeIcon />,
    color: govColors.secondary.main,
    count: 32,
    description: 'Consumer expenditure, living standards, and demographics',
  },
  {
    id: 'economic',
    name: 'Economic Statistics',
    icon: <TrendingUp />,
    color: govColors.success.main,
    count: 28,
    description: 'GDP, industrial production, and economic indicators',
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Rural',
    icon: <Agriculture />,
    color: govColors.government.gold,
    count: 18,
    description: 'Agricultural statistics, land use, and livestock data',
  },
  {
    id: 'health',
    name: 'Health & Nutrition',
    icon: <LocalHospital />,
    color: govColors.info.main,
    count: 15,
    description: 'Health surveys, nutrition, and medical statistics',
  },
  {
    id: 'education',
    name: 'Education',
    icon: <School />,
    color: govColors.warning.main,
    count: 12,
    description: 'Educational statistics and literacy surveys',
  },
];

const featuredSurveys = [
  {
    id: 'plfs-2023-24',
    name: 'Periodic Labour Force Survey (PLFS) 2023-24',
    description: 'Annual survey on employment and unemployment statistics',
    category: 'Labour & Employment',
    status: 'Active',
    records: '2.8M',
    lastUpdated: '2024-07-15',
    size: '450 MB',
    access: 'Public',
    downloads: '1,247',
  },
  {
    id: 'hces-2022-23',
    name: 'Household Consumer Expenditure Survey (HCES) 2022-23',
    description: 'Comprehensive survey on household consumption patterns',
    category: 'Household Surveys',
    status: 'Available',
    records: '1.2M',
    lastUpdated: '2024-03-20',
    size: '320 MB',
    access: 'Public',
    downloads: '892',
  },
  {
    id: 'asi-2022-23',
    name: 'Annual Survey of Industries (ASI) 2022-23',
    description: 'Industrial production, employment, and performance data',
    category: 'Economic Statistics',
    status: 'Available',
    records: '890K',
    lastUpdated: '2024-05-10',
    size: '280 MB',
    access: 'Public',
    downloads: '654',
  },
  {
    id: 'ahls-2019',
    name: 'Agricultural Holdings and Livestock Survey 2019',
    description: 'Comprehensive data on agricultural holdings and livestock',
    category: 'Agriculture & Rural',
    status: 'Available',
    records: '1.8M',
    lastUpdated: '2023-12-15',
    size: '520 MB',
    access: 'Public',
    downloads: '423',
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export const DatasetBrowser: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'available':
        return 'primary';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = surveyCategories.find(c => c.name === category);
    return cat ? cat.icon : <DataUsage />;
  };

  return (
    <Box>
      {/* Header Alert */}
      <Alert 
        severity="info" 
        sx={{ 
          mb: 3, 
          backgroundColor: govColors.government.lightBlue,
          border: `1px solid ${govColors.primary.main}`,
        }}
      >
        <AlertTitle sx={{ fontWeight: 600 }}>
          Statistical Survey Repository
        </AlertTitle>
        Browse and access India's comprehensive microdata from 178+ surveys including PLFS, HCES, ASI, and more. 
        All datasets are anonymized and follow DPDP Act compliance.
      </Alert>

      {/* Search and Filter */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ pb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              placeholder="Search surveys, datasets, or keywords..."
              variant="outlined"
              size="medium"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ minWidth: 120 }}
            >
              Filters
            </Button>
          </Box>
          
          <Typography variant="body2" color="text.secondary">
            Showing {featuredSurveys.length} of 178+ available surveys
          </Typography>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="survey browser tabs">
          <Tab label="Featured Surveys" />
          <Tab label="Browse by Category" />
          <Tab label="Recent Updates" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <TabPanel value={tabValue} index={0}>
        {/* Featured Surveys */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {featuredSurveys.map((survey) => (
            <Card key={survey.id} sx={{ '&:hover': { boxShadow: 4 } }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: `${govColors.primary.main}20`,
                          color: govColors.primary.main,
                          mr: 2,
                        }}
                      >
                        {getCategoryIcon(survey.category)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {survey.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {survey.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip 
                      label={survey.status} 
                      color={getStatusColor(survey.status) as any}
                      size="small" 
                    />
                    <Chip 
                      label={survey.access} 
                      variant="outlined"
                      size="small" 
                    />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Records
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {survey.records}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Size
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {survey.size}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Downloads
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {survey.downloads}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Last Updated
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {survey.lastUpdated}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label={survey.category} 
                    variant="outlined"
                    size="small"
                    icon={getCategoryIcon(survey.category)}
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Preview Dataset">
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Build Query">
                      <IconButton size="small">
                        <QueryBuilder />
                      </IconButton>
                    </Tooltip>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Download />}
                      sx={{ textTransform: 'none' }}
                    >
                      Access Data
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Browse by Category */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          {surveyCategories.map((category) => (
            <Card 
              key={category.id} 
              sx={{ 
                minWidth: 300, 
                flex: 1,
                cursor: 'pointer',
                border: selectedCategory === category.id ? `2px solid ${category.color}` : 'none',
                '&:hover': { 
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    backgroundColor: `${category.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: category.color,
                    margin: '0 auto 16px',
                  }}
                >
                  {React.cloneElement(category.icon, { sx: { fontSize: 32 } })}
                </Box>
                <Typography variant="h6" fontWeight={600} mb={1}>
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {category.description}
                </Typography>
                <Chip 
                  label={`${category.count} surveys`} 
                  size="small" 
                  sx={{ 
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                    fontWeight: 600 
                  }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {/* Recent Updates */}
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Recently Updated Surveys
            </Typography>
            <List>
              {featuredSurveys
                .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                .map((survey, index) => (
                  <React.Fragment key={survey.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            backgroundColor: `${govColors.primary.main}20`,
                            color: govColors.primary.main,
                          }}
                        >
                          <Timeline fontSize="small" />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={survey.name}
                        secondary={`Updated on ${survey.lastUpdated} • ${survey.records} records`}
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="Access Dataset">
                          <IconButton edge="end">
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < featuredSurveys.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
            </List>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
};
