# Population Characteristics

This package provides a UI for Editing OpenSrp population characteristics.
With a list of all population characteristics for a specific location and ability to traverse through location hierarchies it is easy to edit each characteristic.

## Instalation

```node
yarn add @opensrp/population-characteristics
```

```ts
import '@opensrp/population-characteristics/dist/styles/index.css';
```

## Edit characteristics

```ts
import ConnectedEditSetings from '@opensrp/population-characteristics';
```

### Required props

_baseURL_: OpenSRP API base url without rest at end i.e https://.../opensrp/
_getPayload_: Function for generating OpenSrp API headers
_locationsEndpoint_: OpenSrp API location tree endpoint
_restBaseURL_: OpenSRP API base url
_secAuthEndpoint_: OpenSrp API security authenticate endpoint,
_settingsEndpoint_: OpenSrp API settings endpoint,

### Optional props

_debounceTime_: debounce time in milliseconds. expects a value of type number.
_labels_: object with the following keys:
&nbsp;&nbsp; _descriptionLabel_
&nbsp;&nbsp; _editLabel_
&nbsp;&nbsp; _inheritedLable_
&nbsp;&nbsp; _inheritSettingsLabel_
&nbsp;&nbsp; _nameLabel_
&nbsp;&nbsp; _noDataFound_
&nbsp;&nbsp; _pageTitle_
&nbsp;&nbsp; _placeholder_
&nbsp;&nbsp; _settingLabel_
&nbsp;&nbsp; _setToNoLabel_
&nbsp;&nbsp; _setToYesLabel_
All of the `label` keys expect values of type strings .
