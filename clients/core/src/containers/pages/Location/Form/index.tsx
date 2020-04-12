import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../../components/page/Loading';
import '../../../../assets/styles/dropdown.css';
import { generateOptions } from '../../../../services/opensrp';
import '@opensrp/opensrp-table/dist/index.css';
import { DropdownOption } from '../../../../helpers/Dropdown';
import Select from 'react-select';
import './locationForm.css';

export const locationOption: DropdownOption[] = [
    { value: '', label: 'All' },
    { value: 'dhaka', label: 'Dhaka' },
    { value: 'chittagong', label: 'Chittagong' },
    { value: 'sylhet', label: 'Sylhet' },
];

interface LocationFormState {
    selectedLocation: DropdownOption;
}

const defaultLocationState: LocationFormState = {
    selectedLocation: { value: '', label: 'All' },
};

/** Display the location form  */
class LocationForm extends React.Component<any, LocationFormState> {
    constructor(props: any) {
        super(props);
        this.state = defaultLocationState;
    }
    public render() {
        return (
            <div>
                <Row>
                    <Col>
                        <h3>Add New Location</h3>
                    </Col>
                </Row>
                <div className="form-background">
                    <Row>identifier</Row>
                    <Row className="field-row">
                        <input type="text" className="input-field" />
                    </Row>
                    <Row>Location Name</Row>
                    <Row className="field-row">
                        <input type="text" className="input-field" />
                    </Row>
                    <Row>Location Description</Row>
                    <Row className="field-row">
                        <input type="text" className="input-field" />
                    </Row>
                    <Row>Tag</Row>
                    <Row className="field-row">
                        <Select
                            value={this.state.selectedLocation}
                            classNamePrefix="select"
                            className="basic-single"
                            onChange={(e: any) => console.log(e)}
                            options={locationOption}
                        />
                    </Row>
                    <Row>Parent Location</Row>
                    <Row className="field-row">
                        <Select
                            value={this.state.selectedLocation}
                            classNamePrefix="select"
                            className="basic-single"
                            onChange={(e: any) => console.log(e)}
                            options={locationOption}
                        />
                    </Row>
                </div>
            </div>
        );
    }
}

export { LocationForm };
