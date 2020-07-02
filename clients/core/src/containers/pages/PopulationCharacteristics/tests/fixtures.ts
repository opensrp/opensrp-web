/* eslint-disable @typescript-eslint/camelcase */
export const settings = [
    {
        key: 'pop_undernourish',
        value: false,
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
    },
    {
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
    },
];

export const locHierarchy = {
    locationsHierarchy: {
        map: {
            '75af7700-a6f2-448c-a17d-816261a7749a': {
                id: '75af7700-a6f2-448c-a17d-816261a7749a',
                label: 'ME',
                node: {
                    locationId: '75af7700-a6f2-448c-a17d-816261a7749a',
                    name: 'ME',
                    tags: ['Country'],
                    voided: false,
                },
                children: {
                    '8400d475-3187-46e4-8980-7c6f0a243495': {
                        id: '8400d475-3187-46e4-8980-7c6f0a243495',
                        label: 'Lobi',
                        node: {
                            locationId: '8400d475-3187-46e4-8980-7c6f0a243495',
                            name: 'Lobi',
                            parentLocation: {
                                locationId: '75af7700-a6f2-448c-a17d-816261a7749a',
                                name: 'ME',
                                voided: false,
                            },
                            voided: false,
                        },
                        children: {
                            'f4d22dad-f211-4476-bdf0-09fb20f7f64f': {
                                id: 'f4d22dad-f211-4476-bdf0-09fb20f7f64f',
                                label: 'Outreach',
                                node: {
                                    locationId: 'f4d22dad-f211-4476-bdf0-09fb20f7f64f',
                                    name: 'Outreach',
                                    parentLocation: {
                                        locationId: '8400d475-3187-46e4-8980-7c6f0a243495',
                                        name: 'Lobi',
                                        parentLocation: {
                                            locationId: '75af7700-a6f2-448c-a17d-816261a7749a',
                                            name: 'ME',
                                            voided: false,
                                        },
                                        voided: false,
                                    },
                                    voided: false,
                                },
                                parent: '8400d475-3187-46e4-8980-7c6f0a243495',
                            },
                        },
                        parent: '75af7700-a6f2-448c-a17d-816261a7749a',
                    },
                },
            },
        },
        parentChildren: {
            '75af7700-a6f2-448c-a17d-816261a7749a': ['8400d475-3187-46e4-8980-7c6f0a243495'],
            '8400d475-3187-46e4-8980-7c6f0a243495': ['f4d22dad-f211-4476-bdf0-09fb20f7f64f'],
        },
    },
};
