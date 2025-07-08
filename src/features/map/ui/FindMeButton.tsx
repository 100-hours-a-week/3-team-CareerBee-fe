import { PiCrosshairSimple } from 'react-icons/pi';
import { Button } from '@/src/widgets/ui/button';

import { useMapEvents } from '@/src/features/map/lib/useMapEvents';

export function FindMeButton() {
  const { handleMoveToCurrentLocation } = useMapEvents();
  return (
    <div className="absolute bottom-6 left-4 z-40 [&_svg]:size-8">
      <Button
        label={<PiCrosshairSimple />}
        variant="icon"
        className="bg-white rounded-full w-12 h-12 m-0 p-2 shadow-md"
        onClick={() => {
          handleMoveToCurrentLocation();
        }}
      />
    </div>
  );
}
