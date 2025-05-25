const listeners = new Set<(_msg: string) => void>();

export const publishErrorToast = (msg: string) => {
  listeners.forEach((listener) => listener(msg));
};

export const subscribeErrorToast = (callback: (_msg: string) => void) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};
