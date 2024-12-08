import React, { createContext, useContext, useCallback, useState } from 'react';
import { XCircle, CheckCircle, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  type?: ToastType;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
  action?: ToastOptions['action'];
}

interface ToastContextType {
  showToast: (message: string, options?: ToastOptions) => void;
  hideToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const toastVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const ToastIcon = ({ type }: { type: ToastType }) => {
  const iconProps = {
    className: 'w-5 h-5',
    'aria-hidden': true,
  };

  switch (type) {
    case 'success':
      return <CheckCircle {...iconProps} className="text-green-500" />;
    case 'error':
      return <XCircle {...iconProps} className="text-red-500" />;
    case 'info':
      return <AlertCircle {...iconProps} className="text-blue-500" />;
  }
};

const ToastItem = ({ 
  toast,
  onDismiss 
}: { 
  toast: Toast;
  onDismiss: () => void;
}) => {
  const progressBarVariants = {
    initial: { scaleX: 0 },
    animate: { 
      scaleX: 1,
      transition: { 
        duration: toast.duration / 1000,
        ease: 'linear',
      },
    },
  };

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`
        flex items-center gap-2 p-4 rounded-lg shadow-lg
        relative overflow-hidden
        ${toast.type === 'success' ? 'bg-green-50 border-green-500' :
          toast.type === 'error' ? 'bg-red-50 border-red-500' :
          'bg-blue-50 border-blue-500'
        }
        border-l-4 min-w-[300px] max-w-md
      `}
      role="alert"
    >
      <ToastIcon type={toast.type} />
      <p className="text-gray-700 flex-1">{toast.message}</p>
      
      {toast.action && (
        <button
          onClick={toast.action.onClick}
          className="px-2 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          {toast.action.label}
        </button>
      )}
      
      <button
        onClick={onDismiss}
        className="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Schließen"
      >
        <X className="w-4 h-4" />
      </button>

      <motion.div
        variants={progressBarVariants}
        initial="initial"
        animate="animate"
        onAnimationComplete={onDismiss}
        className={`
          absolute bottom-0 left-0 right-0 h-1
          ${toast.type === 'success' ? 'bg-green-500' :
            toast.type === 'error' ? 'bg-red-500' :
            'bg-blue-500'
          }
          opacity-50
        `}
        style={{ transformOrigin: '0%' }}
      />
    </motion.div>
  );
};

interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastOptions['position'];
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children,
  position = 'bottom-right',
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const hideToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, options: ToastOptions = {}) => {
    const id = Date.now();
    const newToast: Toast = {
      id,
      message,
      type: options.type || 'info',
      duration: options.duration || 3000,
      action: options.action,
    };
    
    setToasts(prev => [...prev, newToast]);
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div className={`fixed ${getPositionClasses()} space-y-2 z-50`}>
        <AnimatePresence mode="sync">
          {toasts.map(toast => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onDismiss={() => hideToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
