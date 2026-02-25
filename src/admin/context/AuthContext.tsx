import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AdminUser } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin credentials (in production, this should be on backend)
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'admin123', // Change this!
  user: {
    id: '1',
    username: 'admin',
    email: 'admin@doctorsuciu.ro',
    role: 'admin' as const,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('admin_user');
    const sessionExpiry = localStorage.getItem('admin_session_expiry');
    
    if (storedUser && sessionExpiry) {
      if (new Date().getTime() < parseInt(sessionExpiry)) {
        setUser(JSON.parse(storedUser));
      } else {
        // Session expired
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_session_expiry');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
      const userWithLogin = {
        ...DEFAULT_ADMIN.user,
        lastLogin: new Date().toISOString(),
      };
      
      setUser(userWithLogin);
      
      // Store session (24 hours)
      localStorage.setItem('admin_user', JSON.stringify(userWithLogin));
      localStorage.setItem('admin_session_expiry', String(new Date().getTime() + 24 * 60 * 60 * 1000));
      
      // Log activity
      logActivity(userWithLogin.id, userWithLogin.username, 'login', 'auth', undefined, 'User logged in');
      
      return true;
    }
    return false;
  };

  const logout = () => {
    if (user) {
      logActivity(user.id, user.username, 'logout', 'auth', undefined, 'User logged out');
    }
    setUser(null);
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_session_expiry');
  };

  const changePassword = async (oldPassword: string, _newPassword: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (oldPassword === DEFAULT_ADMIN.password) {
      // In real app, update on backend
      // For now just log it
      if (user) {
        logActivity(user.id, user.username, 'update', 'auth', undefined, 'Password changed');
      }
      return true;
    }
    return false;
  };

  const logActivity = (
    userId: string,
    username: string,
    action: 'create' | 'update' | 'delete' | 'login' | 'logout',
    entityType: string,
    entityId?: string,
    details?: string
  ) => {
    const logs = JSON.parse(localStorage.getItem('admin_activity_logs') || '[]');
    logs.unshift({
      id: Date.now().toString(),
      userId,
      username,
      action,
      entityType,
      entityId,
      details,
      timestamp: new Date().toISOString(),
    });
    // Keep only last 1000 logs
    localStorage.setItem('admin_activity_logs', JSON.stringify(logs.slice(0, 1000)));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        changePassword,
      }}
    >
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

export default AuthContext;
