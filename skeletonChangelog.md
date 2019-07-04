Delete Jquery and mapboxGl scripts from public/html.index
Rename the REACT_APP_WEBSITE_NAME from Reveal to OpenSRP
Change the id of the main render div in public/html.index from reveal-root to openSRP-root
Change the id referencing the htmle element that will act as root of the react app.
Delete the DrillDownTableLinkedCell folder.
Delete GisidaWrapper tests folder
Delete gisida.css file for gisidaWrapper component
Delete gisidaWrapper folder and component index.tsx file
Delete src/components/formatting/ResponseAdherenve.tsx
Delete src/components/fomratting/OneThreeSevenAdherence.tsx and the resulting empty formatting folder
Delete loading component test files
Delete loading component styles
Delete loading component index file and parent folder
Delete the fixtures.ts file from ducks
Delete tests for the goals reducers
Delete tests for the jurisdictions_reducers
Delete goals reducer file for store/ducks.
Delete jurisdiction reducer index.ts file form store/ducks
Delete tests for the map reducer
Delete map reducer file form store/ducks
Delete test file for the tasks reducer
delete the tasks reducer file that was in store/ducks
Delete tests for the plan reducer previously at store/ducks/tests/plan.ts
Delete the plan reducer file previously at store/ducks/plans.ts
Delete color constants definition for map stuff in colors.tsx
Delete color constants definition for structures form colors.tsx
Delete color constants definition for tasks form src/colors.tsx
Delete type declaration files for mapbox/geojson-extent
Delete module declaration files for gisida-react
Delete module declaration files for gisida module
Refactor the application name in the readme from reveal-frontend to OpenSRP web.
Add a circleCi badge

Change REACT_APP_WEBSITE_NAME from Reveal to OpenSRP
REmove gisida specific environment variables from circle ci config file
Replaced reveal favicon with one downloaded from opensrp smartregister site
Strip reveal specific constants and components form src/App/App.tsx
Delete connectedPrivateRoute components implementation that route to reveal specific container components
Remove mocked environment variables that are gisida-related
Delete ActiveFI folder
Delete Historical Focus Investigation component's folder
Delete SingleActiveFIMap component's folder
Delete singleActiveFI compoent folder and the empty FOcusInvestigation folder
Delete IRS container component's folder

Remove reveal specific envionment variables from .env.sample
Replace deprecated loader component with the same but from the published js-tools loader component.
install Loader component form js-tools
Update snapshots for the src/App/App.tsx component
Remove Reveal related consts form config/envs that are derived from Reveal specific environment variables
Remove FI classification interface from the settings from config/settings.ts
Remove LocationItem (Reveal-related) interface from config/settings.ts
Remove location hierarchy configurations used by FI from config/settings.ts
Remove Focus investigation-specific configurations from config/settings.ts
Remove indicator(Adherence components) confgurations form config/settings.ts
Remove configuration settings for following layers: - line layer configuration - fill layer opacity configuration - fill layer configuration - circle layer configuration
Remove Reveal content from the home component
Remove styles that were being used by the Reveal jsx elements in home component
Remove helper/handler file: - contained declarations for mapbox - popup handler function for after features render
Remove style file associated with the above handler file
Delete the helpers/handler folder: at this point it just contained the tests for deleted handler files
Delete indicators file: contained utility functions that dealt with goals reporting, adherence reporting and FI classification rendering, all of which are Reveal specific.
Remove mapbox file that exported mapbox event interface
Remove tests for already removed indicator functionality
Remove ProgressBar component: This will be moved to Js-tools
Remove color maps for tasks structures contextual coloring
Remove consts declarations for tasks action_codes
Delete const declarations for internal urls to Reveal specific internal paths
Delete const declarations for Reveal specific strings

Changes to helpers/utils: - strip off Reveal specific interfaces - strip off gisida configuration store - strip off Reveal specific utility functions - Removng imports that become unused
Remove tests for depreceted utility functionality
Update snapshots: - src/App/App.tsx - src/components/page/Header - src/containers/ConnectedHeader - src/containers/pages/Home/
Delete helpers/tables.css file; seems it is not being used anywhere.
Remove links to Reveal container from Header component
Replace Reveal logo with an openSRP logo
Delete Reveal log.svg file
Revert the delete change to the Loading component.
