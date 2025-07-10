export default function RecruitmentBanner({ isRecruiting }: { isRecruiting: boolean }) {
  if (!isRecruiting) return;
  return (
    <div className="overflow-hidden h-6 bg-secondary text-text-primary text-sm flex items-center">
      <div className="flex animate-marquee whitespace-nowrap min-w-max">
        {Array(4)
          .fill('현재 채용 중입니다.')
          .map((text, idx) => (
            <span key={idx} className="mx-16">
              {text}
            </span>
          ))}
      </div>
    </div>
  );
}
