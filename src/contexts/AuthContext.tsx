import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data with Indian names
const mockUsers: User[] = [
  // Students
  { id: '1', name: 'Rahul Sharma', email: 'rahul.sharma@student.edu', role: 'student', phone: '+91 9876543210' },
  { id: '2', name: 'Priya Verma', email: 'priya.verma@student.edu', role: 'student', phone: '+91 9876543211' },
  { id: '3', name: 'Aman Singh', email: 'aman.singh@student.edu', role: 'student', phone: '+91 9876543212' },
  { id: '4', name: 'Neha Kapoor', email: 'neha.kapoor@student.edu', role: 'student', phone: '+91 9876543213' },
  { id: '5', name: 'Karan Malhotra', email: 'karan.malhotra@student.edu', role: 'student', phone: '+91 9876543214' },
  { id: '6', name: 'Sneha Patil', email: 'sneha.patil@student.edu', role: 'student', phone: '+91 9876543215' },
  
  // Teachers
  { id: '7', name: 'Anjali Mehta', email: 'anjali.mehta@teacher.edu', role: 'teacher', phone: '+91 9876543216' },
  { id: '8', name: 'Rakesh Iyer', email: 'rakesh.iyer@teacher.edu', role: 'teacher', phone: '+91 9876543217' },
  
  // Admin
  { id: '9', name: 'Arvind Rao', email: 'arvind.rao@admin.edu', role: 'admin', phone: '+91 9876543218' },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};