import React, { Component, Fragment } from 'react';
import Select from 'react-select';

const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' },
];

export interface GenderDropdownState {
    isSearchable: boolean;
}

export interface GenderDropdownProps {
    selectCallBack(gender: string): void;
}

const genderDropdownDefaultProps: GenderDropdownProps = {
    selectCallBack: gender => gender,
};

const styles = {
    control: (base: any) => ({
        ...base,
        border: 0,
        // This line disable the blue border
        boxShadow: 'none',
    }),
};

export default class GenderDropdown extends Component<GenderDropdownProps, GenderDropdownState> {
    public static defaultProps: GenderDropdownProps = genderDropdownDefaultProps;
    state = {
        isSearchable: false,
    };

    render() {
        const { isSearchable } = this.state;
        return (
            <Fragment>
                <Select
                    onChange={(e: any) => this.props.selectCallBack(e.value)}
                    placeholder="Select Gender"
                    isSearchable={isSearchable}
                    options={genderOptions}
                    styles={styles}
                />
            </Fragment>
        );
    }
}
