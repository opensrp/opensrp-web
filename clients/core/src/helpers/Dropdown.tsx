import sampleData from '../components/page/BreadCrumb/sample-data';

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

    const rootMap = sampleData.locations.locationsHierarchy.map;
    const rootLocation = rootMap['c768ef20-01fe-4877-b670-9b6570be17be'];
    locations.push({
        parentHistory: '',
        name: rootLocation.label,
        id: rootLocation.id,
    });

    function goDeep(ob: any, parent: any) {
        if (ob.children === undefined) return;
        const childList = Object.keys(ob.children);
        console.log('ob ---> ', ob, ' childList: ', childList);
        for (const i of childList) {
            locations.push({
                parentHistory: parent,
                id: ob.children[i].id,
                name: ob.children[i].label,
            });
            goDeep(ob.children[i], `${parent}, ${ob.children[i].id}`);
        }
    }
    goDeep(rootLocation, rootLocation.id);

    console.log('locations in a single level: --> ', locations);
    return locations.map((l: any) => {
        return {
            value: l.parentHistory,
            label: l.name,
        };
    });
};
