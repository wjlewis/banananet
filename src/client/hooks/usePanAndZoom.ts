import { useEffect, useState } from 'react';
import * as pos from '../tools/pos';

export function usePanAndZoom(): CameraState {
  const [camera, setCamera] = useState<CameraState>({
    topLeft: { y: 0, x: 0 },
    ppu: 1,
  });

  useEffect(() => {
    function handleScroll(e: WheelEvent) {
      e.preventDefault();
      const { deltaX, deltaY, ctrlKey, shiftKey, clientX, clientY } = e;

      setCamera(camera => {
        const mousePos = screenToWorld(camera, { y: clientY, x: clientX });
        const mouseOffset = pos.minus(mousePos, camera.topLeft);

        const zoomFactor = deltaY > 0 ? 1.1 : 1 / 1.1;
        const ppu = ctrlKey ? camera.ppu * zoomFactor : camera.ppu;

        const topLeft0 = ctrlKey
          ? pos.minus(mousePos, pos.scale(mouseOffset, 1 / zoomFactor))
          : camera.topLeft;

        const offsets = {
          x: ctrlKey ? 0 : shiftKey ? deltaY : deltaX,
          y: ctrlKey ? 0 : shiftKey ? 0 : deltaY,
        };

        return {
          ...camera,
          topLeft: pos.plus(topLeft0, pos.scale(offsets, 1 / camera.ppu)),
          ppu,
        };
      });
    }

    document.addEventListener('wheel', handleScroll, { passive: false });

    return () => document.removeEventListener('wheel', handleScroll);
  }, []);

  return camera;
}

export interface CameraState {
  // The _world_ coordinate of the camera's top left corner.
  topLeft: pos.Pos;
  ppu: number;
}

export function screenToWorld(camera: CameraState, pos: pos.Pos): pos.Pos {
  const { topLeft, ppu } = camera;

  const x = topLeft.x + pos.x / ppu;
  const y = topLeft.y + pos.y / ppu;

  return { y, x };
}
