import React, { useState } from 'react';

import './index.css';
import { Location } from '../../../store/ducks/locations';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Select from 'react-select';

interface BreadcrumbState {
    breadcrumItems: any;
}

const initialState: BreadcrumbState = {
    breadcrumItems: [],
};

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
