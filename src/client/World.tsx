import React, { FC } from 'react';
import { CameraState, usePanAndZoom } from './hooks/usePanAndZoom';

const World: FC = () => {
  const camera = usePanAndZoom();
  const viewTransform = computeViewTransform(camera);

  return (
    <svg>
      <g transform={viewTransform}>
        <circle cx={100} cy={100} r={50} fill="red" />

        <rect x1={0} y1={1} width={100} height={200} fill="blue" />
      </g>
    </svg>
  );
};

function computeViewTransform(camera: CameraState): string {
  const {
    topLeft: { y, x },
    ppu,
  } = camera;

  const dX = -x * ppu;
  const dY = -y * ppu;

  return `matrix(${ppu} 0 0 ${ppu} ${dX} ${dY})`;
}

export default World;
