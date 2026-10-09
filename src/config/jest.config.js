module.exports = {
    rootDir: "../../",
    preset: "ts-jest",
    roots: ["<rootDir>/src"],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": ["ts-jest", {
            tsconfig: {
                module: "commonjs"
            }
        }],
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    }
}