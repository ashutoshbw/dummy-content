function randomInt(a: number, b: number) {
  // bounds are included
  return Math.floor(Math.random() * (Math.abs(b - a) + 1) + Math.min(a, b));
}

export function forgivingRandomInt(a: number, b: number) {
  return randomInt(Math.round(Math.abs(a)), Math.round(Math.abs(b)));
}

export function count(a: number, b?: number) {
  if (b === undefined) return () => a;
  return () => forgivingRandomInt(a, b);
}

export function repeatAndJoin(maker: () => string, count: number, sep = '') {
  let result = '';
  for (let i = 0; i < count; i++) {
    result += sep + maker();
  }
  return result.slice(sep.length);
}

export function idMaker(orders: number[]) {
  return `h-${orders.join('-')}`;
}

export function numberingMaker(orders: number[]) {
  return `${orders.join('.')}`;
}
