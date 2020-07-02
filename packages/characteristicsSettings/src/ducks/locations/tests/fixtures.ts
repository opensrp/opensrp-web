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

export const locs = {
    locationsHierarchy: {
        map: {
            '02ebbc84-5e29-4cd5-9b79-c594058923e9': {
                id: '02ebbc84-5e29-4cd5-9b79-c594058923e9',
                label: 'Uganda',
                node: {
                    locationId: '02ebbc84-5e29-4cd5-9b79-c594058923e9',
                    name: 'Uganda',
                    tags: ['Country'],
                    voided: false,
                },
                children: {
                    '8340315f-48e4-4768-a1ce-414532b4c49b': {
                        id: '8340315f-48e4-4768-a1ce-414532b4c49b',
                        label: 'Kampala',
                        node: {
                            locationId: '8340315f-48e4-4768-a1ce-414532b4c49b',
                            name: 'Kampala',
                            parentLocation: {
                                locationId: '02ebbc84-5e29-4cd5-9b79-c594058923e9',
                                name: 'Uganda',
                                voided: false,
                            },
                            tags: ['District'],
                            voided: false,
                        },
                        children: {
                            'b1ef8a0b-275b-43fc-a580-1e21ceb34c78': {
                                id: 'b1ef8a0b-275b-43fc-a580-1e21ceb34c78',
                                label: 'KCCA',
                                node: {
                                    locationId: 'b1ef8a0b-275b-43fc-a580-1e21ceb34c78',
                                    name: 'KCCA',
                                    parentLocation: {
                                        locationId: '8340315f-48e4-4768-a1ce-414532b4c49b',
                                        name: 'Kampala',
                                        parentLocation: {
                                            locationId: '02ebbc84-5e29-4cd5-9b79-c594058923e9',
                                            name: 'Uganda',
                                            voided: false,
                                        },
                                        voided: false,
                                    },
                                    tags: ['County'],
                                    voided: false,
                                },
                                children: {
                                    '4e188e6d-2ffb-4b25-85f9-b9fbf5010d40': {
                                        id: '4e188e6d-2ffb-4b25-85f9-b9fbf5010d40',
                                        label: 'Central Division',
                                        node: {
                                            locationId: '4e188e6d-2ffb-4b25-85f9-b9fbf5010d40',
                                            name: 'Central Division',
                                            parentLocation: {
                                                locationId: 'b1ef8a0b-275b-43fc-a580-1e21ceb34c78',
                                                name: 'KCCA',
                                                parentLocation: {
                                                    locationId: '8340315f-48e4-4768-a1ce-414532b4c49b',
                                                    name: 'Kampala',
                                                    voided: false,
                                                },
                                                voided: false,
                                            },
                                            tags: ['Sub-county'],
                                            voided: false,
                                        },
                                        children: {
                                            '4581c087-2efa-46fe-8ee6-581722536e2b': {
                                                id: '4581c087-2efa-46fe-8ee6-581722536e2b',
                                                label: 'Kagugube Urban Health Centre',
                                                node: {
                                                    locationId: '4581c087-2efa-46fe-8ee6-581722536e2b',
                                                    name: 'Kagugube Urban Health Centre',
                                                    parentLocation: {
                                                        locationId: '4e188e6d-2ffb-4b25-85f9-b9fbf5010d40',
                                                        name: 'Central Division',
                                                        parentLocation: {
                                                            locationId: 'b1ef8a0b-275b-43fc-a580-1e21ceb34c78',
                                                            name: 'KCCA',
                                                            voided: false,
                                                        },
                                                        voided: false,
                                                    },
                                                    tags: ['Health Facility'],
                                                    voided: false,
                                                },
                                                children: {
                                                    '32e6fa74-20c8-4931-9900-6bc1b92ff848': {
                                                        id: '32e6fa74-20c8-4931-9900-6bc1b92ff848',
                                                        label: 'LDC Secondary School',
                                                        node: {
                                                            locationId: '32e6fa74-20c8-4931-9900-6bc1b92ff848',
                                                            name: 'LDC Secondary School',
                                                            parentLocation: {
                                                                locationId: '4581c087-2efa-46fe-8ee6-581722536e2b',
                                                                name: 'Kagugube Urban Health Centre',
                                                                parentLocation: {
                                                                    locationId: '4e188e6d-2ffb-4b25-85f9-b9fbf5010d40',
                                                                    name: 'Central Division',
                                                                    voided: false,
                                                                },
                                                                voided: false,
                                                            },
                                                            tags: ['School'],
                                                            voided: false,
                                                        },
                                                        parent: '4581c087-2efa-46fe-8ee6-581722536e2b',
                                                    },
                                                    'f6554922-629f-46bb-96a9-de61d85d495c': {
                                                        id: 'f6554922-629f-46bb-96a9-de61d85d495c',
                                                        label: 'Church Secondary School',
                                                        node: {
                                                            locationId: 'f6554922-629f-46bb-96a9-de61d85d495c',
                                                            name: 'Church Secondary School',
                                                            parentLocation: {
                                                                locationId: '4581c087-2efa-46fe-8ee6-581722536e2b',
                                                                name: 'Kagugube Urban Health Centre',
                                                                parentLocation: {
                                                                    locationId: '4e188e6d-2ffb-4b25-85f9-b9fbf5010d40',
                                                                    name: 'Central Division',
                                                                    voided: false,
                                                                },
                                                                voided: false,
                                                            },
                                                            tags: ['School'],
                                                            voided: false,
                                                        },
                                                        parent: '4581c087-2efa-46fe-8ee6-581722536e2b',
                                                    },
                                                },
                                                parent: '4e188e6d-2ffb-4b25-85f9-b9fbf5010d40',
                                            },
                                            '44de66fb-e6c6-4bae-92bb-386dfe626eba': {
                                                id: '44de66fb-e6c6-4bae-92bb-386dfe626eba',
                                                label: 'Bukesa Urban Health Centre',
                                                node: {
                                                    locationId: '44de66fb-e6c6-4bae-92bb-386dfe626eba',
                                                    name: 'Bukesa Urban Health Centre',
                                                    parentLocation: {
                                                        locationId: '4e188e6d-2ffb-4b25-85f9-b9fbf5010d40',
                                                        name: 'Central Division',
                                                        parentLocation: {
                                                            locationId: 'b1ef8a0b-275b-43fc-a580-1e21ceb34c78',
                                                            name: 'KCCA',
                                                            voided: false,
                                                        },
                                                        voided: false,
                                                    },
                                                    tags: ['Health Facility'],
                                                    voided: false,
                                                },
                                                children: {
                                                    '982eb3f3-b7e3-450f-a38e-d067f2345212': {
                                                        id: '982eb3f3-b7e3-450f-a38e-d067f2345212',
                                                        label: 'Jambula Girls School',
                                                        node: {
                                                            locationId: '982eb3f3-b7e3-450f-a38e-d067f2345212',
                                                            name: 'Jambula Girls School',
                                                            parentLocation: {
                                                                locationId: '44de66fb-e6c6-4bae-92bb-386dfe626eba',
                                                                name: 'Bukesa Urban Health Centre',
                                                                parentLocation: {
                                                                    locationId: '4e188e6d-2ffb-4b25-85f9-b9fbf5010d40',
                                                                    name: 'Central Division',
                                                                    voided: false,
                                                                },
                                                                voided: false,
                                                            },
                                                            tags: ['School'],
                                                            voided: false,
                                                        },
                                                        parent: '44de66fb-e6c6-4bae-92bb-386dfe626eba',
                                                    },
                                                    'ee08a6e0-3f73-4c28-b186-64d5cd06f4ce': {
                                                        id: 'ee08a6e0-3f73-4c28-b186-64d5cd06f4ce',
                                                        label: 'Nsalo Secondary School',
                                                        node: {
                                                            locationId: 'ee08a6e0-3f73-4c28-b186-64d5cd06f4ce',
                                                            name: 'Nsalo Secondary School',
                                                            parentLocation: {
                                                                locationId: '44de66fb-e6c6-4bae-92bb-386dfe626eba',
                                                                name: 'Bukesa Urban Health Centre',
                                                                parentLocation: {
                                                                    locationId: '4e188e6d-2ffb-4b25-85f9-b9fbf5010d40',
                                                                    name: 'Central Division',
                                                                    voided: false,
                                                                },
                                                                voided: false,
                                                            },
                                                            tags: ['School'],
                                                            voided: false,
                                                        },
                                                        parent: '44de66fb-e6c6-4bae-92bb-386dfe626eba',
                                                    },
                                                },
                                                parent: '4e188e6d-2ffb-4b25-85f9-b9fbf5010d40',
                                            },
                                        },
                                        parent: 'b1ef8a0b-275b-43fc-a580-1e21ceb34c78',
                                    },
                                },
                                parent: '8340315f-48e4-4768-a1ce-414532b4c49b',
                            },
                        },
                        parent: '02ebbc84-5e29-4cd5-9b79-c594058923e9',
                    },
                },
            },
        },
        parentChildren: {
            '8340315f-48e4-4768-a1ce-414532b4c49b': ['b1ef8a0b-275b-43fc-a580-1e21ceb34c78'],
            '02ebbc84-5e29-4cd5-9b79-c594058923e9': ['8340315f-48e4-4768-a1ce-414532b4c49b'],
            'b1ef8a0b-275b-43fc-a580-1e21ceb34c78': ['4e188e6d-2ffb-4b25-85f9-b9fbf5010d40'],
            '4581c087-2efa-46fe-8ee6-581722536e2b': [
                '32e6fa74-20c8-4931-9900-6bc1b92ff848',
                'f6554922-629f-46bb-96a9-de61d85d495c',
            ],
            '4e188e6d-2ffb-4b25-85f9-b9fbf5010d40': [
                '4581c087-2efa-46fe-8ee6-581722536e2b',
                '44de66fb-e6c6-4bae-92bb-386dfe626eba',
            ],
            '44de66fb-e6c6-4bae-92bb-386dfe626eba': [
                '982eb3f3-b7e3-450f-a38e-d067f2345212',
                'ee08a6e0-3f73-4c28-b186-64d5cd06f4ce',
            ],
        },
    },
};
