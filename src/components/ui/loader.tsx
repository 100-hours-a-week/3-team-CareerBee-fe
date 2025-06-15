import '@/static/loader.css';
import '@/static/circleLoader.css';

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
      <div className="circleLoader w-full h-full" />
    </div>
  );
};
