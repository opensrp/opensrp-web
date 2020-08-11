import { locHierarchy } from '../../../components/EditSettings/tests/fixtures';
import { getLocationDetailsFromLocMap } from '../utils';

describe('src/ducks/locations/utils/getLocationDetailsFromLocMap', () => {
    const map = locHierarchy.locationsHierarchy.map;

    it('should return details correctly if the location is the parent level', () => {
        const locDetails = getLocationDetailsFromLocMap(map, '02ebbc84-5e29-4cd5-9b79-c594058923e9');
        expect(locDetails).toEqual(map['02ebbc84-5e29-4cd5-9b79-c594058923e9']);
    });

    it('should return details correctly if location is a middle level', () => {
        const locDetails = getLocationDetailsFromLocMap(map, '4e188e6d-2ffb-4b25-85f9-b9fbf5010d40');
        expect(locDetails).toEqual({
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
        });
    });

    it('should return details correctly if the location is the last level', () => {
        const locDetails = getLocationDetailsFromLocMap(map, 'ee08a6e0-3f73-4c28-b186-64d5cd06f4ce');
        expect(locDetails).toEqual({
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
        });
    });
});
