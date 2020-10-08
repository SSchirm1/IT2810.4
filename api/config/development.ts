module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB,
  entities: ["src/entity/*.{js,ts}"],
  migrations: ["src/migration/*.{js,ts}"],
  seeds: ["src/seeds/*.{js,ts}"],
  subscribers: ["src/subscribers/*.{js,ts}"],
  factories: ["src/factories/*.{js,ts}"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
  logging: false,
  synchronize: false,
};
