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
