import React, { useState } from 'react';
import sampleData from './sample-data';
import './style.css';
import { ComponentProps, Location } from './model/models';
import {
  Breadcrumb,
  BreadcrumbItem,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import Select from 'react-select';

let buttonDropdownStyle = {
  backgroundColor: 'white',
  color: '#2297d6',
  border: '0px',
  fontSize: '12px'
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
        <DropdownMenu style={{ width: '250px' }}>
          <div style={{ paddingLeft: '8px' }}> Change option </div>
          <Select
            value={null}
            autoFocus
            menuIsOpen
            onChange={(e: any) => {
              props.addBreadcrumItem(e.value);
              this.toggle();
            }}
            options={this.getOptions()}
          />
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export const renameProperty = (ob: any = {}, oldKey: string = '', newKey: string = '') => {
  ob[newKey] = ob[oldKey];
  delete ob[oldKey];
  return ob;
};

const initialState = {
  posts: [],
  breadcrumItems: [renameProperty(sampleData.locations.locationsHierarchy, 'map', 'children')],
};

class LocationBreadcrumb extends React.Component<{}, any> {
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
