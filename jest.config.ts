module.exports = {
  testPathIgnorePatterns: ["/node_modules"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  testEnvironment: "jsdom",
  rootDir: ".",
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    "^@ui/(.*)$": "<rootDir>/@/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@api/(.*)$": "<rootDir>/src/api/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@dtos/(.*)$": "<rootDir>/src/dtos/$1",
    "^@configs/(.*)$": "<rootDir>/src/configs/$1",
    "^@schemas/(.*)$": "<rootDir>/src/schemas/$1",
    "^@reducers/(.*)$": "<rootDir>/src/reducers/$1",
    "^@contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^@layouts/(.*)$": "<rootDir>/src/layouts/$1",
  },
};
