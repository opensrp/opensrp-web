# Form Config

## Introduction

These are bunch of components that support creation and manuplation of [OpenSRP](https://smartregister.atlassian.net/wiki/spaces/Documentation/pages/1507000340/OpenSRP+Document+Configurability) configuration files.

These files include:

1. JSON widget validator - JSON file that holds a list of fields that cannot be removed in a certain JSON form.
2. Manifest - A combination of properties that help bundle up all the files uploaded.

## Instalation

```node
yarn add @opensrp/form-config
```

## Code Sample

### Form upload and Edit

```typescript
import ConnectedUploadConfigFile from '@opensrp/form-config'

const UploadConfigFilePage = () => {

    const uploadConfigFileProps = {
        baseURL: <OpenSRP API base url>,
        draftFilesUrl: <draft files url>, // redirects here when form is upoaded
        endpoint: <OpenSRP API file upload endpoint>,
        formId: <form identifier>, // provided when editing else pass null
        getPayload: <function for generating OpenSrp API headers>,
        LoadingComponent: <loading component>, // optional
    };
    return <ConnectedUploadConfigFile {...uploadConfigFileProps} />
};
```

### List manifest releases

```typescript
import ConnectedManifestReleases from '@opensrp/form-config'

const ManifestReleasesPage = () => {

    const manifestReleasesPropsProps = {
        baseURL: <OpenSRP API base url>,
        currentUrl: <current web url>,
        endpoint: <OpenSRP API manifest endpoint>,
        formUploadUrl: <form upload web url>
        getPayload: <function for generating OpenSrp API headers>,
        LoadingComponent: <loading component>, // optional
    };
    return <ConnectedManifestReleases {...manifestReleasesPropsProps} />
};
```

### JSON validators and config files

```typescript
import ConnectedManifestFilesList from '@opensrp/form-config'

const ManifestReleasesPage = () => {

    const manifestFilesListProps = {
        baseURL: <OpenSRP API base url>,
        endpoint: <OpenSRP API forms endpoint>,
        fileUploadUrl: <form upload web url>
        formVersion: <form version for configs to be displayed> // null for JSON validator
        getPayload: <function for generating OpenSrp API headers>,
        isJsonValidator: <true for JSON validator page>
        LoadingComponent: <loading component>, // optional
    };
    return <ConnectedManifestFilesList {...manifestFilesListProps} />
};
```

### Draft files

```typescript
import ManifestDraftFiles from '@opensrp/form-config'

const ManifestReleasesPage = () => {

    const draftFiles = {
        baseURL: <OpenSRP API base url>,
        endpoint: <OpenSRP API forms endpoint>,
        fileUploadUrl: <form upload web url>
        getPayload: <function for generating OpenSrp API headers>,
        LoadingComponent: <loading component>, // optional
        releasesUrl: <manifest release web url>
    };
    return <ManifestDraftFiles {...draftFiles} />
};
```
