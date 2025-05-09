const listeners = new Set<(msg: string) => void>();

export const publishErrorToast = (msg: string) => {
  listeners.forEach(listener => listener(msg));
};

export const subscribeErrorToast = (callback: (msg: string) => void) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};