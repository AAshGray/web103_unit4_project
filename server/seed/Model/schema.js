export default {
  colors: `CREATE TABLE IF NOT EXISTS colors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    optionType VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    hex VARCHAR(7) NOT NULL
  )`,

  roofs: `CREATE TABLE IF NOT EXISTS roofs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    image VARCHAR(255) NOT NULL
  )`,

  wheels: `CREATE TABLE IF NOT EXISTS wheels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    image VARCHAR(255) NOT NULL
  )`,

  interiors: `CREATE TABLE IF NOT EXISTS interiors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    material VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    availableColorIds INTEGER[] NOT NULL,
    image VARCHAR(255) NOT NULL
  )`,

  models: `CREATE TABLE IF NOT EXISTS models (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    basePrice INTEGER NOT NULL,
    availableColorIds INTEGER[] NOT NULL,
    image VARCHAR(255) NOT NULL
  )`,

  customCars: `CREATE TABLE IF NOT EXISTS customCars (
      id SERIAL PRIMARY KEY,
      modelId INTEGER REFERENCES models(id),
      colorId INTEGER REFERENCES colors(id),
      roofId INTEGER REFERENCES roofs(id),
      wheelId INTEGER REFERENCES wheels(id),
      interiorId INTEGER REFERENCES interiors(id),
      totalPrice INTEGER NOT NULL,
      description TEXT NOT NULL,
      submittedBy VARCHAR(255) NOT NULL,
      submittedOn TIMESTAMP NOT NULL
    )`,

}