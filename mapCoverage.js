/* eslint-disable @typescript-eslint/no-var-requires */
const createReporter = require('istanbul-api').createReporter;
const istanbulCoverage = require('istanbul-lib-coverage');

const map = istanbulCoverage.createCoverageMap();
const reporter = createReporter();

const directories = ['clients-core', 'packages'];

directories.forEach(directory => {
    const coverage = require(`./coverage/coverage-${directory}-final.json`);
    Object.keys(coverage).forEach(filename => map.addFileCoverage(coverage[filename]));
});

reporter.addAll(['json', 'lcov', 'text']);
reporter.write(map);
