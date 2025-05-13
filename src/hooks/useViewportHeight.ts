// 모바일 뷰 지원
import { useEffect } from "react";

export function useViewportHeight() {
  useEffect(() => {
    const setRealVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setRealVh();
    window.addEventListener('resize', setRealVh);

    return () => {
      window.removeEventListener('resize', setRealVh);
    };
  }, []);
}
