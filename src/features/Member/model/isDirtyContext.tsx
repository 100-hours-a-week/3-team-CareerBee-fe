import { createContext, useContext, useState } from 'react';
import React from 'react';

const DirtyContext = createContext<{
  isNicknameDirty: boolean;
  isProfileImageDirty: boolean;
  setIsNicknameDirty: (_val: boolean) => void;
  setIsProfileImageDirty: (_val: boolean) => void;
  isAnyDirty: boolean;
} | null>(null);

export const DirtyProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNicknameDirty, setIsNicknameDirty] = useState(false);
  const [isProfileImageDirty, setIsProfileImageDirty] = useState(false);
  const isAnyDirty = isNicknameDirty || isProfileImageDirty;
  return (
    <DirtyContext.Provider
      value={{
        isNicknameDirty,
        isProfileImageDirty,
        setIsNicknameDirty,
        setIsProfileImageDirty,
        isAnyDirty,
      }}
    >
      {children}
    </DirtyContext.Provider>
  );
};

export const useDirty = () => {
  const ctx = useContext(DirtyContext);
  if (!ctx) throw new Error('useDirty must be used within DirtyProvider');
  return ctx;
};
