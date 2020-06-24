import React, { useState } from 'react';
import sampleData from './sample-data';
import './style.css';
import { ComponentProps, Location } from './model/models';
import { Breadcrumb, BreadcrumbItem, ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Select from 'react-select';

const buttonDropdownStyle = {
    backgroundColor: 'white',
    color: '#2297d6',
    border: '0px',
    fontSize: '12px',
};

// eslint-disable-next-line @typescript-eslint/camelcase
const select_style = {
    control: (base: any) => ({
        ...base,
        border: 0,
        // This line disable the blue border
        boxShadow: 'none',
    }),
};

class LocationDropdown extends React.Component<ComponentProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            dropdownOpen: false,
        };
    }

    toggle = () => {
        const _state = this.state;
        this.setState({ ..._state, dropdownOpen: !_state.dropdownOpen });
    };

    getOptions = () => {
        return this.props.childNodes.map((b: Location) => {
            return {
                label: b.label,
                value: b,
            };
        });
    };

    render() {
        const props = this.props;
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret style={buttonDropdownStyle}>
                    {props.name}
                </DropdownToggle>
                <DropdownMenu style={{ width: '250px', fontSize: '13px' }}>
                    <div style={{ paddingLeft: '8px' }}> Change option </div>
                    <Select
                        value={null}
                        autoFocus
                        menuIsOpen
                        onChange={(e: any) => {
                            props.addBreadcrumItem(e.value);
                            this.toggle();
                        }}
                        styles={select_style}
                        options={this.getOptions()}
                    />
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}

export const renameProperty = (obj: any = {}, oldKey = '', newKey = '') => {
    const ob = JSON.parse(JSON.stringify(obj));
    ob['label'] = 'Country';
    ob[newKey] = ob[oldKey];
    delete ob[oldKey];
    return ob;
};

const initialState = {
    posts: [],
    breadcrumItems: [],
};

interface LocationBreadcrumbProps {
    itemChanged(loc: Location): void;
    reset: boolean;
}

class LocationBreadcrumb extends React.Component<LocationBreadcrumbProps, any> {
    constructor(props: any) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        console.log('location breadcrumb mounted');
        this.setState({
            breadcrumItems: [renameProperty(sampleData.locations.locationsHierarchy, 'map', 'children')],
        });
    }
    componentDidUpdate(prevProps: LocationBreadcrumbProps) {
        if (this.props.reset === true && prevProps.reset === false) {
            this.setState({
                breadcrumItems: [renameProperty(sampleData.locations.locationsHierarchy, 'map', 'children')],
            });
        }
    }

    addBreadcrumItem = (position: number, item: Location): void => {
        this.setState({
            ...this.state,
            breadcrumItems: [...this.state.breadcrumItems.splice(0, ++position), item],
        });
        this.props.itemChanged(item);
    };

    getChildren = (ob: Location) => {
        if (ob.children === undefined) return [];
        return Object.keys(ob.children).map((item: string, index: number) => {
            return ob.children![item];
        });
    };

    render() {
        return (
            <div className="app-breadcrumb">
                <Breadcrumb className="custom-breadcrumb">
                    {this.state.breadcrumItems.map((item: Location, index: number) => {
                        return (
                            <BreadcrumbItem key={index}>
                                <LocationDropdown
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