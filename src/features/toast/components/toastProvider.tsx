"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';
import Toast from './toast';

// Define the types for toast
export type ToastType = 'normal' | 'success' | 'error' | 'warning';

export interface ToastProps {
  status?: ToastType;
  text?: string;
  click?: () => void;
  clickText?: string; 
  duration?: number;
  clx?: string; 
}

// Create a context for toast management
export const ToastContext = createContext<{
  toast: (props: ToastProps) => void;
}>({
  toast: () => { }
});

// Toast Provider Component
export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toastQueue, setToastQueue] = useState<ToastProps[]>([]);

  const close = (id: number) => {
    const filteredToast = toastQueue.filter((t, i) => i !== id)
    setToastQueue(filteredToast)
  }

 


  const toast = (props: ToastProps) => {
    const newToast = {
      status: props.status || 'normal',
      text: props.text || '',
      click: props.click,
      clickText: props.clickText,
      duration: props.duration || 3000,
      clx: props.clx
    };

    setToastQueue(prev => [...prev, newToast]);

    // Automatically remove toast after duration
    setTimeout(() => {
      setToastQueue(prev => prev.slice(1));
    }, newToast.duration);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className='fixed z-[100000] top-8 right-4 sm:right-12 grid gap-2'>
        {toastQueue.map((toastItem, index) => (
          <Toast
            key={index}
            status={toastItem.status}
            text={toastItem.text}
            click={toastItem.click}
            clickText={toastItem.clickText}
            clx={toastItem.clx}
            close={() => close(index)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

