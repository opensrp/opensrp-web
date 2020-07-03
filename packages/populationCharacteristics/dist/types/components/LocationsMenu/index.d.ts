import { MouseEvent } from 'react';
import { LocChildren } from '../../ducks/locations';
/** location menu dafault props interface */
interface DefaultProps {
    locationDetails: LocChildren;
    activeLocationId: string;
    showLocPopUp: string;
    popLocPopup: (e: MouseEvent, id: string) => any;
    loadLocsettings: (e: MouseEvent, activeLocId: string) => any;
    isLast: boolean;
}
/** simple component for generating location menu */
export declare const LocationMenu: (props: DefaultProps) => JSX.Element;
export {};
