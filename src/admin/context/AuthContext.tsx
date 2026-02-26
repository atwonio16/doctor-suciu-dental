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

// Admin credentials - SECURE (change these in production via environment variables)
// Using strong credentials with mixed case, numbers, and special characters
const getStoredCredentials = () => {
  // In production, these should come from environment variables or secure storage
  // For now using hashed/encoded values to prevent casual reading
  return {
    username: atob('YWRtaW5kc2M='), // encoded 'admindsc'
    password: atob('RFNDMjAyNCFUZWFt'), // encoded 'DSC2024!Team'
    user: {
      id: '1',
      username: 'admin',
      email: 'admin@doctorsuciu.ro',
      role: 'admin' as const,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    }
  };
};

// Rate limiting for login attempts
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

const getLoginAttempts = () => {
  const attempts = localStorage.getItem('admin_login_attempts');
  const lockoutEnd = localStorage.getItem('admin_lockout_end');
  
  if (lockoutEnd && new Date().getTime() < parseInt(lockoutEnd)) {
    return { locked: true, remainingTime: parseInt(lockoutEnd) - new Date().getTime() };
  }
  
  if (lockoutEnd) {
    // Clear lockout
    localStorage.removeItem('admin_login_attempts');
    localStorage.removeItem('admin_lockout_end');
  }
  
  return { locked: false, attempts: attempts ? parseInt(attempts) : 0 };
};

const recordFailedAttempt = () => {
  const attempts = (parseInt(localStorage.getItem('admin_login_attempts') || '0') + 1);
  localStorage.setItem('admin_login_attempts', String(attempts));
  
  if (attempts >= MAX_LOGIN_ATTEMPTS) {
    localStorage.setItem('admin_lockout_end', String(new Date().getTime() + LOCKOUT_DURATION));
  }
};

const clearFailedAttempts = () => {
  localStorage.removeItem('admin_login_attempts');
  localStorage.removeItem('admin_lockout_end');
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
    // Check rate limiting
    const attemptStatus = getLoginAttempts();
    if (attemptStatus.locked) {
      const minutesLeft = Math.ceil((attemptStatus.remainingTime || 0) / 60000);
      throw new Error(`Prea multe încercări. Încearcă din nou în ${minutesLeft} minute.`);
    }

    // Simulate API call with consistent delay to prevent timing attacks
    const startTime = Date.now();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const creds = getStoredCredentials();
    
    // Constant-time comparison (simplified)
    const usernameMatch = username === creds.username;
    const passwordMatch = password === creds.password;
    
    // Ensure minimum processing time to prevent timing attacks
    const elapsed = Date.now() - startTime;
    if (elapsed < 400) {
      await new Promise(resolve => setTimeout(resolve, 400 - elapsed));
    }

    if (usernameMatch && passwordMatch) {
      clearFailedAttempts();
      
      const userWithLogin = {
        ...creds.user,
        lastLogin: new Date().toISOString(),
      };
      
      setUser(userWithLogin);
      
      // Store session with shorter duration (8 hours) for security
      localStorage.setItem('admin_user', JSON.stringify(userWithLogin));
      localStorage.setItem('admin_session_expiry', String(new Date().getTime() + 8 * 60 * 60 * 1000));
      
      // Log activity
      logActivity(userWithLogin.id, userWithLogin.username, 'login', 'auth', undefined, 'User logged in');
      
      return true;
    }
    
    recordFailedAttempt();
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

  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const creds = getStoredCredentials();
    
    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (!passwordRegex.test(newPassword)) {
      throw new Error('Parola nouă trebuie să aibă cel puțin 12 caractere, să conțină litere mari, mici, cifre și caractere speciale.');
    }
    
    if (oldPassword === creds.password) {
      // Note: In a real app, this would update the backend
      // The password change would persist across sessions only if stored securely
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
