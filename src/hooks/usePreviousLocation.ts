import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { prevPathStore } from '@/store/prevPath';

export function PreviousLocation() {
  const location = useLocation();
  const prevLocation = useRef(location.pathname);
  const setPreviousPath = prevPathStore((state) => state.setPreviousPath);

  useEffect(() => {
    return () => {
      setPreviousPath(prevLocation.current);
      prevLocation.current = location.pathname;
    };
  }, [location]);

  return null;
}