
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      await login(loginEmail, loginPassword);
      onClose();
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsRegistering(true);
    
    try {
      await register(registerName, registerEmail, registerPassword);
      onClose();
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="bg-netflix-black border-netflix-light-gray max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-netflix-white text-xl">Welcome to MovieGoer</DialogTitle>
          <DialogDescription className="text-netflix-white/70">
            Sign in to book movie tickets and track your orders
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-netflix-gray">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-netflix-white">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="bg-netflix-gray border-netflix-light-gray text-netflix-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-netflix-white">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="bg-netflix-gray border-netflix-light-gray text-netflix-white"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-netflix-red hover:bg-netflix-dark-red"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Signing in...' : 'Sign In'}
              </Button>
              <div className="text-center text-sm text-netflix-white/70">
                <span>New user? </span>
                <button 
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className="text-netflix-red hover:underline"
                >
                  Create an account
                </button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="mt-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-netflix-white">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your full name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                  className="bg-netflix-gray border-netflix-light-gray text-netflix-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-netflix-white">Email</Label>
                <Input 
                  id="register-email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                  className="bg-netflix-gray border-netflix-light-gray text-netflix-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-netflix-white">Password</Label>
                <Input 
                  id="register-password" 
                  type="password"
                  placeholder="Create a password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                  className="bg-netflix-gray border-netflix-light-gray text-netflix-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-netflix-white">Confirm Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-netflix-gray border-netflix-light-gray text-netflix-white"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-netflix-red hover:bg-netflix-dark-red"
                disabled={isRegistering}
              >
                {isRegistering ? 'Creating Account...' : 'Create Account'}
              </Button>
              <div className="text-center text-sm text-netflix-white/70">
                <span>Already have an account? </span>
                <button 
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="text-netflix-red hover:underline"
                >
                  Sign in
                </button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
