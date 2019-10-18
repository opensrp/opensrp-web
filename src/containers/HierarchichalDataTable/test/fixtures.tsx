import { number, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPARTMENTS_URL } from '../../../constants';

interface LocationData {
  id: number;
  name: string | Element;
  parent_id: number | null;
  high_risk: number;
  low_risk: number;
  no_risk: number;
  total: number;
}
export const provinces: LocationData[] = [
  {
    high_risk: 2,
    id: 18,
    low_risk: 3,
    name: 'District D',
    no_risk: 4,
    parent_id: null,
    total: 9,
  },
  {
    high_risk: 2,
    id: 1,
    low_risk: 3,
    name: 'District A',
    no_risk: 4,
    parent_id: null,
    total: 9,
  },
  {
    high_risk: 2,
    id: 2,
    low_risk: 3,
    name: 'District B',
    no_risk: 4,
    parent_id: null,
    total: 9,
  },
  {
    high_risk: 2,
    id: 3,
    low_risk: 3,
    name: 'District C',
    no_risk: 4,
    parent_id: null,
    total: 9,
  },
];

export const districts: LocationData[] = [
  {
    high_risk: 2,
    id: 3,
    low_risk: 3,
    name: 'HFC 3',
    no_risk: 4,
    parent_id: 2,
    total: 9,
  },
  {
    high_risk: 2,
    id: 17,
    low_risk: 3,
    name: 'HFC 17',
    no_risk: 4,
    parent_id: 2,
    total: 9,
  },
  {
    high_risk: 2,
    id: 7,
    low_risk: 3,
    name: 'HFC 4',
    no_risk: 4,
    parent_id: 3,
    total: 9,
  },
  {
    high_risk: 2,
    id: 8,
    low_risk: 3,
    name: 'HFC 5',
    no_risk: 4,
    parent_id: 3,
    total: 9,
  },
  {
    high_risk: 2,
    id: 6,
    low_risk: 3,
    name: 'HF 2',
    no_risk: 4,
    parent_id: 1,
    total: 9,
  },
  {
    high_risk: 2,
    id: 4,
    low_risk: 3,
    name: 'HFC 1',
    no_risk: 4,
    parent_id: 1,
    total: 9,
  },
];
export const villages: LocationData[] = [
  {
    high_risk: 2,
    id: 22,
    low_risk: 3,
    name: 'HFC 1',
    no_risk: 4,
    parent_id: 13,
    total: 9,
  },
] as any;
export const communes = [
  {
    high_risk: 2,
    id: 9,
    low_risk: 3,
    name: 'Operational Area 9',
    no_risk: 4,
    parent_id: 4,
    total: 9,
  },
  {
    high_risk: 2,
    id: 10,
    low_risk: 3,
    name: 'Operational Area 10',
    no_risk: 4,
    parent_id: 4,
    total: 9,
  },
  {
    high_risk: 2,
    id: 11,
    low_risk: 3,
    name: 'Operational Area 11',
    no_risk: 4,
    parent_id: 4,
    total: 9,
  },
  {
    high_risk: 2,
    id: 12,
    low_risk: 3,
    name: 'Operational Area 12',
    no_risk: 4,
    parent_id: 5,
    total: 9,
  },
  {
    high_risk: 2,
    id: 13,
    low_risk: 3,
    name: 'Operational Area 13',
    no_risk: 4,
    parent_id: 6,
    total: 9,
  },
  {
    high_risk: 2,
    id: 14,
    low_risk: 3,
    name: 'Operational Area 14',
    no_risk: 4,
    parent_id: 6,
    total: 9,
  },
  {
    high_risk: 2,
    id: 17,
    low_risk: 3,
    name: 'Operational Area 17',
    no_risk: 4,
    parent_id: 6,
    total: 9,
  },
  {
    high_risk: 2,
    id: 18,
    low_risk: 3,
    name: 'Operational Area 18',
    no_risk: 4,
    parent_id: 6,
    total: 9,
  },
  {
    high_risk: 2,
    id: 15,
    low_risk: 3,
    name: 'Operational Area 15',
    no_risk: 4,
    parent_id: 6,
    total: 9,
  },
  {
    high_risk: 2,
    id: 16,
    low_risk: 3,
    name: 'Operational Area 16',
    no_risk: 4,
    parent_id: 6,
    total: 9,
  },
] as any;
