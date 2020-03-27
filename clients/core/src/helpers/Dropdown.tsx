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
