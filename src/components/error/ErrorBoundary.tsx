'use client';

import React, { Component, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center animate-bounce-subtle">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800">
                  Oops! Etwas ist schiefgelaufen
                </h2>
                
                <p className="text-gray-600 text-center">
                  {this.state.error?.message || 'Ein unerwarteter Fehler ist aufgetreten.'}
                </p>

                <div className="border-t border-gray-200 w-full my-4" />
                
                <button
                  onClick={this.handleRetry}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Erneut versuchen</span>
                </button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
