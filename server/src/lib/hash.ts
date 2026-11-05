export const DUMMY_ARGON2 =
  "$argon2id$v=19$m=65536,t=2,p=1$VkvbogbATt9XvRA0/bIoSBTSkLCl1xZ0tXaQkHE4sN4$ogASpY/E/vOMWsAxN3uMPKyly6m11ZtiLW2iil6+hBo"

export async function hashPassword(password: string): Promise<string> {
  return Bun.password.hash(password, {
    algorithm: "argon2id",
    memoryCost: 65536,
    timeCost: 2,
  })
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    return await Bun.password.verify(password, hash)
  } catch {
    return false
  }
}

export function hashToken(token: string): string {
  return Bun.SHA256.hash(token, "hex")
}
