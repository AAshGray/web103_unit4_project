import { createRequire } from "module"
import { fileURLToPath } from "url"
import { readdirSync } from "fs"
import { join, basename } from "path"

const require = createRequire(import.meta.url)
const dir = fileURLToPath(new URL("./Model", import.meta.url))
const files = readdirSync(dir).filter(f => f.endsWith(".js") && f !== "index.js" && f !== "schema.js")

const seedData = {}

for (const file of files) {
  const table = basename(file, ".js")
  const data = require(join(dir, file))
  seedData[table] = data.default ?? data
}

export default seedData