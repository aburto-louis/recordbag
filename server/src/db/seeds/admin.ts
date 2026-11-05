import { userInsertSchema } from "store/server"
import { runMigrations } from "../migrate"
import { db } from "../sqlite"
import { hashPassword } from "../../lib/hash"

const parse = userInsertSchema.safeParse({
  name: process.env.SEED_ADMIN_NAME,
  email: process.env.SEED_ADMIN_EMAIL,
  username: process.env.SEED_ADMIN_USERNAME,
  password: process.env.SEED_ADMIN_PASSWORD,
  country_code: process.env.SEED_ADMIN_COUNTRY,
  avi_key: process.env.SEED_ADMIN_AVI,
})

if (!parse.success) {
  throw new Error("Invalid admin seed config", { cause: parse.error })
}

const { name, email, username, password, country_code, avi_key } = parse.data

runMigrations(db)

const admin = db.query(`SELECT id FROM users WHERE admin = 1 LIMIT 1`).get()

if (!admin) {
  db.run(
    `
    INSERT INTO users
      (name, email, username, password_hash, country_code, avi_key, admin)
    VALUES (?, ?, ?, ?, ?, ?, 1)
    `,
    [name, email, username, await hashPassword(password), country_code, avi_key]
  )
  console.log("Admin user created")
} else {
  console.log("Admin user already exists")
}
