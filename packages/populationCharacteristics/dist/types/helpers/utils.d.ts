import { MouseEvent, ReactElement } from 'react';
import { Setting } from '../ducks/settings';
import { EditSettingLabels, SettingValue } from './types';
interface PostData extends Partial<Setting> {
    _id: string;
    identifier: string;
}
/**
 *
 * @param {Setting} data
 * @param {boolean} value
 */
export declare const preparePutData: (data: Setting, value: string) => PostData;
export declare const labels: EditSettingLabels;
/** format table data function props interface */
interface EditSettingsButtonProps {
    changeSetting: (event: MouseEvent<HTMLDivElement>, setting: Setting, value: SettingValue) => void;
    editLabel: string;
    inheritSettingsLabel: string;
    openEditModal: (event: MouseEvent<HTMLAnchorElement>, setting: Setting) => void;
    row: Setting;
    setToNoLabel: string;
    setToYesLabel: string;
    value: boolean;
    showInheritSettingsLabel: boolean;
}
interface ClickOutsideProps {
    children: ReactElement;
    onClick: any;
}
export declare const ClickOutside: ({ children, onClick }: ClickOutsideProps) => JSX.Element;
export declare const EditSettingsButton: (props: EditSettingsButtonProps) => JSX.Element;
export {};
