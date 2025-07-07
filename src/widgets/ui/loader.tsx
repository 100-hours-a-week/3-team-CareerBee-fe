'use client';

import '@/src/widgets/assets/loader.css';
import '@/src/widgets/assets/circleLoader.css';

export const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className={`loader`} />
    </div>
  );
};

export const CircleLoader = ({ size = 50 }: { size?: number }) => {
  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <div className="circleLoader" />
    </div>
  );
};
