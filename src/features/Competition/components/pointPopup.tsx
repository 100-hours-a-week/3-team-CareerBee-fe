import { motion } from 'motion/react';

export default function PointPopup({ points }: { points: number }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex flex-col items-bottom justify-end text-white text-xl">
      <motion.div
        initial={{ opacity: 0.8, y: 240 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className="bg-white mt-auto w-full rounded-t-xl h-60 flex flex-col items-center py-8">
          <img src="/assets/point.svg" alt="포인트" className="h-32 mb-4" />
          <p className="text-md text-text-primary">{points}포인트를 얻었어요!</p>
        </div>
      </motion.div>
    </div>
  );
}
