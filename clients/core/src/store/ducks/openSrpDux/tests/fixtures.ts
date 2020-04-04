/*eslint @typescript-eslint/camelcase: ["error", {properties: "never"}]*/
export const allSettings = [
    {
        description:
            'The proportion of Hepatitis B surface antigen (HBsAg) seroprevalance in the general population is 2% or higher.',
        label: 'Hep B prevalence is intermediate (2% or higher) or high (5% or higher)',
        value: true,
        key: 'pop_hepb',
        type: 'SettingConfiguration',
        identifier: 'population_characteristics',
        team_id: 'a17d-80dfc89bdac1',
        team: 'test team',
        provider_id: '8980-5cc5b97479d3',
        locationId: '9900-555e6e5e5557',
    },
    {
        description:
            'The proportion of Hepatitis B surface antigen (HBsAg) seroprevalance in the general population is 2% or higher two.',
        label: 'Hep B prevalence is intermediate (2% or higher) or high (5% or higher) two',
        value: false,
        key: 'pop_hepb_two',
        type: 'SettingConfiguration',
        identifier: 'population_characteristics',
        team_id: 'a17d-816261a7749a',
        team: 'test team two',
        provider_id: '8980-7c6f0a243495',
        locationId: '9900-6bc1b92ff848',
    },
];
