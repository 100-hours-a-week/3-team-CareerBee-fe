export default function PointPopup({ points }: { points: number }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex flex-col items-center justify-center text-white text-xl">
      <div className="bg-white mt-auto w-full rounded-t-xl h-60 flex flex-col items-center py-8">
        <img src="/assets/point.svg" alt="포인트" className="h-32 mb-4" />
        <p className="text-md text-text-primary">{points}포인트를 얻었어요!</p>
      </div>
    </div>
  );
}
