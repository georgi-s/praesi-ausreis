import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession } from 'next-auth/react';

export interface AuthError extends Error {
  code?: string;
  statusCode?: number;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    url?: string;
  } | null;
}

export const useAuthService = () => {
  const { data: session, status } = useSession();
  
  const isLoading = status === 'loading';
  const isAuthenticated = !!session;

  const signIn = async (provider: string = 'github') => {
    try {
      const result = await nextAuthSignIn(provider);
      return { success: true, data: result };
    } catch (error) {
      console.error('Sign in error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to sign in',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  };

  const signOut = async () => {
    try {
      await nextAuthSignOut();
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to sign out',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  };

  return {
    isLoading,
    isAuthenticated,
    user: session?.user ?? null,
    signIn,
    signOut,
  };
};

export type AuthService = ReturnType<typeof useAuthService>;
