const configData = [
    {
        name: 'Birth',
        id: 'Birth',
        daysAfterBirthDue: 0,
        vaccines: [
            {
                name: 'OPV 0',
                type: 'OPV',
                fieldName: 'opv_0',
                openmrsate: {
                    parentEntity: '783AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '783AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 0,
                },
                schedule: {
                    due: [
                        {
                            reference: 'dob',
                            offset: '+0d',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+28d',
                        },
                    ],
                },
            },
            {
                name: 'BCG',
                type: 'BCG',
                fieldName: 'bcg',
                openmrsDate: {
                    parentEntity: '886AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '886AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 1,
                },
                schedule: {
                    due: [
                        {
                            reference: 'dob',
                            offset: '+0d',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
        ],
    },
    {
        name: '6 Weeks',
        id: 'Six_Wks',
        daysAfterBirthDue: 42,
        vaccines: [
            {
                name: 'OPV 1',
                type: 'OPV',
                fieldName: 'opv_1',
                openmrsDate: {
                    parentEntity: '783AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '783AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 1,
                },
                schedule: {
                    due: [
                        {
                            reference: 'dob',
                            offset: '+42d',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
            {
                name: 'Penta 1',
                type: 'Penta',
                fieldName: 'penta_1',
                openmrsDate: {
                    parentEntity: '1685AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '1685AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 1,
                },
                schedule: {
                    due: [
                        {
                            reference: 'dob',
                            offset: '+42d',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
            {
                name: 'PCV 1',
                type: 'PCV',
                fieldName: 'pcv_1',
                openmrsDate: {
                    parentEntity: '162342AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '162342AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 1,
                },
                schedule: {
                    due: [
                        {
                            reference: 'dob',
                            offset: '+42d',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
            {
                name: 'Rota 1',
                type: 'Rota',
                fieldName: 'rota_1',
                openmrsDate: {
                    parentEntity: '159698AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '159698AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 1,
                },
                schedule: {
                    due: [
                        {
                            reference: 'dob',
                            offset: '+42d',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
        ],
    },
    {
        name: '10 Weeks',
        id: 'Ten_Wks',
        daysAfterBirthDue: 70,
        vaccines: [
            {
                name: 'OPV 2',
                type: 'OPV',
                fieldName: 'opv_2',
                openmrsDate: {
                    parentEntity: '783AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '783AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 2,
                },
                schedule: {
                    due: [
                        {
                            reference: 'prerequisite',
                            prerequisite: 'OPV 1',
                            offset: '+28d',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
            {
                name: 'Penta 2',
                type: 'Penta',
                fieldName: 'penta_2',
                openmrsDate: {
                    parentEntity: '1685AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '1685AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 2,
                },
                schedule: {
                    due: [
                        {
                            reference: 'prerequisite',
                            prerequisite: 'Penta 1',
                            offset: '+28d',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
            {
                name: 'PCV 2',
                type: 'PCV',
                fieldName: 'pcv_2',
                openmrsDate: {
                    parentEntity: '162342AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '162342AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 2,
                },
                schedule: {
                    due: [
                        {
                            reference: 'prerequisite',
                            prerequisite: 'PCV 1',
                            offset: '+28d',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
            {
                name: 'Rota 2',
                type: 'Rota',
                fieldName: 'rota_2',
                openmrsDate: {
                    parentEntity: '159698AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '159698AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 2,
                },
                schedule: {
                    due: [
                        {
                            reference: 'prerequisite',
                            prerequisite: 'Rota 1',
                            offset: '+28d',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
        ],
    },
    {
        name: '14 Weeks',
        id: 'Fourteen_Weeks',
        daysAfterBirthDue: 98,
        vaccines: [
            {
                name: 'IPV',
                type: 'IPV',
                fieldName: 'ipv',
                openmrsDate: {
                    parentEntity: '1422AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '1422AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 1,
                },
                schedule: {
                    due: [
                        {
                            reference: 'dob',
                            offset: '+98d',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
            {
                name: 'OPV 3',
                type: 'OPV',
                fieldName: 'opv_3',
                openmrsDate: {
                    parentEntity: '783AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '783AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 3,
                },
                schedule: {
                    due: [
                        {
                            reference: 'prerequisite',
                            prerequisite: 'OPV 2',
                            offset: '+28d',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
            {
                name: 'Penta 3',
                type: 'Penta',
                fieldName: 'penta_3',
                openmrsDate: {
                    parentEntity: '1685AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '1685AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 3,
                },
                schedule: {
                    due: [
                        {
                            reference: 'prerequisite',
                            prerequisite: 'Penta 2',
                            offset: '+28d',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
            {
                name: 'PCV 3',
                type: 'PCV',
                fieldName: 'pcv_3',
                openmrsDate: {
                    parentEntity: '162342AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '162342AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 3,
                },
                schedule: {
                    due: [
                        {
                            reference: 'prerequisite',
                            prerequisite: 'PCV 2',
                            offset: '+28d',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
        ],
    },
    {
        name: '9 Months',
        id: 'Nine_Months',
        daysAfterBirthDue: 274,
        vaccines: [
            {
                name: 'MCV 1',
                type: 'MCV',
                fieldName: 'mcv_1',
                openmrsDate: {
                    parentEntity: '79409AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '79409AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 1,
                },
                schedule: {
                    due: [
                        {
                            reference: 'dob',
                            offset: '+9m',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
            {
                name: 'Yellow Fever',
                type: 'YF',
                fieldName: 'yellow_fever',
                openmrsDate: {
                    parentEntity: '5864AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '5864AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 1,
                },
                schedule: {
                    due: [
                        {
                            reference: 'dob',
                            offset: '+9m',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
        ],
    },
    {
        name: '15 Months',
        id: 'Fifteen_Months',
        daysAfterBirthDue: 456,
        vaccines: [
            {
                name: 'MCV 2',
                type: 'MCV',
                fieldName: 'mcv_2',
                openmrsDate: {
                    parentEntity: '79409AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                },
                openmrsCalculate: {
                    parentEntity: '79409AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    entity: 'concept',
                    entityId: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    calculation: 2,
                },
                schedule: {
                    due: [
                        {
                            reference: 'dob',
                            offset: '+15m',
                            window: '+14d',
                        },
                    ],
                    expiry: [
                        {
                            reference: 'dob',
                            offset: '+2y',
                        },
                    ],
                },
            },
        ],
    },
];

export default configData;
