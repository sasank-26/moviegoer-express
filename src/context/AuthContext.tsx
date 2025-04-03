
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  // Initialize the auth state from Supabase session
  useEffect(() => {
    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      
      if (data.session?.user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('name')
          .eq('id', data.session.user.id)
          .single();

        setUser({
          id: data.session.user.id,
          name: profile?.name || data.session.user.email?.split('@')[0] || 'User',
          email: data.session.user.email || '',
        });
      }
    };
    
    initAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        
        if (event === 'SIGNED_IN' && newSession?.user) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('name')
            .eq('id', newSession.user.id)
            .single();
            
          setUser({
            id: newSession.user.id,
            name: profile?.name || newSession.user.email?.split('@')[0] || 'User',
            email: newSession.user.email || '',
          });
          toast.success('Welcome back!');
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          toast.info('You have been logged out');
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data: { user: newUser }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) throw error;
      
      if (newUser) {
        // Create a profile entry for the user
        await supabase.from('user_profiles').insert({
          id: newUser.id,
          name,
          email,
        });
        
        toast.success('Registration successful!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
    }
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
