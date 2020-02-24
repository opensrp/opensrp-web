# Register pages

This document describes how data flows through the register pages in such a way that we support seamless user experience when filtering, sorting and displaying data.

Components on the page that will be involved include:

-   The browser itself, specifically the address bar
-   The filter components i.e components that will be charged with filtering and sorting the data in response to user actions. this includes:

    -   cardFilters
    -   searchBox
    -   EDD time range picker
    -   select dropdowns r.g for riskLevel, gender e.t.c
    -   frontend pagination component
    -   location breadcrumb
    -   in table sorting by column titles

-   The react-container itself containing the grid where the data is displayed;

The container component is obviously the main player here and its sole goal will be _to read the filter state from the url and hydrate its own filter state_. In other words the container component watches the url and its job is to sync its own filter state with that reflected by the parametrized url.

Order of execution for any register component will be as below:

-   Get filter State from url and add it to the containers local state.
-   Apply sensible defaults for those that are missing; where possible some of this can be predefined in an environmental file
-   Make required api calls to some backend service and populate the appropriate store slice with the response.
-   display the data.

The filter components sole job will be to modify the url.

It is important that we employ visual cues for any stage of the above defined flow. Specifically during times at which the application will be working ( e.g. loading data) and thereafter, the status of the work. i.e if it erred or finished executing successfully.
