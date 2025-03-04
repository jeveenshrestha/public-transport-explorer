// jest.config.mjs
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx|mjs|cjs)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.spec.json'
      }
    ]
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    '\\.(jpg|jpeg|png|gif|webp)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(scss|less)$': 'identity-obj-proxy',
    '^react-leaflet$': '<rootDir>/__mocks__/react-leaflet.js',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/node_modules/(?!(react-leaflet|@react-leaflet|leaflet)/)'],
};
