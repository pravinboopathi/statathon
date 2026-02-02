import axios from 'axios';

// API base URL - pointing to our backend
const API_BASE_URL = 'http://localhost:5000';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for our API responses
export interface Survey {
  id: string;
  name: string;
  fullName: string;
  description: string;
  year: number;
  status: string;
  tables: string[];
  recordCount: number;
  source: string;
  metadata?: any;
}

export interface QueryFilter {
  location?: string;
  state?: string;
  ageGroup?: string;
  sex?: string;
  employmentStatus?: string;
  educationLevel?: string;
  socialGroup?: string;
  religion?: string;
}

export interface QueryResult {
  [key: string]: any;
}

export interface QueryResponse {
  success: boolean;
  message: string;
  data: {
    results: any;
    insights: {
      summary: string;
      key_findings: string[];
      recommendations?: string[];
    };
    metadata: {
      query: string;
      filters: QueryFilter;
      executionTimeMs: number;
      timestamp: string;
    };
  };
}

export interface SurveysResponse {
  success: boolean;
  message: string;
  data: {
    surveys: Survey[];
    total: number;
  };
}

// API service class
export class APIService {
  // Get all available surveys
  static async getSurveys(): Promise<Survey[]> {
    try {
      const response = await apiClient.get<SurveysResponse>('/api/v1/surveys/list');
      return response.data.data.surveys;
    } catch (error) {
      console.error('Error fetching surveys:', error);
      throw error;
    }
  }

  // Execute query
  static async executeQuery(query: string, filters: QueryFilter = {}): Promise<QueryResponse> {
    try {
      const response = await apiClient.post<QueryResponse>('/api/v1/query', {
        query,
        filters
      });
      return response.data;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  // Execute natural language query
  static async executeNaturalLanguageQuery(query: string, filters: QueryFilter = {}): Promise<QueryResponse> {
    try {
      const response = await apiClient.post<QueryResponse>('/api/v1/query/natural', {
        query,
        filters
      });
      return response.data;
    } catch (error) {
      console.error('Error processing natural language query:', error);
      throw error;
    }
  }

  // Health check
  static async healthCheck(): Promise<any> {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }
}

export default APIService;
