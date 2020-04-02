import ListView from '@onaio/list-view';
import reducerRegistry from '@onaio/redux-reducer-registry';
import React, { useEffect, MouseEvent, useState, ChangeEvent } from 'react';
import './index.css';

const EditSetings = () => {
    const [editRow, toggleEditRow] = useState(false);
    const [checked, toggleChecked] = useState(false);
    const currentLoc = 'Malawi';

    const setting = {
        description:
            'The proportion of Hepatitis B surface antigen (HBsAg) seroprevalance in the general population is 2% or higher.',
        label: 'Hep B prevalence is intermediate (2% or higher) or high (5% or higher)',
        value: 'true',
        key: 'pop_hepb',
        type: 'SettingConfiguration',
        identifier: 'population_characteristics',
        teamId: '<uuid> only required if the settings are tied to a team',
        team: '<team name> only required if the settings are tied to a team',
        providerId: '<uuid> only required is the settings are tied to a provider',
        locationId: '<uuid> the location the setting is being adapted for',
    };

    const openEditModal = (e: MouseEvent, row: any) => {
        e.preventDefault();
        toggleEditRow(!editRow);
    };

    const changeSetting = (e: ChangeEvent, row: any, isChecked: boolean) => {
        e.preventDefault();
        toggleChecked(isChecked);
    };

    const loadLocsettings = (e: MouseEvent, location: any) => {
        e.preventDefault();
    };

    const data = [{ name: 'eric', desc: 12 }];
    // eslint-disable-next-line no-unused-vars
    const AllSettings = data.map(_ => setting);

    const listViewProps = {
        data: AllSettings.map(row => {
            return [
                row.label,
                row.description,
                '-',
                <p key={row.key}>{row.value ? 'Yes' : 'No'}</p>,
                <div className="popup" key={row.key}>
                    <a href="#" onClick={e => openEditModal(e, row)}>
                        Edit
                    </a>
                    <div className={`popuptext ${editRow ? 'show' : ''}`}>
                        <input
                            key={row.key}
                            type="checkbox"
                            value={row.key}
                            checked={checked}
                            onChange={e => changeSetting(e, row, true)}
                        />
                        <span>
                            Set to {'Yes'} {checked}
                        </span>{' '}
                        <br />
                        <input type="checkbox" checked={!checked} onChange={e => changeSetting(e, row, false)} />{' '}
                        <span>Set to {'No'}</span>
                    </div>
                </div>,
            ];
        }),
        headerItems: ['Name', ` Description`, 'Setting', 'Inherited from', 'Edit'],
        tableClass: 'table table-striped',
    };
    return (
        <div>
            <div className="title">
                <h4>Server Settings ({currentLoc})</h4>
            </div>
            <div className="box">
                <div className="locations" onClick={e => loadLocsettings(e, {})}>
                    <span>Malawi</span> <span className="drop-down" />/
                </div>
                <div className="locations">
                    <span>Malawi</span> <span className="drop-down" />
                </div>
            </div>
            <ListView {...listViewProps} />
        </div>
    );
};

export default EditSetings;
