module.exports = {
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};
