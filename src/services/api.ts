import axios from 'axios';

// API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Types for API responses
export interface DatasetVariable {
  name: string;
  type: string;
  description: string;
  allowedValues?: string[];
  sensitive?: boolean;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  accessLevel: 'public' | 'restricted' | 'premium';
  totalRecords: number;
  lastUpdated: string;
  variables: DatasetVariable[];
}

export interface QueryFilter {
  variable: string;
  operator: string;
  value: string;
}

export interface QueryRequest {
  dataset: string;
  filters?: QueryFilter[];
  fields?: string[];
  format?: 'json' | 'csv';
  limit?: number;
  privacyLevel?: 'standard' | 'high';
}

export interface QueryResponse {
  data: any[];
  metadata: {
    total_records: number;
    execution_time: number;
    query_complexity: string;
    privacy_applied: boolean;
    suppressed_cells?: number;
    privacy_risk?: 'low' | 'medium' | 'high';
  };
}

// API Service Functions
export const apiService = {
  // Get all available datasets
  async getDatasets(): Promise<Dataset[]> {
    try {
      const response = await apiClient.get('/api/datasets');
      return response.data.data || response.data.datasets || [];
    } catch (error) {
      console.error('Error fetching datasets:', error);
      throw error;
    }
  },

  // Get dataset schema/metadata
  async getDatasetSchema(datasetId: string): Promise<Dataset> {
    try {
      const response = await apiClient.get(`/api/datasets/${datasetId}/schema`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching dataset schema:', error);
      throw error;
    }
  },

  // Execute query
  async executeQuery(queryRequest: QueryRequest): Promise<QueryResponse> {
    try {
      const response = await apiClient.post('/api/query', queryRequest);
      return response.data;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  },

  // Get query history
  async getQueryHistory(): Promise<any[]> {
    try {
      const response = await apiClient.get('/api/query/history');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching query history:', error);
      throw error;
    }
  },

  // Get analytics/usage data
  async getAnalytics(): Promise<any> {
    try {
      const response = await apiClient.get('/api/analytics');
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  },

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await apiClient.get('/health');
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  },
};

export default apiService;
