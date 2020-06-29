import getLocationData from '../components/page/BreadCrumb/sample-data';

/** default options for genders */
export const genderOptions: DropdownOption[] = [
    { value: '', label: 'All' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' },
];

/** interface for dropdown option */
export interface DropdownOption {
    value: string;
    label: string;
}

export const getLocationDropdownOption = () => {
    const locations = [];

    // console.log(getLocationData());
    const rootMap = getLocationData().locations.locationsHierarchy.map;
    const rootLocation = rootMap[Object.keys(rootMap)[0]];
    locations.push({
        parentHistory: '',
        name: rootLocation.label,
        id: rootLocation.id,
    });

    // recursion function to get all the location in same level.
    function goDeep(ob: any, parent: any) {
        //base condition
        if (ob.children === undefined) return;
        const childList = Object.keys(ob.children);
        console.log('ob ---> ', ob, ' childList: ', childList);

        //iterating over each child and attach it's parent ids in comma separate string.
        for (const i of childList) {
            locations.push({
                parentHistory: parent,
                id: ob.children[i].id,
                name: ob.children[i].label,
            });
            // going deep down to find its child
            goDeep(ob.children[i], `${parent},${ob.children[i].id}`);
        }
    }
    goDeep(rootLocation, rootLocation.id);

    console.log('locations in a single level: --> ', locations);
    const locationOptions = locations.map((l: any) => {
        return {
            value: `${l.id},${l.parentHistory}`,
            label: l.name,
        };
    });

    locationOptions.splice(0, 0, { value: '', label: 'All' });
    return locationOptions;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNodeChildLocation = (ob: any, childIds: string) => {
    if (ob.children === undefined) return childIds;
    const childList = Object.keys(ob.children);
    for (const i of childList) {
        childIds = ob.children[i].id + ',' + getNodeChildLocation(ob.children[i], childIds);
    }
    return childIds;
};
