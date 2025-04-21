import { SecurityColors, systemDetails } from "constants/systems";

export const getSecurityColor = (security: number) => {
  let trimmed = +security.toFixed(1);

  if (trimmed <= 0) {
    trimmed = 0;
  }

  return SecurityColors[trimmed];
}

export const getClassName = (classId) => {
  if ((classId > 0 && classId < 7) || (classId > 11 && classId < 19)) {
    return `C${classId}`;
  }
  if (classId === 7) {
    return 'HS';
  }
  if (classId === 8) {
    return 'LS';
  }
  if (classId === 9) {
    return 'NS';
  }
  if (classId === 25) {
    return 'TC';
  }
};

export const MapDimensions = () => {
  if (!systemDetails) {
    return null;
  }
  
  const kspace = [];
  const wormholes = [];
  for (const id in systemDetails) {
    const { wormholeClassID } = systemDetails[id];
    if ((wormholeClassID > 0 && wormholeClassID < 7) || (wormholeClassID > 11 && wormholeClassID < 19)) {
      wormholes.push(systemDetails[id]);
    } else {
      kspace.push(systemDetails[id]);
    }
  }

  return {
    known: getDimensions(kspace),
    unknown: getDimensions(wormholes),
  };
}

const getDimensions = (systems) => {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];

  for (const system of systems) {
    const [x, y, z] = system.position;

    min[0] = Math.min(min[0], x);
    min[1] = Math.min(min[1], y);
    min[2] = Math.min(min[2], z);

    max[0] = Math.max(max[0], x);
    max[1] = Math.max(max[1], y);
    max[2] = Math.max(max[2], z);
  }

  if (min[0] === Infinity) {
     return {
      min: [0,0,0],
      max: [0,0,0],
      center: [0,0,0],
      size: [0,0,0],
      radius: 0
    };
  }

  const center = [
    (min[0] + max[0]) / 2,
    (min[1] + max[1]) / 2,
    (min[2] + max[2]) / 2,
  ];

  const size = [
    max[0] - min[0],
    max[1] - min[1],
    max[2] - min[2],
  ];

  const dx = max[0] - center[0];
  const dy = max[1] - center[1];
  const dz = max[2] - center[2];
  const radius = Math.sqrt(dx*dx + dy*dy + dz*dz);

  return { min, max, center, size, radius };
}