import React, { useState, useEffect } from 'react';
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
  Checkbox,
  FormControlLabel,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  LinearProgress,
  Divider,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from '@mui/material';
import {
  PlayArrow,
  Download,
  Add,
  Remove,
  ExpandMore,
  Security,
  Warning,
  CheckCircle,
  Error,
} from '@mui/icons-material';
import { apiService, Dataset, QueryRequest, QueryResponse } from '../../services/api';

export const QueryBuilder: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);
  const [filters, setFilters] = useState<Array<{variable: string, operator: string, value: string}>>([]);
  const [privacyLevel, setPrivacyLevel] = useState<'standard' | 'high'>('standard');
  const [limit, setLimit] = useState<number>(100);
  const [format, setFormat] = useState<'json' | 'csv'>('json');
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [privacyRisk, setPrivacyRisk] = useState<'low' | 'medium' | 'high'>('low');
  const [suppressedCells, setSuppressedCells] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [queryMetadata, setQueryMetadata] = useState<any>(null);

  // Fetch available datasets
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getDatasets();
        setDatasets(data);
        if (data.length > 0) {
          setSelectedDataset(data[0]);
          setSelectedVariables([data[0].variables[0]?.name || '']);
        }
      } catch (err) {
        console.error('Error fetching datasets:', err);
        setError('Failed to load datasets. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDatasets();
  }, []);

  const handleVariableToggle = (variableName: string) => {
    setSelectedVariables(prev => 
      prev.includes(variableName) 
        ? prev.filter(v => v !== variableName)
        : [...prev, variableName]
    );
  };

  const addFilter = () => {
    setFilters(prev => [...prev, { variable: '', operator: 'equals', value: '' }]);
  };

  const removeFilter = (index: number) => {
    setFilters(prev => prev.filter((_, i) => i !== index));
  };

  const updateFilter = (index: number, field: string, value: string) => {
    setFilters(prev => prev.map((filter, i) => 
      i === index ? { ...filter, [field]: value } : filter
    ));
  };

  const executeQuery = async () => {
    if (!selectedDataset || selectedVariables.length === 0) {
      setError('Please select a dataset and at least one variable.');
      return;
    }

    try {
      setIsExecuting(true);
      setError(null);

      const queryRequest: QueryRequest = {
        dataset: selectedDataset.id,
        fields: selectedVariables,
        filters: filters.filter(f => f.variable && f.value),
        format,
        limit,
        privacyLevel,
      };

      const response: QueryResponse = await apiService.executeQuery(queryRequest);
      
      setResults(response.data);
      setPrivacyRisk(response.metadata.privacy_risk || 'low');
      setSuppressedCells(response.metadata.suppressed_cells || 0);
      setQueryMetadata(response.metadata);
    } catch (err) {
      console.error('Error executing query:', err);
      setError('Failed to execute query. Please try again.');
    } finally {
      setIsExecuting(false);
    }
  };

  const exportResults = () => {
    if (results.length === 0) return;

    if (format === 'csv') {
      const headers = selectedVariables.join(',');
      const csv = [headers, ...results.map(row => 
        selectedVariables.map(variable => row[variable] || '').join(',')
      )].join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `query_results_${selectedDataset?.id}.csv`;
      a.click();
    } else {
      const json = JSON.stringify(results, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `query_results_${selectedDataset?.id}.json`;
      a.click();
    }
  };

  const getPrivacyRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const getPrivacyRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle />;
      case 'medium': return <Warning />;
      case 'high': return <Error />;
      default: return <Security />;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading datasets...</Typography>
      </Box>
    );
  }

  if (error && !selectedDataset) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (!selectedDataset) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          No datasets available. Please check your connection to the backend.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#212121', mb: 1 }}>
          MoSPI Data Query Builder
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Build SQL-like queries on {selectedDataset.name} with privacy controls and statistical validation. 
          Access anonymized microdata from the National Statistics Office, Ministry of Statistics and Programme Implementation.
        </Typography>
      </Box>

      {/* Dataset Selection */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Select Dataset</InputLabel>
          <Select
            value={selectedDataset.id}
            label="Select Dataset"
            onChange={(e) => {
              const dataset = datasets.find(d => d.id === e.target.value);
              if (dataset) {
                setSelectedDataset(dataset);
                setSelectedVariables([dataset.variables[0]?.name || '']);
                setFilters([]);
              }
            }}
          >
            {datasets.map((dataset) => (
              <MenuItem key={dataset.id} value={dataset.id}>
                {dataset.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {/* Query Builder Panel */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Build Your Query
            </Typography>

            {/* Variable Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Select Variables
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedDataset.variables.map((variable) => (
                  <FormControlLabel
                    key={variable.name}
                    control={
                      <Checkbox
                        checked={selectedVariables.includes(variable.name)}
                        onChange={() => handleVariableToggle(variable.name)}
                        color="primary"
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {variable.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {variable.description}
                        </Typography>
                        {variable.sensitive && (
                          <Chip label="Sensitive" size="small" color="error" sx={{ ml: 1 }} />
                        )}
                      </Box>
                    }
                  />
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Filters */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Apply Filters
                </Typography>
                <Button
                  startIcon={<Add />}
                  onClick={addFilter}
                  size="small"
                >
                  Add Filter
                </Button>
              </Box>
              
              {filters.map((filter, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Variable</InputLabel>
                    <Select
                      value={filter.variable}
                      label="Variable"
                      onChange={(e) => updateFilter(index, 'variable', e.target.value)}
                    >
                      {selectedDataset.variables.map((variable) => (
                        <MenuItem key={variable.name} value={variable.name}>
                          {variable.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <FormControl size="small" sx={{ minWidth: 100 }}>
                    <InputLabel>Operator</InputLabel>
                    <Select
                      value={filter.operator}
                      label="Operator"
                      onChange={(e) => updateFilter(index, 'operator', e.target.value)}
                    >
                      <MenuItem value="equals">Equals</MenuItem>
                      <MenuItem value="not_equals">Not Equals</MenuItem>
                      <MenuItem value="greater_than">Greater Than</MenuItem>
                      <MenuItem value="less_than">Less Than</MenuItem>
                      <MenuItem value="contains">Contains</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <TextField
                    size="small"
                    label="Value"
                    value={filter.value}
                    onChange={(e) => updateFilter(index, 'value', e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  
                  <IconButton
                    onClick={() => removeFilter(index)}
                    color="error"
                    size="small"
                  >
                    <Remove />
                  </IconButton>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Query Options */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Query Options
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Privacy Level</InputLabel>
                  <Select
                    value={privacyLevel}
                    label="Privacy Level"
                    onChange={(e) => setPrivacyLevel(e.target.value as 'standard' | 'high')}
                  >
                    <MenuItem value="standard">Standard</MenuItem>
                    <MenuItem value="high">High (More Aggregation)</MenuItem>
                  </Select>
                </FormControl>
                
                <TextField
                  fullWidth
                  size="small"
                  label="Record Limit"
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  inputProps={{ min: 1, max: 10000 }}
                />
                
                <FormControl fullWidth size="small">
                  <InputLabel>Output Format</InputLabel>
                  <Select
                    value={format}
                    label="Output Format"
                    onChange={(e) => setFormat(e.target.value as 'json' | 'csv')}
                  >
                    <MenuItem value="json">JSON</MenuItem>
                    <MenuItem value="csv">CSV</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Execute Button */}
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={executeQuery}
              disabled={isExecuting || selectedVariables.length === 0}
              fullWidth
              size="large"
            >
              {isExecuting ? 'Executing Query...' : 'Execute Query'}
            </Button>

            {isExecuting && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Processing query with privacy controls...
                </Typography>
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Query Results
              </Typography>
              {results.length > 0 && (
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={exportResults}
                  size="small"
                >
                  Export {format.toUpperCase()}
                </Button>
              )}
            </Box>

            {/* Privacy Status */}
            {results.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Alert 
                  severity={getPrivacyRiskColor(privacyRisk) as any}
                  icon={getPrivacyRiskIcon(privacyRisk)}
                  sx={{ mb: 2 }}
                >
                  <Typography variant="body2">
                    <strong>Privacy Status:</strong> {privacyRisk.toUpperCase()} risk level
                    {suppressedCells > 0 && ` • ${suppressedCells} cells suppressed for privacy`}
                  </Typography>
                </Alert>
              </Box>
            )}

            {/* Results Table */}
            {results.length > 0 ? (
              <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {selectedVariables.map((variable) => (
                        <TableCell key={variable} sx={{ fontWeight: 600 }}>
                          {variable}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.map((row, index) => (
                      <TableRow key={index}>
                        {selectedVariables.map((variable) => (
                          <TableCell key={variable}>
                            {row[variable] !== undefined ? row[variable] : '-'}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  {isExecuting 
                    ? 'Processing your query...' 
                    : 'Execute a query to see results here'
                  }
                </Typography>
              </Box>
            )}

            {/* Query Metadata */}
            {queryMetadata && (
              <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2">Query Metadata</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'grid', gap: 1 }}>
                    <Typography variant="body2">
                      <strong>Dataset:</strong> {selectedDataset.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Variables Selected:</strong> {selectedVariables.length}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Records Returned:</strong> {queryMetadata.total_records || results.length}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Privacy Level:</strong> {privacyLevel}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Execution Time:</strong> ~{queryMetadata.execution_time?.toFixed(1) || '2.3'} seconds
                    </Typography>
                    <Typography variant="body2">
                      <strong>Query Complexity:</strong> {queryMetadata.query_complexity || 'medium'}
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Information Alert */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Statistical Disclosure Control:</strong> All queries are processed with privacy protection. 
          Sensitive variables may be automatically aggregated or suppressed to prevent individual identification.
        </Typography>
      </Alert>
    </Box>
  );
};
