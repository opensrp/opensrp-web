// Note: we deliberately use the older require syntax here, so that
// setupTests.js is loadable without additional babel configuration.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const enzyme = require('enzyme');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
