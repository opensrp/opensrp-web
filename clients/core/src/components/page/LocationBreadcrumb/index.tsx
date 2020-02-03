import React from 'react';
import './index.css';
import { Location, LocationHierarchy, RenameLocationProperty } from '../../../store/ducks/locations';
import { Breadcrumb, BreadcrumbItem, ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Select from 'react-select';
import SeamlessImmutable from 'seamless-immutable';

const buttonDropdownStyle = {
    backgroundColor: 'white',
    color: '#2297d6',
    border: '0px',
    fontSize: '12px',
};

const selectStyle = {
    control: (base: any) => ({
        ...base,
        border: 0,
        // This line disable the blue border
        boxShadow: 'none',
    }),
};

interface LocationBreadcrumbState {
    breadcrumItems: Location[];
    dropdownOpen: boolean;
}

interface LocationBreadcrumbProps {
    locations: LocationHierarchy;
}

const initialState: LocationBreadcrumbState = {
    breadcrumItems: [],
    dropdownOpen: false,
};

const defaultProps: LocationBreadcrumbProps = {
    locations: {
        locationsHierarchy: {
            map: {},
        },
    },
};

class LocationBreadcrumb extends React.Component<LocationBreadcrumbProps, LocationBreadcrumbState> {
    public static defaultProps: LocationBreadcrumbProps = defaultProps;
    constructor(props: LocationBreadcrumbProps) {
        super(props);
        this.state = initialState;
    }
    componentDidMount() {
        console.log('location breadcrumb mounted');
        this.setState({
            breadcrumItems: [RenameLocationProperty(this.props.locations.locationsHierarchy, 'map', 'children')],
        });
    }
    toggle = () => {
        const _state = this.state;
        this.setState({ ..._state, dropdownOpen: !_state.dropdownOpen });
    };
    addBreadcrumItem = (position: number, item: Location): void => {
        this.setState({
            ...this.state,
            breadcrumItems: [...this.state.breadcrumItems.splice(0, ++position), item],
        });
    };
    getOptions = (childNodes: any) => {
        return childNodes.map((b: Location) => {
            return {
                label: b.label,
                value: b,
            };
        });
    };
    getChildren = (location: Location) => {
        if (location.children === undefined) return [];
        return Object.keys(location.children).map((item: string, index: number) => {
            return location.children![item];
        });
    };
    render() {
        return (
            <div className="app-breadcrumb">
                <Breadcrumb className="custom-breadcrumb">
                    {this.state.breadcrumItems.map((item: Location, index: number) => {
                        return (
                            <BreadcrumbItem key={index}>
                                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle caret style={buttonDropdownStyle}>
                                        {item.label}
                                    </DropdownToggle>
                                    <DropdownMenu style={{ width: '250px', fontSize: '13px' }}>
                                        <div style={{ paddingLeft: '8px' }}> Change option </div>
                                        <Select
                                            value={null}
                                            autoFocus
                                            menuIsOpen
                                            onChange={(e: any) => {
                                                this.addBreadcrumItem(index, e.value);
                                                this.toggle();
                                            }}
                                            styles={selectStyle}
                                            options={this.getOptions(this.getChildren(item))}
                                        />
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </BreadcrumbItem>
                        );
                    })}
                </Breadcrumb>
            </div>
        );
    }
}

export default LocationBreadcrumb;
