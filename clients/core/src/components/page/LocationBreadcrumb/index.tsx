import React, { useState } from 'react';

import './index.css';
import { Location } from '../../../store/ducks/locations';
import { Breadcrumb, BreadcrumbItem, ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Select from 'react-select';

export interface ComponentProps {
    name?: string;
    childNodes: any;
    addBreadcrumItem(item: Location): any,
}

/* interface for locations  **/
interface BreadcrumbState {
    breadcrumItems: any;
}

const buttonDropdownStyle = {
    backgroundColor: 'white',
    color: '#2297d6',
    border: '0px',
};

/* probable searched items will appear as list **/
const Dropdown = (props: ComponentProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret style={buttonDropdownStyle}>
                {props.name}
            </DropdownToggle>
            <DropdownMenu style={{ width: '250px' }}>
                <div style={{ paddingLeft: '8px' }}> Change option </div>
                <SearchApp
                    {...props}
                    addBreadcrumItem={(item: any) => {
                        toggle();
                        props.addBreadcrumItem(item);
                    }}
                />
            </DropdownMenu>
        </ButtonDropdown>
    );
};

const initialState: BreadcrumbState = {
    breadcrumItems: [],
};

/* Location breadcrumb. it will be used to filter data by locations **/
class LocationBreadcrumb extends React.Component<{}, BreadcrumbState> {
    constructor(props: {}) {
        super(props);
        this.state = initialState;
    }

    addBreadcrumItem = (position: number, item: Location): void => {
        this.setState({
            ...this.state,
            breadcrumItems: [...this.state.breadcrumItems.splice(0, ++position), item],
        });
    };

    getChildren = (ob: Location) => {
        if (ob.children === undefined) return [];
        return Object.keys(ob.children).map((item: string, index: number) => {
            return ob.children![item];
        });
    };

    render() {
        return (
            <div className="App">
                <Breadcrumb className="custom-breadcrumb">
                    {this.state.breadcrumItems.map((item: Location, index: number) => {
                        console.log('breadcrumb item', item);
                        return (
                            <BreadcrumbItem key={index}>
                                <Dropdown
                                    name={item.label}
                                    childNodes={this.getChildren(item)}
                                    addBreadcrumItem={(item: Location) => this.addBreadcrumItem(index, item)}
                                />
                            </BreadcrumbItem>
                        );
                    })}
                </Breadcrumb>
            </div>
        );
    }
}

export default LocationBreadcrumb;
