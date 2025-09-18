import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // transform ts/tsx/js/jsx through ts-jest
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest', {
      isolatedModules: true,
    }]
  },
  globals: {
    // point ts-jest to the jest-specific tsconfig
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json"
    }
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/"
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"]
};

export default config;
