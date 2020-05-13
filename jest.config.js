module.exports = {
    coverageReporters: ['lcov', 'json', 'html'],
    collectCoverageFrom: [
        'clients/core/src/**/*.{js,jsx,ts,tsx}',
        'packages/**/*.{js,jsx,ts,tsx}',
        '!clients/*/src/index.tsx',
        '!clients/*/src/serviceWorker.ts',
        '!clients/*/src/colors.tsx',
        '!**/node_modules/**',
        '!**/coverage/**',
        '!**/dist/**',
        '!**/{tests,__tests__}/**',
    ],
    setupFiles: ['./setupJest.ts', './setupTests'],
    roots: ['packages/', 'clients'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': 'identity-obj-proxy',
    },
};

// import dotenv from 'dotenv';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
