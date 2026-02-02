import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  AlertTitle,
  Tabs,
  Tab,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Stack,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  QueryBuilder as QueryIcon,
  PlayArrow,
  Save,
  Download,
  Clear,
  Help,
  Code,
  TableChart,
  Visibility,
  History,
  ContentCopy,
  Psychology,
  AutoAwesome,
  Translate,
  Send,
} from '@mui/icons-material';
import { govColors } from '../../theme/governmentTheme';

// Sample surveys for the query builder
const availableSurveys = [
  {
    id: 'plfs_2023_24',
    name: 'PLFS 2023-24',
    fullName: 'Periodic Labour Force Survey 2023-24',
    tables: ['person', 'household', 'employment'],
    description: 'Employment and unemployment statistics'
  },
  {
    id: 'hces_2022_23',
    name: 'HCES 2022-23',
    fullName: 'Household Consumer Expenditure Survey 2022-23',
    tables: ['household', 'consumption', 'demographics'],
    description: 'Consumer spending patterns'
  },
  {
    id: 'asi_2022_23',
    name: 'ASI 2022-23',
    fullName: 'Annual Survey of Industries 2022-23',
    tables: ['factories', 'employment', 'production'],
    description: 'Industrial production statistics'
  }
];

// Sample columns for selected survey
const sampleColumns = {
  'plfs_2023_24': {
    person: ['age', 'gender', 'education', 'employment_status', 'occupation', 'industry'],
    household: ['household_size', 'income', 'location', 'dwelling_type'],
    employment: ['job_type', 'wages', 'hours_worked', 'sector']
  },
  'hces_2022_23': {
    household: ['household_id', 'size', 'income_class', 'location'],
    consumption: ['item_code', 'expenditure', 'quantity', 'category'],
    demographics: ['age', 'gender', 'education', 'occupation']
  },
  'asi_2022_23': {
    factories: ['factory_id', 'state', 'district', 'industry_type'],
    employment: ['workers', 'employees', 'wages_paid'],
    production: ['output_value', 'input_cost', 'value_added']
  }
};

// AI suggestions for natural language queries
const aiSuggestions = [
  "Show me employment data for youth aged 15-29 in rural areas",
  "What is the average household expenditure by state?",
  "Compare unemployment rates across education levels",
  "Find manufacturing industries with highest employment",
  "Show consumption patterns for urban households",
  "Get labor force participation by gender and age group"
];

const queryHistory = [
  {
    id: 1,
    name: 'Youth Employment Analysis',
    query: 'SELECT age, employment_status, COUNT(*) FROM plfs_2023_24.person WHERE age BETWEEN 15 AND 29 GROUP BY age, employment_status',
    timestamp: '2024-08-12 10:30:00',
    status: 'Completed'
  },
  {
    id: 2,
    name: 'Rural vs Urban Employment',
    query: 'SELECT location, employment_status, AVG(wages) FROM plfs_2023_24.employment e JOIN plfs_2023_24.household h ON e.household_id = h.id GROUP BY location, employment_status',
    timestamp: '2024-08-11 15:45:00',
    status: 'Completed'
  }
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

export const QueryBuilder: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedSurvey, setSelectedSurvey] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [nlQuery, setNlQuery] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [aiInsights, setAiInsights] = useState<string>('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSurveyChange = (surveyId: string) => {
    setSelectedSurvey(surveyId);
    setSelectedTable('');
    setSqlQuery('');
  };

  const handleNLToSQL = async () => {
    if (!nlQuery.trim()) return;
    
    setIsTranslating(true);
    
    // Simulate AI translation
    setTimeout(() => {
      // Mock AI-generated SQL based on natural language
      let generatedSQL = '';
      
      if (nlQuery.toLowerCase().includes('youth') && nlQuery.toLowerCase().includes('employment')) {
        generatedSQL = `SELECT age, employment_status, COUNT(*) as count
FROM plfs_2023_24.person 
WHERE age BETWEEN 15 AND 29
GROUP BY age, employment_status
ORDER BY count DESC;`;
      } else if (nlQuery.toLowerCase().includes('household') && nlQuery.toLowerCase().includes('expenditure')) {
        generatedSQL = `SELECT location, AVG(expenditure) as avg_expenditure
FROM hces_2022_23.consumption c
JOIN hces_2022_23.household h ON c.household_id = h.household_id
GROUP BY location
ORDER BY avg_expenditure DESC;`;
      } else {
        generatedSQL = `-- AI-Generated Query for: "${nlQuery}"
SELECT * FROM ${selectedSurvey || 'plfs_2023_24'}.person 
LIMIT 100;`;
      }
      
      setSqlQuery(generatedSQL);
      setIsTranslating(false);
    }, 2000);
  };

  const handleExecuteQuery = async () => {
    if (!sqlQuery.trim()) return;
    
    setIsExecuting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock results
      const mockResults = [
        { age: '20-24', employment_status: 'Employed', count: 1234 },
        { age: '20-24', employment_status: 'Unemployed', count: 456 },
        { age: '25-29', employment_status: 'Employed', count: 2345 },
        { age: '25-29', employment_status: 'Unemployed', count: 567 },
      ];
      setQueryResults(mockResults);
      setShowResults(true);
      
      // Generate AI insights
      setAiInsights("Analysis shows that the 25-29 age group has higher employment rates compared to the 20-24 group. The employment rate for youth is approximately 73%, which is above the national average.");
      
      setIsExecuting(false);
    }, 2000);
  };

  const getAvailableColumns = () => {
    if (!selectedSurvey || !selectedTable) return [];
    return sampleColumns[selectedSurvey as keyof typeof sampleColumns]?.[selectedTable as keyof typeof sampleColumns[keyof typeof sampleColumns]] || [];
  };

  const generateSampleQuery = () => {
    if (!selectedSurvey || !selectedTable) return;
    
    const columns = getAvailableColumns();
    if (columns.length === 0) return;
    
    const sampleQuery = `SELECT ${columns.slice(0, 3).join(', ')}, COUNT(*) as count
FROM ${selectedSurvey}.${selectedTable}
WHERE ${columns[0]} IS NOT NULL
GROUP BY ${columns.slice(0, 3).join(', ')}
LIMIT 100;`;
    
    setSqlQuery(sampleQuery);
  };

  return (
    <Box>
      {/* Header */}
      <Alert 
        severity="info" 
        sx={{ 
          mb: 3, 
          backgroundColor: govColors.government.lightBlue,
          border: `1px solid ${govColors.primary.main}`,
        }}
      >
        <AlertTitle sx={{ fontWeight: 600 }}>
          AI-Powered Query Builder
        </AlertTitle>
        Build custom queries using natural language or SQL. Our AI assistant helps translate your questions into optimized database queries with privacy controls.
      </Alert>

      {/* Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="query builder tabs">
          <Tab label="AI Query Builder" icon={<Psychology />} />
          <Tab label="SQL Builder" icon={<QueryIcon />} />
          <Tab label="Query History" icon={<History />} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {/* AI Natural Language Query Builder */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Left Panel - AI Query Interface */}
          <Box sx={{ flex: 2 }}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  <Psychology sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Ask Your Question in Plain English
                </Typography>
                
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={nlQuery}
                  onChange={(e) => setNlQuery(e.target.value)}
                  placeholder="Examples:
• Show me employment data for youth aged 15-29 in rural areas
• What is the average household expenditure by state?
• Compare unemployment rates across education levels"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          onClick={handleNLToSQL}
                          disabled={!nlQuery.trim() || isTranslating}
                          color="primary"
                        >
                          {isTranslating ? <CircularProgress size={20} /> : <Send />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ width: '100%', mb: 1 }}>
                    Quick suggestions:
                  </Typography>
                  {aiSuggestions.map((suggestion, index) => (
                    <Chip 
                      key={index}
                      label={suggestion}
                      size="small"
                      variant="outlined"
                      clickable
                      onClick={() => setNlQuery(suggestion)}
                      sx={{ fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>

                <Button
                  variant="contained"
                  startIcon={isTranslating ? <CircularProgress size={16} color="inherit" /> : <AutoAwesome />}
                  onClick={handleNLToSQL}
                  disabled={!nlQuery.trim() || isTranslating}
                  fullWidth
                  sx={{ textTransform: 'none' }}
                >
                  {isTranslating ? 'Translating with AI...' : 'Convert to SQL Query'}
                </Button>
              </CardContent>
            </Card>

            {/* Generated SQL Display */}
            {sqlQuery && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                      <Code sx={{ mr: 1, verticalAlign: 'middle' }} />
                      AI-Generated SQL Query
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Copy Query">
                        <IconButton size="small">
                          <ContentCopy />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Clear Query">
                        <IconButton size="small" onClick={() => setSqlQuery('')}>
                          <Clear />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                    variant="outlined"
                    sx={{ 
                      fontFamily: 'monospace',
                      '& .MuiInputBase-input': {
                        fontFamily: 'monospace',
                      }
                    }}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip label="AI Generated" size="small" color="primary" />
                      <Chip label="Privacy Compliant" size="small" color="success" />
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={isExecuting ? <CircularProgress size={16} color="inherit" /> : <PlayArrow />}
                      onClick={handleExecuteQuery}
                      disabled={!sqlQuery.trim() || isExecuting}
                      sx={{ textTransform: 'none' }}
                    >
                      {isExecuting ? 'Executing...' : 'Execute Query'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}

            {/* AI Insights */}
            {aiInsights && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    <AutoAwesome sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} />
                    AI-Generated Insights
                  </Typography>
                  <Alert severity="info" sx={{ backgroundColor: govColors.government.lightBlue }}>
                    {aiInsights}
                  </Alert>
                </CardContent>
              </Card>
            )}

            {/* Results */}
            {showResults && (
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                      Query Results
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        startIcon={<Download />}
                        size="small"
                        sx={{ textTransform: 'none' }}
                      >
                        Export CSV
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<TableChart />}
                        size="small"
                        sx={{ textTransform: 'none' }}
                      >
                        Visualize
                      </Button>
                    </Box>
                  </Box>

                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          {queryResults.length > 0 && Object.keys(queryResults[0]).map((column) => (
                            <TableCell key={column} sx={{ fontWeight: 600 }}>
                              {column}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {queryResults.map((row, index) => (
                          <TableRow key={index}>
                            {Object.entries(row).map(([key, value], cellIndex) => (
                              <TableCell key={cellIndex}>
                                {(() => {
                                  if (value === null || value === undefined) {
                                    return '-';
                                  } else if (typeof value === 'object') {
                                    // If the object has count and percentage, format it nicely
                                    if ('count' in value && 'percentage' in value) {
                                      return `${value.count} (${value.percentage.toFixed(1)}%)`;
                                    } else {
                                      // Otherwise stringify the object
                                      return JSON.stringify(value);
                                    }
                                  } else if (typeof value === 'number') {
                                    // Format numbers with commas and fixed decimal places if needed
                                    return Number.isInteger(value) 
                                      ? value.toLocaleString() 
                                      : value.toFixed(2);
                                  } else {
                                    // Just convert to string for everything else
                                    return String(value);
                                  }
                                })()}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Showing {queryResults.length} rows • Query executed in 1.23s • Privacy rules applied
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>

          {/* Right Panel - AI Features */}
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  AI Assistant Features
                </Typography>
                
                <Stack spacing={2}>
                  <Alert severity="success" sx={{ textAlign: 'left' }}>
                    <Typography variant="body2" fontWeight={600}>Natural Language Processing</Typography>
                    <Typography variant="caption">Convert English questions to SQL queries</Typography>
                  </Alert>
                  
                  <Alert severity="info" sx={{ textAlign: 'left' }}>
                    <Typography variant="body2" fontWeight={600}>Smart Suggestions</Typography>
                    <Typography variant="caption">Get query recommendations based on your dataset</Typography>
                  </Alert>
                  
                  <Alert severity="warning" sx={{ textAlign: 'left' }}>
                    <Typography variant="body2" fontWeight={600}>Privacy Protection</Typography>
                    <Typography variant="caption">Automatic compliance checking and cell suppression</Typography>
                  </Alert>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" fontWeight={600} mb={1}>
                  Supported Languages
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip label="English" size="small" color="primary" />
                  <Chip label="हिंदी" size="small" variant="outlined" />
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Traditional SQL Builder - Simplified version */}
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Advanced SQL Editor
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Survey</InputLabel>
              <Select
                value={selectedSurvey}
                label="Select Survey"
                onChange={(e) => handleSurveyChange(e.target.value)}
              >
                {availableSurveys.map((survey) => (
                  <MenuItem key={survey.id} value={survey.id}>
                    {survey.name} - {survey.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={8}
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              placeholder="Write your SQL query here..."
              variant="outlined"
              sx={{ 
                fontFamily: 'monospace',
                '& .MuiInputBase-input': {
                  fontFamily: 'monospace',
                }
              }}
            />
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {/* Query History */}
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Recent Queries
            </Typography>
            {queryHistory.map((query) => (
              <Card key={query.id} variant="outlined" sx={{ mb: 2 }}>
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {query.name}
                    </Typography>
                    <Chip label={query.status} size="small" color="success" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mb: 1 }}>
                    {query.query}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Executed on {query.timestamp}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Button size="small" sx={{ textTransform: 'none', mr: 1 }}>
                      Rerun Query
                    </Button>
                    <Button size="small" sx={{ textTransform: 'none' }}>
                      View Results
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
};
