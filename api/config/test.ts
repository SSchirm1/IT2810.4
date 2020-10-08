module.exports = {
  type: "sqlite",
  name: "memory",
  database: ":memory:",
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
