"use client"

import { ToastContext } from '@/features/toast/components/toastProvider';
import { useContext } from 'react';

export default function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
      throw new Error('useToast must be used within a ToastProvider');
    }
    return context.toast;
}

