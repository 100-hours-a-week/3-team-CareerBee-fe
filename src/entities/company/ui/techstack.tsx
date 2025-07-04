import {
  PiBrowsers,
  PiTerminalWindow,
  PiRobot,
  PiCloud,
  PiMicrosoftTeamsLogo,
} from 'react-icons/pi';
import { TechStack } from '@/src/entities/company/model/company';
import React from 'react';

interface Props {
  techstacks: TechStack[];
}

const techStackType: Record<string, { icon: React.ReactNode; label: string }> = {
  FRONTEND: { icon: <PiBrowsers />, label: '프론트엔드' },
  BACKEND: { icon: <PiTerminalWindow />, label: '백엔드' },
  AI: { icon: <PiRobot />, label: 'AI' },
  DEVOPS: { icon: <PiCloud />, label: '클라우드(DevOps)' },
  COMMUNICATION: { icon: <PiMicrosoftTeamsLogo />, label: '협업 툴' },
};

export default function TechstackTab({ techstacks }: Props) {
  const grouped = techstacks.reduce<Record<string, TechStack[]>>((acc, stack) => {
    if (!acc[stack.type]) acc[stack.type] = [];
    acc[stack.type].push(stack);
    return acc;
  }, {});

  return (
    <div className="px-2">
      {Object.entries(techStackType).map(([type, { icon, label }]) => (
        <div key={type} className="flex flex-col gap-2 py-2">
          <div className="flex gap-2 items-center [&_svg]:size-5">
            {icon} <p>{label}</p>
          </div>
          <div className="flex flex-wrap gap-2 pl-7">
            {(grouped[type]?.length ?? 0) > 0 ? (
              grouped[type].map((techstack) => (
                <div
                  key={techstack.id}
                  className="flex items-center border rounded-md border-border/30 py-1 px-2 gap-1 bg-white"
                >
                  <img src={techstack.imgUrl} alt={techstack.name} className="w-5 h-5" />
                  <p className="text-sm">{techstack.name}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-text-primary px-2">-</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
