const config = {
    transform: {
        "^.+\\.tsx?$": "esbuild-jest-transform",
    },
    moduleNameMapper: {
        "^src(.*)$": "<rootDir>/src$1",
    },
    testEnvironment: "jsdom",
};

module.exports = config;
