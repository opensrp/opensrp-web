import React from 'react';
import Select from 'react-select';

/** interface for the dropdown option */
export interface DropdownOption {
    value: string;
    label: string;
}

/** props interface for the dropdown */
export interface DropdownProps {
    selectCallBack(value: string): void;
    dropdownOptions: DropdownOption[];
    placeholder: string;
    isSearchable?: boolean;
}

/** default props for the Dropdown */
const dropdownDefaultProps: DropdownProps = {
    selectCallBack: () => {},
    placeholder: 'Select',
    dropdownOptions: [],
    isSearchable: false,
};

/** Custom style for react-select */
const styles = {
    control: (base: any) => ({
        ...base,
        border: 0,
        // This line disable the blue border
        boxShadow: 'none',
    }),
};

const Dropdown = function(props: DropdownProps = dropdownDefaultProps) {
    const { placeholder, dropdownOptions, isSearchable } = props;
    return (
        <div id="custom-dropdown">
            <Select
                className="basic-single"
                classNamePrefix="select"
                onChange={(e: ValueType) => props.selectCallBack(e.value)}
                placeholder={placeholder}
                isSearchable={isSearchable}
                options={dropdownOptions}
                styles={styles}
            />
        </div>
    );
};

export default Dropdown;
