export const AVI_TTL = 60 * 60

export const MAX_AGE = 7 * 24 * 60 * 60

export const MAX_TIME = 10000000000

export function unixNow(): number {
  return Math.floor(Date.now() / 1000)
}

export function unixMinus(seconds: number): number {
  return unixNow() - seconds
}

export function unixPlus(seconds: number): number {
  return unixNow() + seconds
}

export function unixToDate(unixTimestamp: number): Date {
  return new Date(unixTimestamp * 1000)
}
