export interface Pos {
  x: number;
  y: number;
}

export function plus(lhs: Pos, rhs: Pos): Pos {
  return {
    x: lhs.x + rhs.x,
    y: lhs.y + rhs.y,
  };
}

export function minus(lhs: Pos, rhs: Pos): Pos {
  return {
    x: lhs.x - rhs.x,
    y: lhs.y - rhs.y,
  };
}

export function scale(p: Pos, factor: number): Pos {
  return {
    x: p.x * factor,
    y: p.y * factor,
  };
}
