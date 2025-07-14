import BeeImage from '@/src/features/resume/form/assets/bee.png';
import BeehiveImage from '@/src/features/resume/form/assets/beehive.png';

export const ProgressBar = (watchedValues: {
  watchedValues: [string, string, number, number, string];
}) => {
  return (
    <div className="w-full mt-10 relative">
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-3 bg-primary transition-all duration-1000 rounded-full"
          style={{
            width: `${(Object.values(watchedValues).filter(Boolean).length / 5) * 100}%`,
          }}
        />
      </div>
      <img
        src={BeeImage.src}
        alt="bee"
        className="absolute top-[-1.75rem]"
        style={{
          left: `calc(${
            Object.values(watchedValues).filter(Boolean).length === 5
              ? 92
              : (Object.values(watchedValues).filter(Boolean).length / 5) * 100
          }% - 12px)`,
          transition: 'left 1s ease',
          height: '24px',
        }}
      />
      <img
        src={BeehiveImage.src}
        alt="hive"
        className="absolute top-[-1.75rem] right-0"
        style={{ height: '24px' }}
      />
    </div>
  );
};

export default ProgressBar;
