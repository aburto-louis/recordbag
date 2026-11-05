import { S3Client } from "bun"
import { AVI_TTL } from "store/server"

export function presignGet(key: string): string {
  return S3Client.presign(key, {
    method: "GET",
    expiresIn: AVI_TTL,
    region: "auto",
  })
}
