import { createContext, useContext, useState } from 'react';
import React from 'react';

const DirtyContext = createContext<{
  isDirty: boolean;
  setIsDirty: (_val: boolean) => void;
} | null>(null);

export const DirtyProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDirty, setIsDirty] = useState(false);
  return <DirtyContext.Provider value={{ isDirty, setIsDirty }}>{children}</DirtyContext.Provider>;
};

export const useDirty = () => {
  const ctx = useContext(DirtyContext);
  if (!ctx) throw new Error('useDirty must be used within DirtyProvider');
  return ctx;
};
