import { Client } from '../../ducks/clients';
import { Household } from '../../ducks/households';
import { ANCClientType as ANC } from '../anc';
import { Event } from '../events';
import { Child } from '../child';
import { Team } from '../teams';
import { TeamMember } from '../teamMembers';
import { Location } from '../adminLocation';
import { LocationTag } from '../locationTag';
import { RegisterPanelData } from '../../../components/page/RegisterPanel';
/* eslint-disable @typescript-eslint/camelcase */

export const client1: Client = {
    type: 'Client',
    dateCreated: 1557670951023,
    serverVersion: 1557670950986,
    clientApplicationVersion: 2,
    clientDatabaseVersion: 2,
    baseEntityId: '71ad460c-bf76-414e-9be1-0d1b2cb1bce8',
    identifiers: {
        opensrp_id: '11096120_family',
    },
    addresses: [
        {
            preferred: null,
            addressType: '',
            startDate: null,
            endDate: null,
            addressFields: null,
            latitude: null,
            longitude: null,
            geopoint: null,
            postalCode: null,
            subTown: null,
            town: null,
            subDistrict: null,
            countyDistrict: null,
            cityVillage: 'Tha Luang',
            stateProvince: null,
            country: null,
        },
    ],
    attributes: {
        residence: 'da765947-5e4d-49f7-9eb8-2d2d00681f65',
    },
    firstName: 'Khumpai',
    lastName: 'Family',
    birthdate: 7200000,
    birthdateApprox: false,
    deathdateApprox: false,
    gender: 'Male',
    relationships: {
        family_head: ['7d97182f-d623-4553-8651-5a29d2fe3f0b'],
        primary_caregiver: ['7d97182f-d623-4553-8651-5a29d2fe3f0b'],
    },
    _id: '9b67a82d-dac7-40c0-85aa-e5976339a6b6',
    _rev: 'v1',
};

export const client2: Client = {
    type: 'Client',
    dateCreated: 1557670951165,
    serverVersion: 1557670950999,
    clientApplicationVersion: 2,
    clientDatabaseVersion: 2,
    baseEntityId: '7d97182f-d623-4553-8651-5a29d2fe3f0b',
    identifiers: {
        opensrp_id: '11096120',
    },
    addresses: [],
    attributes: {
        residence: 'da765947-5e4d-49f7-9eb8-2d2d00681f65',
    },
    firstName: 'Pramoj',
    middleName: '',
    lastName: 'Khumpai',
    birthdate: 594777600000,
    birthdateApprox: false,
    deathdateApprox: false,
    relationships: {
        family: ['71ad460c-bf76-414e-9be1-0d1b2cb1bce8'],
    },
    _id: 'a30116d5-0612-419e-9b93-00c87df4ffbb',
    _rev: 'v1',
};

export const client3: Client = {
    type: 'Client',
    dateCreated: 1557672169407,
    serverVersion: 1557672169404,
    clientApplicationVersion: 2,
    clientDatabaseVersion: 2,
    baseEntityId: 'e540ac0e-d913-4898-846a-d3ee31863182',
    identifiers: {
        opensrp_id: '11099629_family',
    },
    addresses: [
        {
            preferred: null,
            addressType: '',
            startDate: null,
            endDate: null,
            addressFields: null,
            latitude: null,
            longitude: null,
            geopoint: null,
            postalCode: null,
            subTown: null,
            town: null,
            subDistrict: null,
            countyDistrict: null,
            cityVillage: 'Tha Luang',
            stateProvince: null,
            country: null,
        },
    ],
    attributes: {
        residence: 'bd73f7d7-4387-4b6b-b632-acb03c4ea160',
    },
    firstName: 'Sepsook',
    lastName: 'Family',
    birthdate: 7200000,
    birthdateApprox: false,
    deathdateApprox: false,
    gender: 'Male',
    relationships: {
        family_head: ['aaaca36a-a913-466b-9dd7-0c68db0f7c6f'],
        primary_caregiver: ['aaaca36a-a913-466b-9dd7-0c68db0f7c6f'],
    },
    _id: 'b23307c2-cbbb-481f-9cd7-f218564cc4bc',
    _rev: 'v1',
};
export const client4: Client = {
    type: 'Client',
    // tslint:disable-next-line: object-literal-sort-keys
    dateCreated: 1557672169419,
    serverVersion: 1557672169404,
    clientApplicationVersion: 2,
    clientDatabaseVersion: 2,
    baseEntityId: 'aaaca36a-a913-466b-9dd7-0c68db0f7c6f',
    identifiers: {
        opensrp_id: '11099629',
    },
    addresses: [],
    attributes: {
        residence: 'bd73f7d7-4387-4b6b-b632-acb03c4ea160',
    },
    firstName: 'Udom',
    middleName: '',
    lastName: 'Sepsook',
    birthdate: 868320000000,
    birthdateApprox: false,
    deathdateApprox: false,
    relationships: {
        family: ['e540ac0e-d913-4898-846a-d3ee31863182'],
    },
    _id: 'e5929901-9377-413c-850c-e41b48b34d5f',
    _rev: 'v1',
};
export const client5: Client = {
    type: 'Client',
    dateCreated: 1557737485545,
    serverVersion: 1557737485527,
    clientApplicationVersion: 2,
    clientDatabaseVersion: 2,
    baseEntityId: '630739be-e0ba-4f28-a5e7-96d4960fe1a2',
    identifiers: {
        opensrp_id: '11117132',
    },
    addresses: [],
    attributes: {
        residence: '6f7ca772-b368-4c3d-bd9c-00aa698203ca',
    },
    firstName: 'Imalda',
    middleName: '',
    lastName: 'DANE',
    birthdate: 1463097600000,
    birthdateApprox: false,
    deathdateApprox: false,
    gender: 'Female',
    relationships: {
        family: ['97231120-8715-4131-b472-f71ecf230730'],
    },
    _id: 'faa436bb-0aa5-4c5f-a2fe-be687e164205',
    _rev: 'v1',
};
export const client6: Client = {
    type: 'Client',
    dateCreated: 1557737728445,
    serverVersion: 1557737728441,
    clientApplicationVersion: 2,
    clientDatabaseVersion: 2,
    baseEntityId: '97231120-8715-4131-b472-f71ecf230730',
    identifiers: {
        opensrp_id: '11117124_family',
    },
    addresses: [
        {
            preferred: null,
            addressType: '',
            startDate: null,
            endDate: null,
            addressFields: {
                street: 'no street',
                address2: '3',
            },
            latitude: null,
            longitude: null,
            geopoint: null,
            postalCode: null,
            subTown: null,
            town: null,
            subDistrict: null,
            countyDistrict: null,
            cityVillage: 'where ever I am ',
            stateProvince: null,
            country: null,
        },
    ],
    attributes: {
        residence: '6f7ca772-b368-4c3d-bd9c-00aa698203ca',
    },
    firstName: 'DANE',
    lastName: 'Family',
    birthdate: 7200000,
    birthdateApprox: false,
    deathdateApprox: false,
    gender: 'Male',
    relationships: {
        family_head: ['945fc98d-4cce-412a-8327-ca2315efedf3'],
        primary_caregiver: ['945fc98d-4cce-412a-8327-ca2315efedf3'],
    },
    _id: '0a5457f9-3e2e-4432-afae-75b57251651a',
    _rev: 'v1',
};
export const client7: Client = {
    type: 'Client',
    dateCreated: 1557737728487,
    serverVersion: 1557737728441,
    clientApplicationVersion: 2,
    clientDatabaseVersion: 2,
    baseEntityId: '945fc98d-4cce-412a-8327-ca2315efedf3',
    identifiers: {
        opensrp_id: '11117124',
    },
    addresses: [],
    attributes: {
        residence: '6f7ca772-b368-4c3d-bd9c-00aa698203ca',
    },
    firstName: 'Peter',
    middleName: '',
    lastName: 'DANE',
    birthdate: 358560000000,
    birthdateApprox: false,
    deathdateApprox: false,
    relationships: {
        family: ['97231120-8715-4131-b472-f71ecf230730'],
    },
    _id: '6dab682a-0f31-4935-9114-c4d33d148617',
    _rev: 'v1',
};
export const household1: Household = {
    type: 'Client',
    dateCreated: 1657737728487,
    serverVersion: 1557737728441,
    clientApplicationVersion: 2,
    clientDatabaseVersion: 2,
    baseEntityId: '123fc98d-4cce-412a-8327-ca2315efedf3',
    identifiers: {
        opensrp_id: '22117124',
    },
    addresses: [],
    attributes: {
        residence: '6f7ca772-b368-4c3d-bd9c-00aa698203ca',
    },
    firstName: 'Nafiz',
    middleName: '',
    lastName: 'AHMED',
    birthdate: 358560000000,
    birthdateApprox: false,
    deathdateApprox: false,
    relationships: {
        family_head: ['abc5181-c153-4bcc-85c3-0b7c3d9f2263'],
        primary_caregiver: ['deff5181-c153-4bcc-85c3-0b7c3d9f2263'],
    },
    _id: '1bcb682a-0f31-4935-9114-c4d33d148617',
    _rev: 'v1',
};

export const household2: Household = {
    type: 'Client',
    dateCreated: 1757737728487,
    serverVersion: 1557737728441,
    clientApplicationVersion: 2,
    clientDatabaseVersion: 2,
    baseEntityId: '456fc98d-4cce-412a-8327-ca2315efedf3',
    identifiers: {
        opensrp_id: '33117124',
    },
    addresses: [],
    attributes: {
        residence: '6f7ca772-b368-4c3d-bd9c-00aa698203ca',
    },
    firstName: 'Proshanto',
    middleName: '',
    lastName: 'DADA',
    birthdate: 358560000000,
    birthdateApprox: false,
    deathdateApprox: false,
    relationships: {
        family_head: ['ghif5181-c153-4bcc-85c3-0b7c3d9f2263'],
        primary_caregiver: ['jklf5181-c153-4bcc-85c3-0b7c3d9f2263'],
    },
    _id: '2eeb682a-0f31-4935-9114-c4d33d148617',
    _rev: 'v1',
};

export const household3: Household = {
    type: 'Client',
    dateCreated: 1857737728487,
    serverVersion: 1557737728441,
    clientApplicationVersion: 2,
    clientDatabaseVersion: 2,
    baseEntityId: '789fc98d-4cce-412a-8327-ca2315efedf3',
    identifiers: {
        opensrp_id: '44117124',
    },
    addresses: [],
    attributes: {
        residence: '6f7ca772-b368-4c3d-bd9c-00aa698203ca',
    },
    firstName: 'Mahmud',
    middleName: '',
    lastName: 'BHAI',
    birthdate: 358560000000,
    birthdateApprox: false,
    deathdateApprox: false,
    relationships: {
        family_head: ['mnof5181-c153-4bcc-85c3-0b7c3d9f2263'],
        primary_caregiver: ['pqrf5181-c153-4bcc-85c3-0b7c3d9f2263'],
    },
    _id: '3ffb682a-0f31-4935-9114-c4d33d148617',
    _rev: 'v1',
};

export const ANCClient1: ANC = {
    firstName: 'Nakin',
    middleName: '',
    lastName: 'Nadi',
    birthdate: '2007-11-27T06:00:00.000+06:00',
    birthdateApprox: false,
    deathdateApprox: false,
    gender: 'Female',
    relationships: {
        family: ['55fdac01-229c-4c13-977e-304398e873e9'],
    },
    baseEntityId: 'f1a3e6ee-58d2-4d5c-9588-5e2658abe21c',
    identifiers: {
        opensrp_id: '1029340',
    },
    addresses: [],
    attributes: {
        dynamicProperties: {
            age_month_part: 1,
            family_head: 'Easin Family',
            last_contact_date: '2019-11-27T06:00:00.000+0600',
            gestational_age: '2019-11-27T06:00:00.000+0600',
            edd: '2020-03-02T00:00:00.000+0600',
            age_year_part: 12,
            provider_id: 'asim',
            lmp: '2019-05-27T00:00:00.000+0600',
        },
    },
    dateCreated: '2019-11-27T14:13:52.524+06:00',
    serverVersion: 1574842432522,
    clientApplicationVersion: 9,
    clientDatabaseVersion: 12,
    type: 'Client',
    id: '62a874f9-3b24-48d9-b0fe-fc1f21801535',
    revision: 'v1',
};
export const ANCClient2: ANC = {
    firstName: 'Jorina',
    middleName: '',
    lastName: 'Jori',
    birthdate: '2000-11-17T06:00:00.000+06:00',
    birthdateApprox: false,
    deathdateApprox: false,
    gender: 'Female',
    relationships: {
        family: ['c633c0c4-6265-42fc-86bf-492551ff90e8'],
    },
    baseEntityId: '564fce60-29c8-4a9d-b99b-6a74411a1457',
    identifiers: {
        opensrp_id: '1008206',
    },
    addresses: [],
    attributes: {
        dynamicProperties: {
            age_month_part: 2,
            family_head: 'Rajib Family',
            last_contact_date: '2019-11-17T06:00:00.000+0600',
            edd: '2020-02-21T00:00:00.000+0600',
            gestational_age: '2019-11-27T06:00:00.000+0600',
            age_year_part: 19,
            provider_id: 'tanvir',
            lmp: '2019-05-17T00:00:00.000+0600',
        },
    },
    dateCreated: '2019-11-17T12:21:06.552+06:00',
    serverVersion: 1573971666532,
    clientApplicationVersion: 9,
    clientDatabaseVersion: 12,
    type: 'Client',
    id: '00812a49-b4c7-450c-a70c-bd40cecab335',
    revision: 'v1',
};

export const ANCClient3: ANC = {
    firstName: 'Sokhina',
    middleName: '',
    lastName: '',
    birthdate: '2000-11-17T06:00:00.000+06:00',
    birthdateApprox: false,
    deathdateApprox: false,
    gender: 'Female',
    relationships: {
        family: ['c633c0c4-6265-42fc-86bf-492551ff90e8'],
    },
    baseEntityId: '304fce60-29c8-4a9d-b99b-6a74411a1457',
    identifiers: {
        opensrp_id: '1008206',
    },
    addresses: [],
    attributes: {
        dynamicProperties: {
            age_month_part: 2,
            family_head: 'Tanvir Family',
            last_contact_date: '2019-11-17T06:00:00.000+0600',
            edd: '2020-02-21T00:00:00.000+0600',
            gestational_age: '2019-11-27T06:00:00.000+0600',
            age_year_part: 19,
            provider_id: 'tanvir',
            lmp: '2019-05-17T00:00:00.000+0600',
        },
    },
    dateCreated: '2019-11-17T12:21:06.552+06:00',
    serverVersion: 1573971666532,
    clientApplicationVersion: 9,
    clientDatabaseVersion: 12,
    type: 'Client',
    id: '00812a49-b4c7-450c-a70c-bd40cecab335',
    revision: 'v1',
};

export const rawANCClientsPage1 = {
    total: 28,
    clients: [
        ANCClient1,
        ANCClient2,
        {
            firstName: 'Mouli',
            middleName: '',
            lastName: 'Azad',
            birthdate: '1999-12-02T06:00:00.000+06:00',
            birthdateApprox: false,
            deathdateApprox: false,
            gender: 'Female',
            relationships: {
                family: ['bd9e5d1b-d0ae-4f74-a5e1-08c441a28c61'],
            },
            baseEntityId: '71b0b66e-e7c3-4a9e-96c4-0f828cfd5dd7',
            identifiers: {
                opensrp_id: '1039940',
            },
            addresses: [],
            attributes: {
                dynamicProperties: {
                    age_month_part: 1,
                    family_head: 'Azad Family',
                    last_contact_date: '2019-12-02T06:00:00.000+0600',
                    edd: '2019-11-09T00:00:00.000+0600',
                    age_year_part: 20,
                    provider_id: 'asim',
                    lmp: '2019-02-02T00:00:00.000+0600',
                },
            },
            dateCreated: '2019-12-02T18:26:08.494+06:00',
            serverVersion: 1575289568490,
            clientApplicationVersion: 9,
            clientDatabaseVersion: 12,
            type: 'Client',
            id: '9915bcb3-512c-4708-b1ca-1084eddf0f01',
            revision: 'v1',
        },
        {
            firstName: 'Lime',
            middleName: '',
            lastName: 'Azad',
            birthdate: '1996-06-04T06:00:00.000+06:00',
            birthdateApprox: false,
            deathdateApprox: false,
            gender: 'Female',
            relationships: {
                family: ['bd9e5d1b-d0ae-4f74-a5e1-08c441a28c61'],
            },
            baseEntityId: '4563d96f-a5b7-4662-b93d-57f30e7a73f6',
            identifiers: {
                opensrp_id: '1039962',
            },
            addresses: [],
            attributes: {
                dynamicProperties: {
                    age_month_part: 7,
                    family_head: 'Azad Family',
                    last_contact_date: '2020-06-04T06:00:00.000+0600',
                    edd: '2020-03-26T00:00:00.000+0600',
                    age_year_part: 23,
                    provider_id: 'asim',
                    lmp: '2019-06-20T00:00:00.000+0600',
                },
            },
            dateCreated: '2020-06-05T00:39:05.782+06:00',
            dateEdited: '2019-12-02T18:40:33.727+06:00',
            serverVersion: 1575290482292,
            clientApplicationVersion: 9,
            clientDatabaseVersion: 12,
            type: 'Client',
            id: '5af6d6b4-6764-4320-80a8-84026febf74a',
            revision: 'v3',
        },
        {
            firstName: 'Rabia',
            middleName: '',
            lastName: 'Jakir',
            birthdate: '1998-12-17T06:00:00.000+06:00',
            birthdateApprox: false,
            deathdateApprox: false,
            gender: 'Female',
            relationships: {
                family: ['ff7f2058-3352-46cb-aad8-3fa30e5f109f'],
            },
            baseEntityId: 'cb7a8d9a-9159-4897-bb13-f14a6cd43ebb',
            identifiers: {
                opensrp_id: '1039984',
            },
            addresses: [],
            attributes: {
                dynamicProperties: {
                    age_month_part: 1,
                    family_head: 'Jakirm Family',
                    last_contact_date: '2019-12-17T06:00:00.000+0600',
                    edd: '2020-03-21T00:00:00.000+0600',
                    age_year_part: 21,
                    provider_id: 'asim',
                    lmp: '2019-09-23T00:00:00.000+0600',
                },
            },
            dateCreated: '2019-12-17T18:37:47.339+06:00',
            dateEdited: '2019-12-17T12:38:39.077+06:00',
            serverVersion: 1576564741430,
            clientApplicationVersion: 9,
            clientDatabaseVersion: 12,
            type: 'Client',
            id: '8e6d9a53-acd3-40c6-bb51-f00f0e105ff8',
            revision: 'v3',
        },
    ],
};

export const rawANCClientsPage2 = {
    total: 28,
    clients: [
        {
            firstName: 'Sumaya',
            middleName: '',
            lastName: 'Sumi',
            birthdate: '1999-12-01T06:00:00.000+06:00',
            birthdateApprox: false,
            deathdateApprox: false,
            gender: 'Female',
            relationships: {
                family: ['ff7f2058-3352-46cb-aad8-3fa30e5f109f'],
            },
            baseEntityId: '08b19214-3a7a-4aea-9415-94ace388efc4',
            identifiers: {
                opensrp_id: '1034673',
            },
            addresses: [],
            attributes: {
                dynamicProperties: {
                    age_month_part: 1,
                    family_head: 'Jakirm Family',
                    last_contact_date: '2019-12-01T06:00:00.000+0600',
                    edd: '2020-05-07T00:00:00.000+0600',
                    age_year_part: 20,
                    provider_id: 'asim',
                    lmp: '2019-08-01T00:00:00.000+0600',
                },
            },
            dateCreated: '2019-12-01T11:49:10.645+06:00',
            serverVersion: 1575179350638,
            clientApplicationVersion: 9,
            clientDatabaseVersion: 12,
            type: 'Client',
            id: '5ca1fa7f-8108-49b6-8ef0-1c59b2ec8225',
            revision: 'v1',
        },
        {
            firstName: 'Rani',
            middleName: '',
            lastName: 'Ritu',
            birthdate: '2003-11-27T06:00:00.000+06:00',
            birthdateApprox: false,
            deathdateApprox: false,
            gender: 'Female',
            relationships: {
                family: ['55fdac01-229c-4c13-977e-304398e873e9'],
            },
            baseEntityId: '2abfa3ed-c280-4c7c-b3a6-78e984907140',
            identifiers: {
                opensrp_id: '1029351',
            },
            addresses: [],
            attributes: {
                dynamicProperties: {
                    age_month_part: 1,
                    family_head: 'Easin Family',
                    last_contact_date: '2019-11-27T06:00:00.000+0600',
                    edd: '2020-03-02T00:00:00.000+0600',
                    age_year_part: 16,
                    provider_id: 'asim',
                    lmp: '2019-05-27T00:00:00.000+0600',
                },
            },
            dateCreated: '2019-11-27T14:17:41.344+06:00',
            serverVersion: 1574842661342,
            clientApplicationVersion: 9,
            clientDatabaseVersion: 12,
            type: 'Client',
            id: '299a300a-2e08-4917-8ff8-6757075baab4',
            revision: 'v1',
        },
        {
            firstName: 'Jamima',
            middleName: '',
            lastName: 'Jamim',
            birthdate: '2001-11-17T06:00:00.000+06:00',
            birthdateApprox: false,
            deathdateApprox: false,
            gender: 'Female',
            relationships: {
                family: ['c633c0c4-6265-42fc-86bf-492551ff90e8'],
            },
            baseEntityId: '80f9fc8d-0f36-48e5-8b40-ebf4a59c9c53',
            identifiers: {
                opensrp_id: '1008228',
            },
            addresses: [],
            attributes: {
                dynamicProperties: {
                    age_month_part: 2,
                    family_head: 'Rajib Family',
                    last_contact_date: '2019-11-17T06:00:00.000+0600',
                    edd: '2020-04-22T00:00:00.000+0600',
                    age_year_part: 18,
                    provider_id: 'tanvir',
                    lmp: '2019-07-17T00:00:00.000+0600',
                },
            },
            dateCreated: '2019-11-17T13:29:27.597+06:00',
            serverVersion: 1573975767555,
            clientApplicationVersion: 9,
            clientDatabaseVersion: 12,
            type: 'Client',
            id: '290996e7-0414-41e7-9f85-2ffcf2b4e8c2',
            revision: 'v1',
        },
        {
            firstName: 'Joy Mala',
            middleName: '',
            lastName: 'Joya',
            birthdate: '1993-11-14T06:00:00.000+06:00',
            birthdateApprox: false,
            deathdateApprox: false,
            gender: 'Female',
            relationships: {
                family: ['ea0edc48-4752-4ad0-a834-f1f68c7ae310'],
            },
            baseEntityId: '51f7cdff-c5cc-4174-95b3-eb38b26f111d',
            identifiers: {
                opensrp_id: '1008151',
            },
            addresses: [],
            attributes: {
                'Patient Image': '51f7cdff-c5cc-4174-95b3-eb38b26f111d.jpg',
                dynamicProperties: {
                    age_month_part: 2,
                    family_head: 'Haraner Bari Family',
                    last_contact_date: '2019-11-14T06:00:00.000+0600',
                    edd: '2020-04-19T00:00:00.000+0600',
                    age_year_part: 26,
                    provider_id: 'tanvir',
                    lmp: '2019-07-14T00:00:00.000+0600',
                },
            },
            dateCreated: '2019-11-17T21:57:06.402+06:00',
            dateEdited: '2019-11-17T15:57:15.638+06:00',
            serverVersion: 1573984815658,
            clientApplicationVersion: 9,
            clientDatabaseVersion: 12,
            type: 'Client',
            id: '740065ae-edf8-4dc8-83e6-56b6a9d9d707',
            revision: 'v4',
        },
        {
            firstName: 'Mahima',
            middleName: '',
            lastName: 'Mojim',
            birthdate: '2002-12-01T06:00:00.000+06:00',
            birthdateApprox: false,
            deathdateApprox: false,
            gender: 'Female',
            relationships: {
                family: ['e05a77fa-01d3-4ead-b60c-88e56401870b'],
            },
            baseEntityId: '88919940-e6c9-4163-96b6-91f397928113',
            identifiers: {
                opensrp_id: '1034706',
            },
            addresses: [],
            attributes: {
                dynamicProperties: {
                    age_month_part: 1,
                    family_head: 'Mihir Family',
                    last_contact_date: '2019-12-01T06:00:00.000+0600',
                    edd: '2020-06-07T00:00:00.000+0600',
                    age_year_part: 17,
                    provider_id: 'asim',
                    lmp: '2019-09-01T00:00:00.000+0600',
                },
            },
            dateCreated: '2019-12-01T11:51:34.543+06:00',
            serverVersion: 1575179494539,
            clientApplicationVersion: 9,
            clientDatabaseVersion: 12,
            type: 'Client',
            id: 'd3a7b537-39fb-4ce9-8c86-0a11e6117be7',
            revision: 'v1',
        },
    ],
};
export const event1: Event = {
    _id: '28d5cf94-15ee-4462-ab56-a83eb4c42f73',
    _rev: 'v1',
    baseEntityId: '6e8b72c5-0b36-4e46-829f-8ujd1482c96a',
    clientApplicationVersion: 2,
    clientDatabaseVersion: 2,
    dateCreated: 358560000000,
    duration: 0,
    entityType: 'ec_household',
    eventDate: 358560000000,
    eventType: 'Household Registration',
    formSubmissionId: 'f6e0c01d-1d1a-4462-ab56-a83eac075093',
    identifiers: {
        id: '1d-1d1a-4667',
    },
    isSendToOpenMRS: 'yes',
    locationId: '56b112d2-21ce-4818-b603-277bb57f5528',
    obs: [
        {
            fieldCode: '3a46b207-dc8b-4e5b-8b1f-162fca3905ca',
            fieldDataType: 'text',
            fieldType: 'concept',
            formSubmissionField: 'water_source',
            parentCode: '',
        },
    ],
    providerId: '',
    serverVersion: 1552287303783,
    team: '',
    teamId: '',
    type: 'Event',
    version: 1552287303606,
};

export const event2: Event = {
    _id: '89asdfk-15ee-4462-ab56-a83eb4c42f73',
    _rev: 'v1',
    baseEntityId: '5e8b72c5-0b36-9d7d-829f-279d1482c96a',
    clientApplicationVersion: 2,
    clientDatabaseVersion: 3,
    dateCreated: 358560003645,
    duration: 12,
    entityType: 'ec_household',
    eventDate: 358560009256,
    eventType: 'Household Registration',
    formSubmissionId: 'f5e0c01d-1d1a-4667-911e-ebc3ac075093',
    identifiers: {
        id: '1d-1d1a-4667',
    },
    isSendToOpenMRS: 'yes',
    locationId: '56b112d2-21ce-4818-b603-277bb57f5528',
    obs: [
        {
            fieldCode: '3a49jg-dc8b-8eba-8b1f-998d3905ca',
            fieldDataType: 'text',
            fieldType: 'concept',
            formSubmissionField: 'wind_source',
            parentCode: '',
        },
    ],
    providerId: '',
    serverVersion: 1552287303783,
    team: '',
    teamId: '',
    type: 'Event',
    version: 1552287303606,
};

export const event3: Event = {
    _id: '67b2jdfk-15ee-4462-ab56-a83eb4c42f73',
    _rev: 'v1',
    baseEntityId: '5e8b72c5-0b36-9d7d-829f-09adfj2c96a',
    clientApplicationVersion: 2,
    clientDatabaseVersion: 3,
    dateCreated: 358560003645,
    duration: 12,
    entityType: 'ec_household',
    eventDate: 358560009256,
    eventType: 'Household Registration',
    formSubmissionId: 'f5e0101d-1d1a-4667-911e-ebc1ac075003',
    identifiers: {
        id: '2d-9d1a-4667',
    },
    isSendToOpenMRS: 'yes',
    locationId: '56b112d2-21ce-4818-b603-277bb57f5528',
    obs: [
        {
            fieldCode: '3a49jg-dc8b-8eba-8b1f-998d3905ca',
            fieldDataType: 'dropdown',
            fieldType: 'concept',
            formSubmissionField: 'food_source',
            parentCode: '',
        },
    ],
    providerId: '',
    serverVersion: 1784287303783,
    team: '',
    teamId: '',
    type: 'Event',
    version: 29787303842,
};

export const child1: Child = {
    type: 'Client',
    dateCreated: 1751437728487,
    serverVersion: 1557937728441,
    clientApplicationVersion: 2,
    clientDatabaseVersion: 2,
    baseEntityId: '906fc91h-4cce-412a-8327-ca2315ekoeo9',
    identifiers: {
        opensrp_id: '3117124',
    },
    addresses: [],
    attributes: {
        residence: '6f7ca772-b368-4c3d-bd9c-011ra698203a',
        dynamicProperties: {
            last_contact_date: '2020-01-01T00:02:01',
            age_year_part: 2,
        },
    },
    firstName: 'zysan',
    middleName: '',
    lastName: 'DADA',
    birthdate: 358110000088,
    birthdateApprox: false,
    deathdateApprox: false,
    relationships: {
        family_head: ['gjio081-c153-4bcc-85c3-0b7c3d9f2263'],
        primary_caregiver: ['jklf5181-c153-4bcc-85c3-0b7c3d9f2263'],
    },
    _id: '922db682a-0f31-4935-9114-c4d33d148617',
    _rev: 'v1',
};

export const child2: Child = {
    type: 'Client',
    dateCreated: 1851437728487,
    serverVersion: 1257937728441,
    clientApplicationVersion: 21,
    clientDatabaseVersion: 1,
    baseEntityId: '406fc91h-4cce-412a-8327-ca2315ekoeo9',
    identifiers: {
        opensrp_id: '3117124',
    },
    addresses: [],
    attributes: {
        residence: '1f7ca772-b368-4c3d-bd9c-011ra698203a',
        dynamicProperties: {
            last_contact_date: '2020-01-01T00:02:01',
            age_year_part: 2,
        },
    },
    firstName: 'zysan',
    middleName: '',
    lastName: 'DADA',
    birthdate: 458110000088,
    birthdateApprox: true,
    deathdateApprox: true,
    relationships: {
        family_head: ['gjio081-c153-4bcc-85c3-0b7c3d9f2263'],
        primary_caregiver: ['jklf5172-c153-4bcc-85c3-0b7c3d9f2263'],
    },
    _id: '922db682a-0f31-4935-9114-c4d33d148617',
    _rev: 'v1',
};

export const child3: Child = {
    type: 'Client',
    dateCreated: 1751437728487,
    serverVersion: 1557937728441,
    clientApplicationVersion: 2,
    clientDatabaseVersion: 2,
    baseEntityId: '306fc91h-4cce-41qa-9327-ca2315ekoeo9',
    identifiers: {
        opensrp_id: '3117124',
    },
    addresses: [],
    attributes: {
        residence: '9f7ca772-b368-4d39-bd9c-011ra698203a',
        dynamicProperties: {
            last_contact_date: '2020-01-01T00:02:01',
            age_year_part: 2,
        },
    },
    firstName: 'tanvir',
    middleName: '',
    lastName: 'DADA',
    birthdate: 3581101103188,
    birthdateApprox: false,
    deathdateApprox: true,
    relationships: {
        family_head: ['gjio081-c153-4bcc-85c3-0b7c3d9f2263'],
        primary_caregiver: ['jklf5181-c153-4bcc-85c3-0b7c3d9f2263'],
    },
    _id: '912db682a-0f31-4935-9114-c4d33d148617',
    _rev: 'v1',
};

export const team1 = {
    id: 2,
    identifier: '801874c0-d963-11e9-8a34-2a2ae2dbcce4',
    active: true,
    name: 'B Team',
    type: {
        coding: [
            {
                system: 'http://terminology.hl7.org/CodeSystem/organization-type',
                code: 'team',
                display: 'Team',
            },
        ],
    },
};

export const team2 = {
    id: 3,
    identifier: '801874c0-d963-11e9-8a34-2a2ae2dbcce5',
    active: true,
    name: 'C Team',
    partOf: 2,
    type: {
        coding: [
            {
                system: 'http://terminology.hl7.org/CodeSystem/organization-type',
                code: 'team',
                display: 'Team',
            },
        ],
    },
};

export const team3 = {
    id: 4,
    identifier: '801874c0-d963-11e9-8a34-2a2ae2dbcce7',
    active: true,
    name: 'DTeam',
    partOf: 2,
    type: {
        coding: [
            {
                system: 'http://terminology.hl7.org/CodeSystem/organization-type',
                code: 'team',
                display: 'Team',
            },
        ],
    },
};

export const teamMember1: TeamMember = {
    identifier: 'akdsjfhkjh321',
    active: true,
    name: 'proshanto',
    userId: '11',
    username: 'proshanto29',
};

export const teamMember2: TeamMember = {
    identifier: 'hkjh321oiwe',
    active: true,
    name: 'tanvir',
    userId: '12',
    username: 'tanvir420',
};

export const teamMember3: TeamMember = {
    identifier: '9009ui1oiwe',
    active: true,
    name: 'yasin',
    userId: '13',
    username: 'yasin34',
};

export const location1: Location = {
    type: 'Feature',
    id: '3',
    properties: {
        uid: '694e0f30-d9ac-4576-b50a-38a3ef13ebcr',
        type: 'Residential Structure',
        status: 'Pending Review',
        parentId: '22',
        name: 'Rajbari',
        geographicLevel: 0,
        effectiveStartDate: '2015-01-01T0000',
        version: 0,
        parentName: 'Dhaka',
        tagName: 'District',
    },
    serverVersion: 1586159649654,
    locationTags: [
        {
            id: 3,
            active: true,
            name: 'District',
            description: 'District',
        },
    ],
};

export const location2: Location = {
    type: 'Feature',
    id: '4',
    properties: {
        uid: '694e0f30-d9ac-4576-b50a-38a3ef13ebcr',
        type: 'Residential Structure',
        status: 'Pending Review',
        parentId: '23',
        name: 'Baliakandi',
        geographicLevel: 0,
        effectiveStartDate: '2015-01-01T0000',
        version: 0,
        parentName: 'Rajbari',
        tagName: 'Thana',
    },
    serverVersion: 1586159769694,
    locationTags: [
        {
            id: 4,
            active: true,
            name: 'Thana',
            description: 'Thana',
        },
    ],
};

export const location3: Location = {
    type: 'Feature',
    id: '5',
    properties: {
        uid: '694e0f30-d9ac-4576-b50a-38a3ef13ebcr',
        type: 'Residential Structure',
        status: 'Pending Review',
        parentId: '24',
        name: 'Pangsha',
        geographicLevel: 0,
        effectiveStartDate: '2015-01-01T0000',
        version: 0,
        parentName: 'Baliakandi',
        tagName: 'Union',
    },
    serverVersion: 1586159769695,
    locationTags: [
        {
            id: 10,
            active: true,
            name: 'Union',
            description: 'Union',
        },
    ],
};

export const locationTag1: LocationTag = {
    id: '1',
    name: 'District',
    active: true,
    description: 'level 2',
};

export const locationTag2: LocationTag = {
    id: '2',
    name: 'division',
    active: true,
    description: 'level 1',
};

export const locationTag3: LocationTag = {
    id: '3',
    name: 'upazila',
    active: true,
    description: 'level 3',
};

export const report1: RegisterPanelData = {
    report: '0 weeks',
    date: '20-03-2020',
    reporter: 'tanvir',
    message: 'opv1',
};

export const report2: RegisterPanelData = {
    report: '4 weeks',
    date: '20-04-2020',
    reporter: 'tanvir',
    message: 'bcg',
};

export const report3: RegisterPanelData = {
    report: '6 weeks',
    date: '20-05-2020',
    reporter: 'tanvir',
    message: 'cpv',
};

export const clients: Client[] = [client1, client2, client3, client4, client5, client6, client7];
export const households: Household[] = [household1, household2, household3];
export const events: Event[] = [event1, event2, event3];
export const childList: Child[] = [child1, child2, child3];
export const ancList: ANC[] = [ANCClient1, ANCClient2, ANCClient3];
export const teamList: Team[] = [team1, team2, team3];
export const teamMemberList: TeamMember[] = [teamMember1, teamMember2, teamMember3];
export const locations: Location[] = [location1, location2, location3];
export const locationTagList: LocationTag[] = [locationTag1, locationTag2, locationTag3];
export const registerData: RegisterPanelData[] = [report1, report2, report3];
