module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  setupFilesAfterEnv: ["<rootDir>/setup-enzyme-test.js"]
}
