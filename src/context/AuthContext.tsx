
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<{email: string, password: string, name: string}[]>([]);

  // Check if we have a user in localStorage on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('movieapp_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('movieapp_user');
      }
    }
    
    const storedUsers = localStorage.getItem('movieapp_registered_users');
    if (storedUsers) {
      try {
        setRegisteredUsers(JSON.parse(storedUsers));
      } catch (error) {
        console.error('Failed to parse registered users:', error);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Check if user has registered
      const registeredUser = registeredUsers.find(u => u.email === email && u.password === password);
      
      if (registeredUser) {
        const loggedInUser = { id: Date.now().toString(), name: registeredUser.name, email };
        setUser(loggedInUser);
        localStorage.setItem('movieapp_user', JSON.stringify(loggedInUser));
        toast.success('Welcome back!');
        return;
      }
      
      // Fallback to default user for demo purposes
      if (email === 'user@example.com' && password === 'password') {
        const loggedInUser = { id: '123', name: 'John Doe', email };
        setUser(loggedInUser);
        localStorage.setItem('movieapp_user', JSON.stringify(loggedInUser));
        toast.success('Welcome back!');
        return;
      }
      
      toast.error('Invalid email or password');
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Check if user already exists
      if (registeredUsers.some(u => u.email === email)) {
        toast.error('User with this email already exists');
        return;
      }
      
      // Add to registered users
      const newRegisteredUsers = [...registeredUsers, { name, email, password }];
      setRegisteredUsers(newRegisteredUsers);
      localStorage.setItem('movieapp_registered_users', JSON.stringify(newRegisteredUsers));
      
      // Auto login after registration
      const newUser = { id: Date.now().toString(), name, email };
      setUser(newUser);
      localStorage.setItem('movieapp_user', JSON.stringify(newUser));
      
      toast.success('Registration successful!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('movieapp_user');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
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
