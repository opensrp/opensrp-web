import ListView from '@onaio/list-view';
import React, { useEffect, MouseEvent, useState, ChangeEvent } from 'react';
import './index.css';
import { Store } from 'redux';
import reducer, { Setting, getLocSettings, reducerName, fetchLocSettings } from '../store/ducks/openSrpDux';
import { connect, useDispatch } from 'react-redux';
import { allSettings } from '../store/ducks/openSrpDux/tests/fixtures';
import reducerRegistry from '@onaio/redux-reducer-registry';
import store from '../store';

reducerRegistry.register(reducerName, reducer);
const locId = '75af7700-a6f2-448c-a17d-816261a7749a';

interface PropsInterface {
    locSettings: Setting[];
    fetchSettings: typeof fetchLocSettings;
}

const EditSetings = (props: PropsInterface) => {
    const { locSettings, fetchSettings } = props;

    function checkSettings() {
        if (!locSettings.length) {
            return fetchSettings(allSettings, locId);
        }
    }

    useEffect(() => {
        checkSettings();
    }, []);

    const [editRow, toggleEditRow] = useState(false);
    const [checked, toggleChecked] = useState(false);
    const currentLoc = 'Malawi';

    const openEditModal = (e: MouseEvent, row: Setting) => {
        e.preventDefault();
        fetchSettings([{ ...row, editing: !row.editing }], locId);
    };

    const changeSetting = (e: MouseEvent, row: any, value: boolean) => {
        e.preventDefault();
        if (value === row.value) {
            return false;
        }
        fetchSettings([{ ...row, value }], locId);
    };

    const loadLocsettings = (e: MouseEvent, location: any) => {
        e.preventDefault();
    };

    const listViewProps = {
        data: locSettings.map(row => {
            return [
                row.label,
                row.description,
                <p key={row.key}>{row.value ? 'Yes' : 'No'}</p>,
                row.inherited_from?.trim() || '_',
                <div className="popup" key={row.key}>
                    <a href="#" onClick={e => openEditModal(e, row)}>
                        Edit
                    </a>
                    <div className={`popuptext ${row.editing ? 'show' : ''}`}>
                        <div onClick={e => changeSetting(e, row, true)}>
                            <span className={row.value ? 'check' : 'empty-check'} />{' '}
                            <span>
                                Set to {'Yes'} {checked}{' '}
                            </span>
                        </div>
                        <div onClick={e => changeSetting(e, row, false)}>
                            <span className={row.value ? 'empty-check' : 'check'} /> <span>Set to {'No'}</span>
                        </div>
                        <div className="inherit-from">
                            <span className={row.inherited_from?.trim() ? 'check' : 'empty-check'} />
                            Inherit setting
                        </div>
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

/** map dispatch to props */
const mapDispatchToProps = { fetchSettings: fetchLocSettings };

/** Connected EditSetings component */
const mapStateToProps = (state: Partial<Store>) => {
    const locSettings: Setting[] = getLocSettings(state, locId);
    return {
        locSettings,
    };
};

const ConnectedEditSetings = connect(mapStateToProps, mapDispatchToProps)(EditSetings);

export default ConnectedEditSetings;
