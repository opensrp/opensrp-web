const treeData = {
  locations: {
    locationsHierarchy: {
      map: {
        'c768ef20-01fe-4877-b670-9b6570be17be': {
          id: 'c768ef20-01fe-4877-b670-9b6570be17be',
          label: 'BANGLADESH',
          node: {
            locationId: 'c768ef20-01fe-4877-b670-9b6570be17be',
            name: 'BANGLADESH',
            tags: ['Country'],
            voided: false,
          },
          children: {
            'e380918b-c409-40c0-a426-58ccc4411d53': {
              id: 'e380918b-c409-40c0-a426-58ccc4411d53',
              label: 'DHAKA',
              node: {
                locationId: 'e380918b-c409-40c0-a426-58ccc4411d53',
                name: 'DHAKA',
                parentLocation: {
                  locationId: 'c768ef20-01fe-4877-b670-9b6570be17be',
                  name: 'BANGLADESH',
                  voided: false,
                },
                tags: ['Clinic'],
                voided: false,
              },
              children: {
                '39e17f2c-4bea-4f58-adc6-9f035fe56ce7': {
                  id: '39e17f2c-4bea-4f58-adc6-9f035fe56ce7',
                  label: 'NARSINGDI',
                  node: {
                    locationId: '39e17f2c-4bea-4f58-adc6-9f035fe56ce7',
                    name: 'NARSINGDI',
                    parentLocation: {
                      locationId: 'e380918b-c409-40c0-a426-58ccc4411d53',
                      name: 'DHAKA',
                      parentLocation: {
                        locationId: 'c768ef20-01fe-4877-b670-9b6570be17be',
                        name: 'BANGLADESH',
                        voided: false,
                      },
                      voided: false,
                    },
                    tags: ['CHSS'],
                    voided: false,
                  },
                  children: {
                    'a45ae47b-1c56-4b85-a339-a80fe45d406e': {
                      id: 'a45ae47b-1c56-4b85-a339-a80fe45d406e',
                      label: 'SHIBPUR',
                      node: {
                        locationId: 'a45ae47b-1c56-4b85-a339-a80fe45d406e',
                        name: 'SHIBPUR',
                        parentLocation: {
                          locationId: '39e17f2c-4bea-4f58-adc6-9f035fe56ce7',
                          name: 'NARSINGDI',
                          parentLocation: {
                            locationId: 'e380918b-c409-40c0-a426-58ccc4411d53',
                            name: 'DHAKA',
                            voided: false,
                          },
                          voided: false,
                        },
                        tags: ['CHA'],
                        voided: false,
                      },
                      children: {
                        '7ec71d99-3a38-467b-8df3-222f0b9d0534': {
                          id: '7ec71d99-3a38-467b-8df3-222f0b9d0534',
                          label: 'AYUBPUR',
                          node: {
                            locationId: '7ec71d99-3a38-467b-8df3-222f0b9d0534',
                            name: 'AYUBPUR',
                            parentLocation: {
                              locationId: 'a45ae47b-1c56-4b85-a339-a80fe45d406e',
                              name: 'SHIBPUR',
                              parentLocation: {
                                locationId: '39e17f2c-4bea-4f58-adc6-9f035fe56ce7',
                                name: 'NARSINGDI',
                                voided: false,
                              },
                              voided: false,
                            },
                            tags: ['Supervisor'],
                            voided: false,
                          },
                          children: {
                            '512a8d3f-c9d3-4a8a-8599-ae5d4716a67f': {
                              id: '512a8d3f-c9d3-4a8a-8599-ae5d4716a67f',
                              label: 'AYUBPUR:WARD 1',
                              node: {
                                locationId: '512a8d3f-c9d3-4a8a-8599-ae5d4716a67f',
                                name: 'AYUBPUR:WARD 1',
                                parentLocation: {
                                  locationId: '7ec71d99-3a38-467b-8df3-222f0b9d0534',
                                  name: 'AYUBPUR',
                                  parentLocation: {
                                    locationId: 'a45ae47b-1c56-4b85-a339-a80fe45d406e',
                                    name: 'SHIBPUR',
                                    voided: false,
                                  },
                                  voided: false,
                                },
                                tags: ['Visit Location', 'CHW', 'Login Location'],
                                voided: false,
                              },
                              children: {
                                'aaa962ba-745d-4d91-9f0e-df6ead6112fc': {
                                  id: 'aaa962ba-745d-4d91-9f0e-df6ead6112fc',
                                  label: 'AYUBPUR:WARD 1:GA 1',
                                  node: {
                                    locationId: 'aaa962ba-745d-4d91-9f0e-df6ead6112fc',
                                    name: 'AYUBPUR:WARD 1:GA 1',
                                    parentLocation: {
                                      locationId: '512a8d3f-c9d3-4a8a-8599-ae5d4716a67f',
                                      name: 'AYUBPUR:WARD 1',
                                      parentLocation: {
                                        locationId: '7ec71d99-3a38-467b-8df3-222f0b9d0534',
                                        name: 'AYUBPUR',
                                        voided: false,
                                      },
                                      voided: false,
                                    },
                                    tags: ['Block'],
                                    voided: false,
                                  },
                                  parent: '512a8d3f-c9d3-4a8a-8599-ae5d4716a67f',
                                },
                              },
                              parent: '7ec71d99-3a38-467b-8df3-222f0b9d0534',
                            },
                            '118e277a-1391-4410-9271-00b7c8f36d38': {
                              id: '118e277a-1391-4410-9271-00b7c8f36d38',
                              label: 'AYUBPUR:WARD 3',
                              node: {
                                locationId: '118e277a-1391-4410-9271-00b7c8f36d38',
                                name: 'AYUBPUR:WARD 3',
                                parentLocation: {
                                  locationId: '7ec71d99-3a38-467b-8df3-222f0b9d0534',
                                  name: 'AYUBPUR',
                                  parentLocation: {
                                    locationId: 'a45ae47b-1c56-4b85-a339-a80fe45d406e',
                                    name: 'SHIBPUR',
                                    voided: false,
                                  },
                                  voided: false,
                                },
                                tags: ['Visit Location', 'CHW', 'Login Location'],
                                voided: false,
                              },
                              children: {
                                'ec1f8d07-cfba-4863-a3ac-aeb03bc127a5': {
                                  id: 'ec1f8d07-cfba-4863-a3ac-aeb03bc127a5',
                                  label: 'AYUBPUR:WARD 3:GHA 2',
                                  node: {
                                    locationId: 'ec1f8d07-cfba-4863-a3ac-aeb03bc127a5',
                                    name: 'AYUBPUR:WARD 3:GHA 2',
                                    parentLocation: {
                                      locationId: '118e277a-1391-4410-9271-00b7c8f36d38',
                                      name: 'AYUBPUR:WARD 3',
                                      parentLocation: {
                                        locationId: '7ec71d99-3a38-467b-8df3-222f0b9d0534',
                                        name: 'AYUBPUR',
                                        voided: false,
                                      },
                                      voided: false,
                                    },
                                    tags: ['Block'],
                                    voided: false,
                                  },
                                  parent: '118e277a-1391-4410-9271-00b7c8f36d38',
                                },
                                '2d835935-ba83-4d94-bf27-926774008432': {
                                  id: '2d835935-ba83-4d94-bf27-926774008432',
                                  label: 'AYUBPUR:WARD 3:KA2',
                                  node: {
                                    locationId: '2d835935-ba83-4d94-bf27-926774008432',
                                    name: 'AYUBPUR:WARD 3:KA2',
                                    parentLocation: {
                                      locationId: '118e277a-1391-4410-9271-00b7c8f36d38',
                                      name: 'AYUBPUR:WARD 3',
                                      parentLocation: {
                                        locationId: '7ec71d99-3a38-467b-8df3-222f0b9d0534',
                                        name: 'AYUBPUR',
                                        voided: false,
                                      },
                                      voided: false,
                                    },
                                    tags: ['Block'],
                                    voided: false,
                                  },
                                  parent: '118e277a-1391-4410-9271-00b7c8f36d38',
                                },
                              },
                              parent: '7ec71d99-3a38-467b-8df3-222f0b9d0534',
                            },
                          },
                          parent: 'a45ae47b-1c56-4b85-a339-a80fe45d406e',
                        },
                      },
                      parent: '39e17f2c-4bea-4f58-adc6-9f035fe56ce7',
                    },
                  },
                  parent: 'e380918b-c409-40c0-a426-58ccc4411d53',
                },
              },
              parent: 'c768ef20-01fe-4877-b670-9b6570be17be',
            },
          },
        },
      },
      parentChildren: {
        'e380918b-c409-40c0-a426-58ccc4411d53': ['39e17f2c-4bea-4f58-adc6-9f035fe56ce7'],
        '39e17f2c-4bea-4f58-adc6-9f035fe56ce7': ['a45ae47b-1c56-4b85-a339-a80fe45d406e'],
        '512a8d3f-c9d3-4a8a-8599-ae5d4716a67f': ['aaa962ba-745d-4d91-9f0e-df6ead6112fc'],
        '118e277a-1391-4410-9271-00b7c8f36d38': [
          'ec1f8d07-cfba-4863-a3ac-aeb03bc127a5',
          '2d835935-ba83-4d94-bf27-926774008432',
        ],
        '7ec71d99-3a38-467b-8df3-222f0b9d0534': [
          '512a8d3f-c9d3-4a8a-8599-ae5d4716a67f',
          '118e277a-1391-4410-9271-00b7c8f36d38',
        ],
        'a45ae47b-1c56-4b85-a339-a80fe45d406e': ['7ec71d99-3a38-467b-8df3-222f0b9d0534'],
        'c768ef20-01fe-4877-b670-9b6570be17be': ['e380918b-c409-40c0-a426-58ccc4411d53'],
      },
    },
  },
  team: {
    identifier: '234566',
    display: 'mpower bangladesh',
    patients: [],
    resourceVersion: '1.8',
    uuid: 'a00f5617-7778-4308-b585-40430c5fb223',
    subTeamRoles: [],
    auditInfo: {
      dateChanged: '2019-10-24T10:56:48.000+0600',
      creator: {
        display: 'admin',
        links: [
          {
            rel: 'self',
            uri:
              'http://localhost:8080/openmrs/ws/rest/v1/user/25d13252-ee54-11e9-b4f1-000c2993f8ea',
          },
        ],
        uuid: '25d13252-ee54-11e9-b4f1-000c2993f8ea',
      },
      dateCreated: '2019-10-20T11:08:47.000+0600',
      changedBy: {
        display: 'admin',
        links: [
          {
            rel: 'self',
            uri:
              'http://localhost:8080/openmrs/ws/rest/v1/user/25d13252-ee54-11e9-b4f1-000c2993f8ea',
          },
        ],
        uuid: '25d13252-ee54-11e9-b4f1-000c2993f8ea',
      },
    },
    person: {
      addresses: [],
      gender: 'M',
      display: 'mpower bangladesh',
      resourceVersion: '1.11',
      dead: false,
      uuid: 'de77b53a-72bb-4add-969d-e07553c2b4a3',
      auditInfo: {
        creator: {
          display: 'admin',
          links: [
            {
              rel: 'self',
              uri:
                'http://localhost:8080/openmrs/ws/rest/v1/user/25d13252-ee54-11e9-b4f1-000c2993f8ea',
            },
          ],
          uuid: '25d13252-ee54-11e9-b4f1-000c2993f8ea',
        },
        dateCreated: '2019-10-20T10:58:54.000+0600',
      },
      birthdateEstimated: false,
      deathdateEstimated: false,
      names: [
        {
          display: 'mpower bangladesh',
          givenName: 'mpower',
          familyName: 'bangladesh',
          resourceVersion: '1.8',
          voided: false,
          links: [
            {
              rel: 'self',
              uri:
                'http://localhost:8080/openmrs/ws/rest/v1/person/de77b53a-72bb-4add-969d-e07553c2b4a3/name/4373dd2e-19a4-4d07-b8c1-80a1e0964cf0',
            },
            {
              rel: 'full',
              uri:
                'http://localhost:8080/openmrs/ws/rest/v1/person/de77b53a-72bb-4add-969d-e07553c2b4a3/name/4373dd2e-19a4-4d07-b8c1-80a1e0964cf0?v=full',
            },
          ],
          uuid: '4373dd2e-19a4-4d07-b8c1-80a1e0964cf0',
        },
      ],
      attributes: [],
      voided: false,
      links: [
        {
          rel: 'self',
          uri:
            'http://localhost:8080/openmrs/ws/rest/v1/person/de77b53a-72bb-4add-969d-e07553c2b4a3',
        },
      ],
      preferredName: {
        display: 'mpower bangladesh',
        givenName: 'mpower',
        familyName: 'bangladesh',
        resourceVersion: '1.8',
        voided: false,
        links: [
          {
            rel: 'self',
            uri:
              'http://localhost:8080/openmrs/ws/rest/v1/person/de77b53a-72bb-4add-969d-e07553c2b4a3/name/4373dd2e-19a4-4d07-b8c1-80a1e0964cf0',
          },
          {
            rel: 'full',
            uri:
              'http://localhost:8080/openmrs/ws/rest/v1/person/de77b53a-72bb-4add-969d-e07553c2b4a3/name/4373dd2e-19a4-4d07-b8c1-80a1e0964cf0?v=full',
          },
        ],
        uuid: '4373dd2e-19a4-4d07-b8c1-80a1e0964cf0',
      },
    },
    voided: false,
    isDataProvider: false,
    locations: [
      {
        parentLocation: {
          parentLocation: {
            display: 'AYUBPUR',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/location/7ec71d99-3a38-467b-8df3-222f0b9d0534',
              },
            ],
            uuid: '7ec71d99-3a38-467b-8df3-222f0b9d0534',
          },
          uuid: '118e277a-1391-4410-9271-00b7c8f36d38',
          retired: false,
          links: [
            {
              rel: 'self',
              uri:
                'http://localhost:8080/openmrs/ws/rest/v1/location/118e277a-1391-4410-9271-00b7c8f36d38',
            },
            {
              rel: 'full',
              uri:
                'http://localhost:8080/openmrs/ws/rest/v1/location/118e277a-1391-4410-9271-00b7c8f36d38?v=full',
            },
          ],
          display: 'AYUBPUR:WARD 3',
          resourceVersion: '2.0',
          tags: [
            {
              display: 'Visit Location',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/locationtag/475d8fa3-5572-11e6-8be9-0800270d80ce',
                },
              ],
              uuid: '475d8fa3-5572-11e6-8be9-0800270d80ce',
            },
            {
              display: 'CHW',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/locationtag/ec5022af-d0cd-4b34-9fc7-3f860e84da36',
                },
              ],
              uuid: 'ec5022af-d0cd-4b34-9fc7-3f860e84da36',
            },
            {
              display: 'Login Location',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/locationtag/b8bbf83e-645f-451f-8efe-a0db56f09676',
                },
              ],
              uuid: 'b8bbf83e-645f-451f-8efe-a0db56f09676',
            },
          ],
          name: 'AYUBPUR:WARD 3',
          attributes: [],
          childLocations: [
            {
              display: 'AYUBPUR:WARD 3:GA 1',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/4abb85b6-9cdf-4708-a34b-d60ce96d20f7',
                },
              ],
              uuid: '4abb85b6-9cdf-4708-a34b-d60ce96d20f7',
            },
            {
              display: 'AYUBPUR:WARD 3:GA 2',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/17bb7d54-8ff8-4dec-8767-38ea327c040e',
                },
              ],
              uuid: '17bb7d54-8ff8-4dec-8767-38ea327c040e',
            },
            {
              display: 'AYUBPUR:WARD 3:GHA 1',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/98a188d2-c87a-483c-b6e1-c464ca559beb',
                },
              ],
              uuid: '98a188d2-c87a-483c-b6e1-c464ca559beb',
            },
            {
              display: 'AYUBPUR:WARD 3:GHA 2',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/ec1f8d07-cfba-4863-a3ac-aeb03bc127a5',
                },
              ],
              uuid: 'ec1f8d07-cfba-4863-a3ac-aeb03bc127a5',
            },
            {
              display: 'AYUBPUR:WARD 3:KA1',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/856f49ce-6c14-4e2e-9a45-17e7d60f8e16',
                },
              ],
              uuid: '856f49ce-6c14-4e2e-9a45-17e7d60f8e16',
            },
            {
              display: 'AYUBPUR:WARD 3:KA2',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/2d835935-ba83-4d94-bf27-926774008432',
                },
              ],
              uuid: '2d835935-ba83-4d94-bf27-926774008432',
            },
            {
              display: 'AYUBPUR:WARD 3:KHA 1',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/95107f67-03ef-4f27-ae9a-ead7e9817f84',
                },
              ],
              uuid: '95107f67-03ef-4f27-ae9a-ead7e9817f84',
            },
            {
              display: 'AYUBPUR:WARD 3:KHA 2',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/2dbf6e81-3c25-48f1-b7e6-ad6f4a059c64',
                },
              ],
              uuid: '2dbf6e81-3c25-48f1-b7e6-ad6f4a059c64',
            },
          ],
        },
        uuid: 'ec1f8d07-cfba-4863-a3ac-aeb03bc127a5',
        auditInfo: {
          creator: {
            display: 'zahin',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/user/1630f40a-7e92-45f6-b919-70464bf03a19',
              },
            ],
            uuid: '1630f40a-7e92-45f6-b919-70464bf03a19',
          },
          dateCreated: '2019-03-11T12:33:45.000+0600',
        },
        retired: false,
        links: [
          {
            rel: 'self',
            uri:
              'http://localhost:8080/openmrs/ws/rest/v1/location/ec1f8d07-cfba-4863-a3ac-aeb03bc127a5',
          },
        ],
        display: 'AYUBPUR:WARD 3:GHA 2',
        resourceVersion: '2.0',
        tags: [
          {
            display: 'Block',
            resourceVersion: '1.8',
            name: 'Block',
            retired: false,
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/locationtag/1d705ba9-c600-4aba-bd5f-9f2e4f083b9e',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/locationtag/1d705ba9-c600-4aba-bd5f-9f2e4f083b9e?v=full',
              },
            ],
            uuid: '1d705ba9-c600-4aba-bd5f-9f2e4f083b9e',
          },
        ],
        name: 'AYUBPUR:WARD 3:GHA 2',
        attributes: [],
        childLocations: [],
      },
      {
        parentLocation: {
          parentLocation: {
            display: 'AYUBPUR',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/location/7ec71d99-3a38-467b-8df3-222f0b9d0534',
              },
            ],
            uuid: '7ec71d99-3a38-467b-8df3-222f0b9d0534',
          },
          uuid: '512a8d3f-c9d3-4a8a-8599-ae5d4716a67f',
          retired: false,
          links: [
            {
              rel: 'self',
              uri:
                'http://localhost:8080/openmrs/ws/rest/v1/location/512a8d3f-c9d3-4a8a-8599-ae5d4716a67f',
            },
            {
              rel: 'full',
              uri:
                'http://localhost:8080/openmrs/ws/rest/v1/location/512a8d3f-c9d3-4a8a-8599-ae5d4716a67f?v=full',
            },
          ],
          display: 'AYUBPUR:WARD 1',
          resourceVersion: '2.0',
          tags: [
            {
              display: 'Visit Location',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/locationtag/475d8fa3-5572-11e6-8be9-0800270d80ce',
                },
              ],
              uuid: '475d8fa3-5572-11e6-8be9-0800270d80ce',
            },
            {
              display: 'CHW',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/locationtag/ec5022af-d0cd-4b34-9fc7-3f860e84da36',
                },
              ],
              uuid: 'ec5022af-d0cd-4b34-9fc7-3f860e84da36',
            },
            {
              display: 'Login Location',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/locationtag/b8bbf83e-645f-451f-8efe-a0db56f09676',
                },
              ],
              uuid: 'b8bbf83e-645f-451f-8efe-a0db56f09676',
            },
          ],
          name: 'AYUBPUR:WARD 1',
          attributes: [],
          childLocations: [
            {
              display: 'AYUBPUR:WARD 1:GA 1',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/aaa962ba-745d-4d91-9f0e-df6ead6112fc',
                },
              ],
              uuid: 'aaa962ba-745d-4d91-9f0e-df6ead6112fc',
            },
            {
              display: 'AYUBPUR:WARD 1:GA 2',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/42c732d4-40d4-4988-8a1b-049b3810f292',
                },
              ],
              uuid: '42c732d4-40d4-4988-8a1b-049b3810f292',
            },
            {
              display: 'AYUBPUR:WARD 1:GHA 1',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/e40d844d-8327-4ba6-9fd1-6c956dea8c35',
                },
              ],
              uuid: 'e40d844d-8327-4ba6-9fd1-6c956dea8c35',
            },
            {
              display: 'AYUBPUR:WARD 1:GHA 2',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/5aff07ac-90fe-4997-842a-d54116a317e4',
                },
              ],
              uuid: '5aff07ac-90fe-4997-842a-d54116a317e4',
            },
            {
              display: 'AYUBPUR:WARD 1:KA1',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/95922cf9-53a8-4df9-b490-1129c9cf1752',
                },
              ],
              uuid: '95922cf9-53a8-4df9-b490-1129c9cf1752',
            },
            {
              display: 'AYUBPUR:WARD 1:KA2',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/f46835a3-1044-49ef-86dd-fe69d506bd04',
                },
              ],
              uuid: 'f46835a3-1044-49ef-86dd-fe69d506bd04',
            },
            {
              display: 'AYUBPUR:WARD 1:KHA 1',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/d0882e89-1514-44ad-b86f-d25a92b70770',
                },
              ],
              uuid: 'd0882e89-1514-44ad-b86f-d25a92b70770',
            },
            {
              display: 'AYUBPUR:WARD 1:KHA 2',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/b26dec21-8868-4e55-a04d-4c148afc987f',
                },
              ],
              uuid: 'b26dec21-8868-4e55-a04d-4c148afc987f',
            },
          ],
        },
        uuid: 'aaa962ba-745d-4d91-9f0e-df6ead6112fc',
        auditInfo: {
          creator: {
            display: 'zahin',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/user/1630f40a-7e92-45f6-b919-70464bf03a19',
              },
            ],
            uuid: '1630f40a-7e92-45f6-b919-70464bf03a19',
          },
          dateCreated: '2019-03-11T12:33:30.000+0600',
        },
        retired: false,
        links: [
          {
            rel: 'self',
            uri:
              'http://localhost:8080/openmrs/ws/rest/v1/location/aaa962ba-745d-4d91-9f0e-df6ead6112fc',
          },
        ],
        display: 'AYUBPUR:WARD 1:GA 1',
        resourceVersion: '2.0',
        tags: [
          {
            display: 'Block',
            resourceVersion: '1.8',
            name: 'Block',
            retired: false,
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/locationtag/1d705ba9-c600-4aba-bd5f-9f2e4f083b9e',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/locationtag/1d705ba9-c600-4aba-bd5f-9f2e4f083b9e?v=full',
              },
            ],
            uuid: '1d705ba9-c600-4aba-bd5f-9f2e4f083b9e',
          },
        ],
        name: 'AYUBPUR:WARD 1:GA 1',
        attributes: [],
        childLocations: [],
      },
      {
        parentLocation: {
          parentLocation: {
            display: 'AYUBPUR',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/location/7ec71d99-3a38-467b-8df3-222f0b9d0534',
              },
            ],
            uuid: '7ec71d99-3a38-467b-8df3-222f0b9d0534',
          },
          uuid: '118e277a-1391-4410-9271-00b7c8f36d38',
          retired: false,
          links: [
            {
              rel: 'self',
              uri:
                'http://localhost:8080/openmrs/ws/rest/v1/location/118e277a-1391-4410-9271-00b7c8f36d38',
            },
            {
              rel: 'full',
              uri:
                'http://localhost:8080/openmrs/ws/rest/v1/location/118e277a-1391-4410-9271-00b7c8f36d38?v=full',
            },
          ],
          display: 'AYUBPUR:WARD 3',
          resourceVersion: '2.0',
          tags: [
            {
              display: 'Visit Location',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/locationtag/475d8fa3-5572-11e6-8be9-0800270d80ce',
                },
              ],
              uuid: '475d8fa3-5572-11e6-8be9-0800270d80ce',
            },
            {
              display: 'CHW',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/locationtag/ec5022af-d0cd-4b34-9fc7-3f860e84da36',
                },
              ],
              uuid: 'ec5022af-d0cd-4b34-9fc7-3f860e84da36',
            },
            {
              display: 'Login Location',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/locationtag/b8bbf83e-645f-451f-8efe-a0db56f09676',
                },
              ],
              uuid: 'b8bbf83e-645f-451f-8efe-a0db56f09676',
            },
          ],
          name: 'AYUBPUR:WARD 3',
          attributes: [],
          childLocations: [
            {
              display: 'AYUBPUR:WARD 3:GA 1',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/4abb85b6-9cdf-4708-a34b-d60ce96d20f7',
                },
              ],
              uuid: '4abb85b6-9cdf-4708-a34b-d60ce96d20f7',
            },
            {
              display: 'AYUBPUR:WARD 3:GA 2',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/17bb7d54-8ff8-4dec-8767-38ea327c040e',
                },
              ],
              uuid: '17bb7d54-8ff8-4dec-8767-38ea327c040e',
            },
            {
              display: 'AYUBPUR:WARD 3:GHA 1',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/98a188d2-c87a-483c-b6e1-c464ca559beb',
                },
              ],
              uuid: '98a188d2-c87a-483c-b6e1-c464ca559beb',
            },
            {
              display: 'AYUBPUR:WARD 3:GHA 2',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/ec1f8d07-cfba-4863-a3ac-aeb03bc127a5',
                },
              ],
              uuid: 'ec1f8d07-cfba-4863-a3ac-aeb03bc127a5',
            },
            {
              display: 'AYUBPUR:WARD 3:KA1',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/856f49ce-6c14-4e2e-9a45-17e7d60f8e16',
                },
              ],
              uuid: '856f49ce-6c14-4e2e-9a45-17e7d60f8e16',
            },
            {
              display: 'AYUBPUR:WARD 3:KA2',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/2d835935-ba83-4d94-bf27-926774008432',
                },
              ],
              uuid: '2d835935-ba83-4d94-bf27-926774008432',
            },
            {
              display: 'AYUBPUR:WARD 3:KHA 1',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/95107f67-03ef-4f27-ae9a-ead7e9817f84',
                },
              ],
              uuid: '95107f67-03ef-4f27-ae9a-ead7e9817f84',
            },
            {
              display: 'AYUBPUR:WARD 3:KHA 2',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/location/2dbf6e81-3c25-48f1-b7e6-ad6f4a059c64',
                },
              ],
              uuid: '2dbf6e81-3c25-48f1-b7e6-ad6f4a059c64',
            },
          ],
        },
        uuid: '2d835935-ba83-4d94-bf27-926774008432',
        auditInfo: {
          creator: {
            display: 'zahin',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/user/1630f40a-7e92-45f6-b919-70464bf03a19',
              },
            ],
            uuid: '1630f40a-7e92-45f6-b919-70464bf03a19',
          },
          dateCreated: '2019-03-11T12:33:40.000+0600',
        },
        retired: false,
        links: [
          {
            rel: 'self',
            uri:
              'http://localhost:8080/openmrs/ws/rest/v1/location/2d835935-ba83-4d94-bf27-926774008432',
          },
        ],
        display: 'AYUBPUR:WARD 3:KA2',
        resourceVersion: '2.0',
        tags: [
          {
            display: 'Block',
            resourceVersion: '1.8',
            name: 'Block',
            retired: false,
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/locationtag/1d705ba9-c600-4aba-bd5f-9f2e4f083b9e',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/locationtag/1d705ba9-c600-4aba-bd5f-9f2e4f083b9e?v=full',
              },
            ],
            uuid: '1d705ba9-c600-4aba-bd5f-9f2e4f083b9e',
          },
        ],
        name: 'AYUBPUR:WARD 3:KA2',
        attributes: [],
        childLocations: [],
      },
    ],
    links: [
      {
        rel: 'self',
        uri:
          'http://localhost:8080/openmrs/ws/rest/v1/team/teammember/a00f5617-7778-4308-b585-40430c5fb223',
      },
    ],
    subTeams: [],
  },
  time: {
    time: '2020-01-08 18:37:29',
    timeZone: 'Asia/Dhaka',
  },
  user: {
    username: 'mpower',
    status: 'mpower bangladesh',
    roles: ['System Developer', 'Provider'],
    preferredName: 'mpower bangladesh',
    baseEntityId: 'f9699494-9d53-4646-b522-ee96a16575da',
    attributes: {
      _PERSON_UUID: 'de77b53a-72bb-4add-969d-e07553c2b4a3',
    },
    voided: false,
  },
};
export default treeData;
