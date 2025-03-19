
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/services/api';
import { mockUsers } from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';

interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  fetchUsers: (page?: number) => Promise<void>;
  fetchUser: (id: number) => Promise<User | undefined>;
  createUser: (userData: Partial<User>) => Promise<boolean>;
  updateUser: (id: number, userData: Partial<User>) => Promise<boolean>;
  deleteUser: (id: number) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get mock data
      const perPage = 6;
      const offset = (page - 1) * perPage;
      const paginatedUsers = mockUsers.slice(offset, offset + perPage);
      
      setUsers(paginatedUsers);
      setTotalUsers(mockUsers.length);
      setCurrentPage(page);
      setTotalPages(Math.ceil(mockUsers.length / perPage));
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async (id: number): Promise<User | undefined> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const user = mockUsers.find(user => user.id === id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch user details",
        variant: "destructive",
      });
      return undefined;
    }
  };

  const createUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newUser: User = {
        id: mockUsers.length + 1,
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        email: userData.email || '',
        avatar: userData.avatar || 'https://reqres.in/img/faces/1-image.jpg',
        role: userData.role || 'user',
        status: userData.status || 'active',
        department: userData.department,
        location: userData.location,
        lastActive: 'Just now',
        joinDate: new Date().toISOString().split('T')[0]
      };
      
      mockUsers.push(newUser);
      
      toast({
        title: "Success",
        description: "User created successfully",
      });
      await fetchUsers(currentPage);
      return true;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateUser = async (id: number, userData: Partial<User>): Promise<boolean> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockUsers.findIndex(user => user.id === id);
      if (index === -1) {
        throw new Error('User not found');
      }
      
      mockUsers[index] = { ...mockUsers[index], ...userData };
      
      toast({
        title: "Success",
        description: "User updated successfully",
      });
      await fetchUsers(currentPage);
      return true;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteUser = async (id: number): Promise<boolean> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockUsers.findIndex(user => user.id === id);
      if (index === -1) {
        throw new Error('User not found');
      }
      
      mockUsers.splice(index, 1);
      
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      await fetchUsers(currentPage);
      return true;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        totalUsers,
        currentPage,
        totalPages,
        fetchUsers,
        fetchUser,
        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
