import { pool } from "../config/database.js"
import schema from "./Model/schema.js"
import seedData from "./dataindex.js"

for (const [table, query] of Object.entries(schema)) {
  await pool.query(`DROP TABLE IF EXISTS ${table} CASCADE`)
  await pool.query(query)
  console.log(`created ${table}`)
}

for (const [table, query] of Object.entries(schema)) {
  const rows = seedData[table]
  for (const row of rows) {
    await pool.query(
      `INSERT INTO ${table} (${Object.keys(row).join(", ")}) VALUES (${Object.keys(row).map((_, i) => `$${i + 1}`).join(", ")})`,
      Object.values(row)
    )
  }
  console.log(`seeded ${table}`)
}

await pool.query("SELECT setval('customcars_id_seq', (SELECT MAX(id) FROM customcars))")
console.log('reset sequence')

pool.end()