import { Client } from '../../ducks/clients';
import { Household } from '../../ducks/households';
export const client1: Client = {
  type: 'Client',
  // tslint:disable-next-line: object-literal-sort-keys
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
      // tslint:disable-next-line: object-literal-sort-keys
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
  // tslint:disable-next-line: object-literal-sort-keys
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
  // tslint:disable-next-line: object-literal-sort-keys
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
      // tslint:disable-next-line: object-literal-sort-keys
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
  // tslint:disable-next-line: object-literal-sort-keys
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
  // tslint:disable-next-line: object-literal-sort-keys
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
      // tslint:disable-next-line: object-literal-sort-keys
      addressType: '',
      startDate: null,
      endDate: null,
      addressFields: {
        street: 'no street',
        // tslint:disable-next-line: object-literal-sort-keys
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
  // tslint:disable-next-line: object-literal-sort-keys
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
  // tslint:disable-next-line: object-literal-sort-keys
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
  // tslint:disable-next-line: object-literal-sort-keys
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
  // tslint:disable-next-line: object-literal-sort-keys
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

export const clients: Client[] = [client1, client2, client3, client4, client5, client6, client7];
export const households: Household[] = [household1, household2, household3];
