
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, PaginatedResponse, apiService } from '@/services/api';
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
      const response = await apiService.getUsers(page);
      setUsers(response.data);
      setTotalUsers(response.total);
      setCurrentPage(page);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async (id: number): Promise<User | undefined> => {
    try {
      const response = await apiService.getUser(id);
      return response.data;
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
      await apiService.createUser(userData);
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
      await apiService.updateUser(id, userData);
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
      await apiService.deleteUser(id);
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
