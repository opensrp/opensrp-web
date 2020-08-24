/*eslint @typescript-eslint/camelcase: ["error", {properties: "never"}]*/
export const setting1 = {
    key: 'pop_undernourish',
    value: 'false',
    label: 'Undernourished prevalence 20% or higher',
    description:
        'The proportion of women in the adult population (18 years or older), with a BMI less than 18.5, is 20% or higher.',
    inheritedFrom: '',
    uuid: '96475904-0b13-4a31-a59b-807b7b445897',
    settingsId: '2',
    settingIdentifier: 'population_characteristics',
    settingMetadataId: '5',
    locationId: '02ebbc84-5e29-4cd5-9b79-c594058923e9',
    v1Settings: false,
    resolveSettings: false,
    documentId: 'e79b139c-3a20-4656-b684-d2d9ed83c94e',
    serverVersion: 1590644327306,
    type: 'Setting',
};

export const setting2 = {
    key: 'pop_anaemia_40',
    value: true,
    label: 'Anaemia prevalence 40% or higher',
    description:
        'The proportion of pregnant women in the population with anaemia (haemoglobin level less than 11 g/dl) is 40% or higher.',
    inheritedFrom: '',
    uuid: '90e45492-1eeb-49a9-a510-0f53f563f044',
    settingsId: '2',
    settingIdentifier: 'population_characteristics',
    settingMetadataId: '6',
    locationId: '02ebbc84-5e29-4cd5-9b79-c594058923e9',
    v1Settings: false,
    resolveSettings: false,
    documentId: 'e79b139c-3a20-4656-b684-d2d9ed83c94e',
    serverVersion: 1590644327306,
    type: 'Setting',
};
export const setting3 = {
    key: 'pop_helminth',
    value: 'false', // False
    label: 'Soil-transmitted helminth infection prevalence 20% or higher',
    description:
        'The percentage of individuals in the general population infected with at least one species of soil-transmitted helminth is 20% or higher.',
    inheritedFrom: '02ebbc84-5e29-4cd5-9b79-c594058923e9', // Inherit from
    uuid: '9a1e2d64-6a13-4d3b-be88-052e1e6c1fa7',
    settingsId: '21',
    settingIdentifier: 'population_characteristics',
    settingMetadataId: '1279',
    teamId: '6c8d2b9b-2246-47c2-949b-4fe29e888cc8',
    team: 'Bukesa',
    providerId: 'demo',
    locationId: '02ebbc84-5e29-4cd5-9b79-c594058923e9',
    v1Settings: false,
    resolveSettings: false,
    documentId: '3264c866-078e-4112-8894-052d53ab0a97',
    serverVersion: 1595886234688,
    type: 'Setting',
    editing: false,
};

export const setting4 = {
    key: 'pop_helminth',
    value: 'false', // False
    label: 'Soil-transmitted helminth infection prevalence 20% or higher',
    description:
        'The percentage of individuals in the general population infected with at least one species of soil-transmitted helminth is 20% or higher.',
    inheritedFrom: '02ebbc84-5e29-4cd5-9b79-c594058923e9', // Inherit from
    uuid: '9a1e2d64-6a13-4d3b-be88-052e1e6c1fa7',
    settingsId: '21',
    settingIdentifier: 'population_characteristics',
    settingMetadataId: '1279',
    teamId: '6c8d2b9b-2246-47c2-949b-4fe29e888cc8',
    team: 'Bukesa',
    providerId: 'demo',
    locationId: '02ebbc84-5e29-4cd5-9b79-c594058923e9',
    v1Settings: false,
    resolveSettings: false,
    documentId: '3264c866-078e-4112-8894-052d53ab0a97',
    serverVersion: 1595886234688,
    type: 'Setting',
    editing: true, // Editing true
};
export const allSettings = [setting1, setting2];
