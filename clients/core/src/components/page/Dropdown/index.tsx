import React, { Component } from 'react';
import Select from 'react-select';

export interface DropdownOption {
    value: string;
    label: string;
}

export interface DropdownState {
    isSearchable: boolean;
}

export interface DropdownProps {
    selectCallBack(value: string): void;
    dropdownOptions: DropdownOption[];
    placeholder: string;
}

const dropdownDefaultProps: DropdownProps = {
    selectCallBack: value => value,
    placeholder: 'Select',
    dropdownOptions: [],
};

const styles = {
    control: (base: any) => ({
        ...base,
        border: 0,
        // This line disable the blue border
        boxShadow: 'none',
    }),
};

export default class Dropdown extends Component<DropdownProps, DropdownState> {
    public static defaultProps: DropdownProps = dropdownDefaultProps;
    state = {
        isSearchable: false,
    };

    render() {
        const { isSearchable } = this.state;
        const { placeholder, dropdownOptions } = this.props;
        return (
            <div id="custom-dropdown">
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    onChange={(e: any) => this.props.selectCallBack(e.value)}
                    placeholder={placeholder}
                    isSearchable={isSearchable}
                    options={dropdownOptions}
                    styles={styles}
                />
            </div>
        );
    }
}
