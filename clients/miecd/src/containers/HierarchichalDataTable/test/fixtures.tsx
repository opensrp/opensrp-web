import { Location, UserLocation } from '../../../store/ducks/locations';

export const districts: Location[] = [
  {
    level: 'District',
    location_id: '623b644d-a1f2-4c5e-b065-d60c0ae6501f',
    location_name: 'Tay Ho District',
    parent_id: '78a12165-3c12-471f-8755-c96bac123292',
  },
  {
    level: 'District',
    location_id: 'ecb1b238-90a2-4462-abef-6a4d9dd10a81',
    location_name: 'Tuan Giao',
    parent_id: 'c13b5c95-55c3-4848-9509-b82596274d96',
  },
];

export const provinces: Location[] = [
  {
    level: 'Province',
    location_id: 'd79168ed-ae95-43d1-8e45-9078212815f6',
    location_name: 'Lang Son Province',
    parent_id: 'eca48e41-8cbb-4cb2-ba15-5de0394416f6',
  },
  {
    level: 'Province',
    location_id: 'c13b5c95-55c3-4848-9509-b82596274d96',
    location_name: 'Dien Bien',
    parent_id: 'eca48e41-8cbb-4cb2-ba15-5de0394416f6',
  },
  {
    level: 'Province',
    location_id: '78a12165-3c12-471f-8755-c96bac123292',
    location_name: 'Hanoi',
    parent_id: 'eca48e41-8cbb-4cb2-ba15-5de0394416f6',
  },
  {
    level: 'Province',
    location_id: 'f7d1d9bb-95dc-43bc-8434-0dddd1f3d374',
    location_name: 'Loc Binh',
    parent_id: 'd79168ed-ae95-43d1-8e45-9078212815f6',
  },
];

export const communes: Location[] = [
  {
    level: 'Commune',
    location_id: '46d98781-7cc4-4c28-8379-a3552a57acfe',
    location_name: 'Yen Phu Ward',
    parent_id: '623b644d-a1f2-4c5e-b065-d60c0ae6501f',
  },
  {
    level: 'Commune',
    location_id: '18ee2dfd-8a59-412d-943f-b9fd10ca4209',
    location_name: 'Muong Thin',
    parent_id: 'ecb1b238-90a2-4462-abef-6a4d9dd10a81',
  },
];

export const villages: Location[] = [
  {
    level: 'Village',
    location_id: 'bb37165f-2ee9-4cad-a3b5-020c0cc75ccf',
    location_name: 'Yen Phu Village',
    parent_id: '46d98781-7cc4-4c28-8379-a3552a57acfe',
  },
];

export const userLocationDetails: UserLocation[] = [
  {
    location_id: '9c654085-92b3-49e1-bc3b-0201f86c3',
    location_name: 'Hanoi',
    openmrs_identifier: '099229',
    provider_contact: 'telegram:975142852',
    provider_id: 'hdhdgdhs',
    provider_name: 'Test user 1',
  },
  {
    location_id: '9c654085-92b3-49e1-bc3b-0201f86c3',
    location_name: 'Nai',
    openmrs_identifier: '8877875',
    provider_contact: 'telegram:646474',
    provider_id: 'dgsurrhwbsb',
    provider_name: 'Test user 2',
  },
];
