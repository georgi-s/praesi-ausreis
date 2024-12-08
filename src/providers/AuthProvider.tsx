import React, { createContext, useContext, useCallback } from 'react';
import { useAuthService, type AuthService } from '@/services/auth.service';

const AuthContext = createContext<AuthService | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuthService();

  const memoizedAuth = {
    ...auth,
    signIn: useCallback(auth.signIn, []),
    signOut: useCallback(auth.signOut, []),
  };

  return (
    <AuthContext.Provider value={memoizedAuth}>
      {children}
    </AuthContext.Provider>
  );
};
