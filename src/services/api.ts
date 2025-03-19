
import { toast } from "@/components/ui/use-toast";

// User interface
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user' | 'editor';
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  last_login?: string;
}

// Pagination interface
export interface PaginatedResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

// API Class
class ApiService {
  private baseUrl = 'https://reqres.in/api';

  // Helper method for API requests
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'An error occurred');
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
      throw error;
    }
  }

  // Get users with pagination
  async getUsers(page = 1, per_page = 6): Promise<PaginatedResponse<User>> {
    const data = await this.request<PaginatedResponse<User>>(`/users?page=${page}&per_page=${per_page}`);
    
    // Enhance the mock data with additional fields for our UI
    const enhancedData = {
      ...data,
      data: data.data.map(user => ({
        ...user,
        role: ['admin', 'user', 'editor'][Math.floor(Math.random() * 3)] as User['role'],
        status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as User['status'],
        created_at: new Date(Date.now() - Math.random() * 31536000000).toISOString(),
        last_login: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 2592000000).toISOString() : undefined
      }))
    };
    
    return enhancedData;
  }

  // Get a single user
  async getUser(id: number): Promise<{ data: User }> {
    const data = await this.request<{ data: User }>(`/users/${id}`);
    
    // Enhance with additional fields
    const enhancedData = {
      data: {
        ...data.data,
        role: ['admin', 'user', 'editor'][Math.floor(Math.random() * 3)] as User['role'],
        status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as User['status'],
        created_at: new Date(Date.now() - Math.random() * 31536000000).toISOString(),
        last_login: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 2592000000).toISOString() : undefined
      }
    };
    
    return enhancedData;
  }

  // Create user
  async createUser(userData: Partial<User>): Promise<{ id: string; createdAt: string }> {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Update user
  async updateUser(id: number, userData: Partial<User>): Promise<{ updatedAt: string }> {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Delete user
  async deleteUser(id: number): Promise<void> {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Mock login
  async login(email: string, password: string): Promise<{ token: string }> {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Mock register
  async register(email: string, password: string): Promise<{ id: number; token: string }> {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
}

export const apiService = new ApiService();
