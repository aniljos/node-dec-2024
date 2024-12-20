module.exports = {
    testEnvironment: "node", // Set the environment to Node.js
    testMatch: ["**/*.test.js"], // Match only test files with `.test.js` extension
    moduleFileExtensions: ["js"], // Only recognize `.js` files
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.mjs$": "babel-jest",
      },
  };
  