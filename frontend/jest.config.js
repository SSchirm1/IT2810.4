module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: ["/node_modules/", "/cypress/"],
    testTimeout: 100000,
    resetMocks: true
};