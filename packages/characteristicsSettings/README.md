# Population Characteristics

This package provides a UI for Editing OpenSrp population characteristics.
With a list of all population characteristics for a specific location and ability to traverse through location hierarchies it is easy to edit each characteristic.

## Instalation

```node
yarn add @opensrp/population-characteristics
```

## Edit characteristics

```typescript
import ConnectedEditSetings from '@opensrp/population-characteristics'

const EditSetingsPage = () => {

    const editSetingsProps = {
        LoadingComponent: <loading component>, // optional,
        baseURL: <OpenSRP API base url without rest at end>,
        getPayload: <function for generating OpenSrp API headers>,
        locationsEndpoint: <OpenSrp API location tree endpoint>,
        restBaseURL: <OpenSRP API base url>,
        secAuthEndpoint: <OpenSrp API security authenticate endpoint>,
        settingsEndpoint: <OpenSrp API settings endpoint>,
    };
    return <ConnectedEditSetings {...editSetingsProps} />
};
```
