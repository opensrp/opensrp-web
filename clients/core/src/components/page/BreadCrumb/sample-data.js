const treeData = {
    locations: {
        locationsHierarchy: {
            map: {
                '592608f9-b885-4eed-97ec-b2e77ccb2e4c': {
                    id: '592608f9-b885-4eed-97ec-b2e77ccb2e4c',
                    label: 'Wakanda',
                    node: {
                        locationId: '592608f9-b885-4eed-97ec-b2e77ccb2e4c',
                        name: 'Wakanda',
                        tags: ['Country'],
                        voided: false,
                    },
                    children: {
                        '9c41b940-61a4-485d-a9f3-ab09721a3d27': {
                            id: '9c41b940-61a4-485d-a9f3-ab09721a3d27',
                            label: 'Clinic B',
                            node: {
                                locationId: '9c41b940-61a4-485d-a9f3-ab09721a3d27',
                                name: 'Clinic B',
                                parentLocation: {
                                    locationId: '592608f9-b885-4eed-97ec-b2e77ccb2e4c',
                                    name: 'Wakanda',
                                    voided: false,
                                },
                                tags: ['Clinic'],
                                voided: false,
                            },
                            children: {
                                '2b2f89bc-125c-48b7-9468-638a60fc2c5c': {
                                    id: '2b2f89bc-125c-48b7-9468-638a60fc2c5c',
                                    label: 'CHSS 2',
                                    node: {
                                        locationId: '2b2f89bc-125c-48b7-9468-638a60fc2c5c',
                                        name: 'CHSS 2',
                                        parentLocation: {
                                            locationId: '9c41b940-61a4-485d-a9f3-ab09721a3d27',
                                            name: 'Clinic B',
                                            parentLocation: {
                                                locationId: '592608f9-b885-4eed-97ec-b2e77ccb2e4c',
                                                name: 'Wakanda',
                                                voided: false,
                                            },
                                            voided: false,
                                        },
                                        tags: ['CHSS'],
                                        voided: false,
                                    },
                                    children: {
                                        '72b72b87-23c1-4803-807b-5cc259b6f734': {
                                            id: '72b72b87-23c1-4803-807b-5cc259b6f734',
                                            label: 'CHA4',
                                            node: {
                                                locationId: '72b72b87-23c1-4803-807b-5cc259b6f734',
                                                name: 'CHA4',
                                                parentLocation: {
                                                    locationId: '2b2f89bc-125c-48b7-9468-638a60fc2c5c',
                                                    name: 'CHSS 2',
                                                    parentLocation: {
                                                        locationId: '9c41b940-61a4-485d-a9f3-ab09721a3d27',
                                                        name: 'Clinic B',
                                                        voided: false,
                                                    },
                                                    voided: false,
                                                },
                                                tags: ['CHA'],
                                                voided: false,
                                            },
                                            parent: '2b2f89bc-125c-48b7-9468-638a60fc2c5c',
                                        },
                                        '5jkh3487-23c1-4803-807b-5cc259b6f734': {
                                            id: '5jkh3487-23c1-4803-807b-5cc259b6f734',
                                            label: 'CHA5',
                                            node: {
                                                locationId: '5jkh3487-23c1-4803-807b-5cc259b6f734',
                                                name: 'CHA5',
                                                parentLocation: {
                                                    locationId: '2b2f89bc-125c-48b7-9468-638a60fc2c5c',
                                                    name: 'CHSS 2',
                                                    parentLocation: {
                                                        locationId: '9c41b940-61a4-485d-a9f3-ab09721a3d27',
                                                        name: 'Clinic B',
                                                        voided: false,
                                                    },
                                                    voided: false,
                                                },
                                                tags: ['CHA'],
                                                voided: false,
                                            },
                                            parent: '2b2f89bc-125c-48b7-9468-638a60fc2c5c',
                                        },
                                    },
                                    parent: '9c41b940-61a4-485d-a9f3-ab09721a3d27',
                                },
                            },
                            parent: '592608f9-b885-4eed-97ec-b2e77ccb2e4c',
                        },
                    },
                },
            },
            parentChildren: {
                '592608f9-b885-4eed-97ec-b2e77ccb2e4c': ['9c41b940-61a4-485d-a9f3-ab09721a3d27'],
                '2b2f89bc-125c-48b7-9468-638a60fc2c5c': ['72b72b87-23c1-4803-807b-5cc259b6f734'],
                '9c41b940-61a4-485d-a9f3-ab09721a3d27': ['2b2f89bc-125c-48b7-9468-638a60fc2c5c'],
            },
        },
    },
    team: {
        identifier: '34567898765432',
        display: 'asim sarke',
        patients: [],
        resourceVersion: '1.8',
        team: {
            teamName: 'newTeam',
            display: 'newTeam',
            supervisorTeamUuid: '',
            resourceVersion: '1.8',
            uuid: '4fb88f3e-e0e6-47d8-b813-f6c64b702af0',
            auditInfo: {
                creator: {
                    display: 'admin',
                    links: [
                        {
                            rel: 'self',
                            uri:
                                'http://192.168.19.65:8080/openmrs/ws/rest/v1/user/25d13252-ee54-11e9-b4f1-000c2993f8ea',
                        },
                    ],
                    uuid: '25d13252-ee54-11e9-b4f1-000c2993f8ea',
                },
                dateCreated: '2019-11-18T14:46:26.000+0600',
            },
            supervisorTeam: '',
            supervisorUuid: '',
            members: 3,
            voided: false,
            location: {
                parentLocation: {
                    parentLocation: {
                        display: 'Clinic B',
                        links: [
                            {
                                rel: 'self',
                                uri:
                                    'http://192.168.19.65:8080/openmrs/ws/rest/v1/location/9c41b940-61a4-485d-a9f3-ab09721a3d27',
                            },
                        ],
                        uuid: '9c41b940-61a4-485d-a9f3-ab09721a3d27',
                    },
                    uuid: '2b2f89bc-125c-48b7-9468-638a60fc2c5c',
                    retired: false,
                    links: [
                        {
                            rel: 'self',
                            uri:
                                'http://192.168.19.65:8080/openmrs/ws/rest/v1/location/2b2f89bc-125c-48b7-9468-638a60fc2c5c',
                        },
                        {
                            rel: 'full',
                            uri:
                                'http://192.168.19.65:8080/openmrs/ws/rest/v1/location/2b2f89bc-125c-48b7-9468-638a60fc2c5c?v=full',
                        },
                    ],
                    display: 'CHSS 2',
                    resourceVersion: '2.0',
                    tags: [
                        {
                            display: 'CHSS',
                            links: [
                                {
                                    rel: 'self',
                                    uri:
                                        'http://192.168.19.65:8080/openmrs/ws/rest/v1/locationtag/f6e9811d-572d-4d0a-8864-8e287389f619',
                                },
                            ],
                            uuid: 'f6e9811d-572d-4d0a-8864-8e287389f619',
                        },
                    ],
                    name: 'CHSS 2',
                    attributes: [],
                    childLocations: [
                        {
                            display: 'CHA2',
                            links: [
                                {
                                    rel: 'self',
                                    uri:
                                        'http://192.168.19.65:8080/openmrs/ws/rest/v1/location/31e071e3-9261-42df-b3b6-caf9a316784a',
                                },
                            ],
                            uuid: '31e071e3-9261-42df-b3b6-caf9a316784a',
                        },
                        {
                            display: 'CHA3',
                            links: [
                                {
                                    rel: 'self',
                                    uri:
                                        'http://192.168.19.65:8080/openmrs/ws/rest/v1/location/e3170b23-bb22-42a4-875d-35c7f32c28ae',
                                },
                            ],
                            uuid: 'e3170b23-bb22-42a4-875d-35c7f32c28ae',
                        },
                        {
                            display: 'CHA4',
                            links: [
                                {
                                    rel: 'self',
                                    uri:
                                        'http://192.168.19.65:8080/openmrs/ws/rest/v1/location/72b72b87-23c1-4803-807b-5cc259b6f734',
                                },
                            ],
                            uuid: '72b72b87-23c1-4803-807b-5cc259b6f734',
                        },
                    ],
                },
                uuid: '72b72b87-23c1-4803-807b-5cc259b6f734',
                auditInfo: {
                    creator: {
                        display: 'admin',
                        links: [
                            {
                                rel: 'self',
                                uri:
                                    'http://192.168.19.65:8080/openmrs/ws/rest/v1/user/25d13252-ee54-11e9-b4f1-000c2993f8ea',
                            },
                        ],
                        uuid: '25d13252-ee54-11e9-b4f1-000c2993f8ea',
                    },
                    dateCreated: '2019-11-14T17:51:04.000+0600',
                },
                retired: false,
                links: [
                    {
                        rel: 'self',
                        uri:
                            'http://192.168.19.65:8080/openmrs/ws/rest/v1/location/72b72b87-23c1-4803-807b-5cc259b6f734',
                    },
                ],
                display: 'CHA4',
                resourceVersion: '2.0',
                tags: [
                    {
                        display: 'CHA',
                        resourceVersion: '1.8',
                        name: 'CHA',
                        retired: false,
                        links: [
                            {
                                rel: 'self',
                                uri:
                                    'http://192.168.19.65:8080/openmrs/ws/rest/v1/locationtag/b50bc785-67a6-4aeb-bf7d-b945c9c728ef',
                            },
                            {
                                rel: 'full',
                                uri:
                                    'http://192.168.19.65:8080/openmrs/ws/rest/v1/locationtag/b50bc785-67a6-4aeb-bf7d-b945c9c728ef?v=full',
                            },
                        ],
                        uuid: 'b50bc785-67a6-4aeb-bf7d-b945c9c728ef',
                    },
                ],
                name: 'CHA4',
                attributes: [],
                childLocations: [],
            },
            links: [
                {
                    rel: 'self',
                    uri: 'http://192.168.19.65:8080/openmrs/ws/rest/v1/team/team/4fb88f3e-e0e6-47d8-b813-f6c64b702af0',
                },
            ],
            supervisorIdentifier: '',
            teamIdentifier: 'dfrtt',
            supervisor: '',
        },
        uuid: '03133f8d-4fdb-47dd-b354-096244a0343f',
        subTeamRoles: [],
        auditInfo: {
            creator: {
                display: 'admin',
                links: [
                    {
                        rel: 'self',
                        uri: 'http://192.168.19.65:8080/openmrs/ws/rest/v1/user/25d13252-ee54-11e9-b4f1-000c2993f8ea',
                    },
                ],
                uuid: '25d13252-ee54-11e9-b4f1-000c2993f8ea',
            },
            dateCreated: '2019-11-18T14:47:29.000+0600',
        },
        person: {
            addresses: [],
            gender: 'M',
            display: 'asim sarke',
            resourceVersion: '1.11',
            dead: false,
            uuid: '5ecc80b2-52c3-4829-b119-fec533c38d37',
            auditInfo: {
                creator: {
                    display: 'admin',
                    links: [
                        {
                            rel: 'self',
                            uri:
                                'http://192.168.19.65:8080/openmrs/ws/rest/v1/user/25d13252-ee54-11e9-b4f1-000c2993f8ea',
                        },
                    ],
                    uuid: '25d13252-ee54-11e9-b4f1-000c2993f8ea',
                },
                dateCreated: '2019-11-18T14:46:53.000+0600',
            },
            birthdateEstimated: false,
            deathdateEstimated: false,
            names: [
                {
                    display: 'asim sarke',
                    givenName: 'asim',
                    familyName: 'sarke',
                    resourceVersion: '1.8',
                    voided: false,
                    links: [
                        {
                            rel: 'self',
                            uri:
                                'http://192.168.19.65:8080/openmrs/ws/rest/v1/person/5ecc80b2-52c3-4829-b119-fec533c38d37/name/c4252d2f-99ac-4a70-861c-69a5a738c96b',
                        },
                        {
                            rel: 'full',
                            uri:
                                'http://192.168.19.65:8080/openmrs/ws/rest/v1/person/5ecc80b2-52c3-4829-b119-fec533c38d37/name/c4252d2f-99ac-4a70-861c-69a5a738c96b?v=full',
                        },
                    ],
                    uuid: 'c4252d2f-99ac-4a70-861c-69a5a738c96b',
                },
            ],
            attributes: [],
            voided: false,
            links: [
                {
                    rel: 'self',
                    uri: 'http://192.168.19.65:8080/openmrs/ws/rest/v1/person/5ecc80b2-52c3-4829-b119-fec533c38d37',
                },
            ],
            preferredName: {
                display: 'asim sarke',
                givenName: 'asim',
                familyName: 'sarke',
                resourceVersion: '1.8',
                voided: false,
                links: [
                    {
                        rel: 'self',
                        uri:
                            'http://192.168.19.65:8080/openmrs/ws/rest/v1/person/5ecc80b2-52c3-4829-b119-fec533c38d37/name/c4252d2f-99ac-4a70-861c-69a5a738c96b',
                    },
                    {
                        rel: 'full',
                        uri:
                            'http://192.168.19.65:8080/openmrs/ws/rest/v1/person/5ecc80b2-52c3-4829-b119-fec533c38d37/name/c4252d2f-99ac-4a70-861c-69a5a738c96b?v=full',
                    },
                ],
                uuid: 'c4252d2f-99ac-4a70-861c-69a5a738c96b',
            },
        },
        voided: false,
        isDataProvider: false,
        locations: [
            {
                parentLocation: {
                    parentLocation: {
                        display: 'Clinic B',
                        links: [
                            {
                                rel: 'self',
                                uri:
                                    'http://192.168.19.65:8080/openmrs/ws/rest/v1/location/9c41b940-61a4-485d-a9f3-ab09721a3d27',
                            },
                        ],
                        uuid: '9c41b940-61a4-485d-a9f3-ab09721a3d27',
                    },
                    uuid: '2b2f89bc-125c-48b7-9468-638a60fc2c5c',
                    retired: false,
                    links: [
                        {
                            rel: 'self',
                            uri:
                                'http://192.168.19.65:8080/openmrs/ws/rest/v1/location/2b2f89bc-125c-48b7-9468-638a60fc2c5c',
                        },
                        {
                            rel: 'full',
                            uri:
                                'http://192.168.19.65:8080/openmrs/ws/rest/v1/location/2b2f89bc-125c-48b7-9468-638a60fc2c5c?v=full',
                        },
                    ],
                    display: 'CHSS 2',
                    resourceVersion: '2.0',
                    tags: [
                        {
                            display: 'CHSS',
                            links: [
                                {
                                    rel: 'self',
                                    uri:
                                        'http://192.168.19.65:8080/openmrs/ws/rest/v1/locationtag/f6e9811d-572d-4d0a-8864-8e287389f619',
                                },
                            ],
                            uuid: 'f6e9811d-572d-4d0a-8864-8e287389f619',
                        },
                    ],
                    name: 'CHSS 2',
                    attributes: [],
                    childLocations: [
                        {
                            display: 'CHA2',
                            links: [
                                {
                                    rel: 'self',
                                    uri:
                                        'http://192.168.19.65:8080/openmrs/ws/rest/v1/location/31e071e3-9261-42df-b3b6-caf9a316784a',
                                },
                            ],
                            uuid: '31e071e3-9261-42df-b3b6-caf9a316784a',
                        },
                        {
                            display: 'CHA3',
                            links: [
                                {
                                    rel: 'self',
                                    uri:
                                        'http://192.168.19.65:8080/openmrs/ws/rest/v1/location/e3170b23-bb22-42a4-875d-35c7f32c28ae',
                                },
                            ],
                            uuid: 'e3170b23-bb22-42a4-875d-35c7f32c28ae',
                        },
                        {
                            display: 'CHA4',
                            links: [
                                {
                                    rel: 'self',
                                    uri:
                                        'http://192.168.19.65:8080/openmrs/ws/rest/v1/location/72b72b87-23c1-4803-807b-5cc259b6f734',
                                },
                            ],
                            uuid: '72b72b87-23c1-4803-807b-5cc259b6f734',
                        },
                    ],
                },
                uuid: '72b72b87-23c1-4803-807b-5cc259b6f734',
                auditInfo: {
                    creator: {
                        display: 'admin',
                        links: [
                            {
                                rel: 'self',
                                uri:
                                    'http://192.168.19.65:8080/openmrs/ws/rest/v1/user/25d13252-ee54-11e9-b4f1-000c2993f8ea',
                            },
                        ],
                        uuid: '25d13252-ee54-11e9-b4f1-000c2993f8ea',
                    },
                    dateCreated: '2019-11-14T17:51:04.000+0600',
                },
                retired: false,
                links: [
                    {
                        rel: 'self',
                        uri:
                            'http://192.168.19.65:8080/openmrs/ws/rest/v1/location/72b72b87-23c1-4803-807b-5cc259b6f734',
                    },
                ],
                display: 'CHA4',
                resourceVersion: '2.0',
                tags: [
                    {
                        display: 'CHA',
                        resourceVersion: '1.8',
                        name: 'CHA',
                        retired: false,
                        links: [
                            {
                                rel: 'self',
                                uri:
                                    'http://192.168.19.65:8080/openmrs/ws/rest/v1/locationtag/b50bc785-67a6-4aeb-bf7d-b945c9c728ef',
                            },
                            {
                                rel: 'full',
                                uri:
                                    'http://192.168.19.65:8080/openmrs/ws/rest/v1/locationtag/b50bc785-67a6-4aeb-bf7d-b945c9c728ef?v=full',
                            },
                        ],
                        uuid: 'b50bc785-67a6-4aeb-bf7d-b945c9c728ef',
                    },
                ],
                name: 'CHA4',
                attributes: [],
                childLocations: [],
            },
        ],
        links: [
            {
                rel: 'self',
                uri:
                    'http://192.168.19.65:8080/openmrs/ws/rest/v1/team/teammember/03133f8d-4fdb-47dd-b354-096244a0343f',
            },
        ],
        subTeams: [],
    },
    time: {
        time: '2020-06-18 14:08:35',
        timeZone: 'Asia/Dhaka',
    },
    user: {
        username: 'asim',
        status: 'asim sarke',
        roles: ['System Developer', 'Provider'],
        preferredName: 'asim sarke',
        baseEntityId: '48766f74-7c04-4671-aab9-a54cc8285577',
        attributes: {
            _PERSON_UUID: '5ecc80b2-52c3-4829-b119-fec533c38d37',
        },
        voided: false,
    },
};
export default treeData;
