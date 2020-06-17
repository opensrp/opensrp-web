export interface ComponentProps {
    name?: string;
    childNodes: any;
    addBreadcrumItem(item: Location): any;
}

export interface Location {
    id: string;
    label: string;
    node: {
        locationId: string;
        name: string;
        parentLocation?: {
            locationId: string;
            name: string;
            voided: boolean;
            parentLocation?: {
                locationId: string;
                name: string;
                voided: boolean;
            };
        };
        tags: string[];
        voided: boolean;
    };
    children?: LocationNode;
}

/** A single node for location hierarchy */
export interface LocationNode {
    [key: string]: Location;
}

/** Interface for location object */
export interface LocationHierarchy {
    locationsHierarchy: {
        map: LocationNode;
    };
}
