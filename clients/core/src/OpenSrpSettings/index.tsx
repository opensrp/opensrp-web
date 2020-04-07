import ListView from '@onaio/list-view';
import React, { useEffect, MouseEvent, useState } from 'react';
import './index.css';
import { Store } from 'redux';
import settingsReducer, {
    Setting,
    getLocSettings,
    reducerName as settingsReducerName,
    fetchLocSettings,
} from '../store/ducks/openSrpDux';
import { connect, useDispatch } from 'react-redux';
import { allSettings } from '../store/ducks/openSrpDux/tests/fixtures';
import reducerRegistry from '@onaio/redux-reducer-registry';
import locationReducer, {
    fetchLocs,
    getActiveLocId,
    getSelectedLocs,
    getLocDetails,
    LocChildren,
    reducerName as LocsReducerName,
    LocPayload,
    getDefaultLocId,
} from '../store/ducks/openSrpDux/locations';
import { locHierarchy } from '../store/ducks/openSrpDux/locations/tests/fixtures';
import { LocationMenu } from './helpers/LocationsMenu';

reducerRegistry.register(settingsReducerName, settingsReducer);
reducerRegistry.register(LocsReducerName, locationReducer);

interface DefaultProps {
    locSettings: Setting[];
    fetchSettings: typeof fetchLocSettings;
    fetchLococations: typeof fetchLocs;
    activeLocationId: string;
    selectedLocations: string[];
    locationDetails: LocChildren | {};
    state: Partial<Store>;
    defaultLocId: string;
}

const locId = '75af7700-a6f2-448c-a17d-816261a7749a';

const EditSetings = (props: DefaultProps) => {
    const {
        locSettings,
        fetchSettings,
        fetchLococations,
        activeLocationId,
        selectedLocations,
        locationDetails,
        defaultLocId,
        state,
    } = props;

    const [showLocPopUp, changeLocPopup] = useState('');

    function FetchLocSettings(currentLocId: string, update = false) {
        if ((!locSettings.length && currentLocId) || update) {
            // code block to fetch settings from Api should enter here then dispatch the line below
            return fetchSettings(allSettings, currentLocId);
        }
    }

    function checkLocations() {
        if (!activeLocationId && !Object.keys(locationDetails).length) {
            // code block to fetch locations from Api should enter here then dispatch the line below
            fetchLococations(locHierarchy);
            return FetchLocSettings(locId);
        }
        FetchLocSettings(locId);
    }

    useEffect(() => {
        checkLocations();
    }, []);

    const currentLoc = 'Malawi';

    const openEditModal = (e: MouseEvent, row: Setting) => {
        e.preventDefault();
        fetchSettings([{ ...row, editing: !row.editing }], activeLocationId);
    };

    const changeSetting = (e: MouseEvent, row: any, value: boolean) => {
        e.preventDefault();
        if (value === row.value) {
            return false;
        }
        // code block for updating settings in the Api should enter here then dispatch the line below
        fetchSettings([{ ...row, value }], activeLocationId);
    };

    // update active location
    const popLocPopup = (e: MouseEvent, id: string) => {
        e.preventDefault();
        if (showLocPopUp === id) {
            changeLocPopup('');
        } else {
            changeLocPopup(id);
        }
    };

    // load settings of selected location
    const loadLocsettings = (e: MouseEvent, activeLocId: string) => {
        e.preventDefault();
        const selectedLocs = [...selectedLocations, activeLocId];
        const locSettings = getLocSettings(state, activeLocId);
        if (!locSettings.length) {
            FetchLocSettings(activeLocId, true);
        }
        const data: LocPayload = {
            locationsHierarchy: {
                map: {},
                parentChildren: {},
                activeLocId,
                selectedLocs,
                defaultLocId: defaultLocId,
            },
        };
        fetchLococations(data);
        changeLocPopup('');
    };

    // prepare location menu
    const locationMenu = [];
    if (selectedLocations.length && Object.keys(locationDetails).length) {
        let locDetails = { ...(locationDetails as LocChildren) };
        let LocMenuProps = {
            locationDetails: locDetails,
            activeLocationId,
            showLocPopUp,
            popLocPopup,
            loadLocsettings,
        };
        locationMenu.push(<LocationMenu key={locDetails.id} {...LocMenuProps} />);
        for (let i = 1; i < selectedLocations.length; i++) {
            if (locDetails.children) {
                locDetails = locDetails.children[selectedLocations[i]];
                LocMenuProps = { ...LocMenuProps, locationDetails: locDetails };
                locationMenu.push(<LocationMenu key={locDetails.id} {...LocMenuProps} />);
            }
        }
    }

    // construct table data and headers
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
                            <span className={row.value ? 'check' : 'empty-check'} />
                            <span>Set to {'Yes'}</span>
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
            <div className="box">{locationMenu}</div>
            <ListView {...listViewProps} />
        </div>
    );
};

/** map dispatch to props */
const mapDispatchToProps = {
    fetchSettings: fetchLocSettings,
    fetchLococations: fetchLocs,
};

/** Connected EditSetings component */
const mapStateToProps = (state: Partial<Store>) => {
    const activeLocationId: string = getActiveLocId(state);
    const selectedLocations: string[] = getSelectedLocs(state);
    const defaultLocId = getDefaultLocId(state);
    let locationDetails: LocChildren | {} = {};
    let locSettings: Setting[] | [] = [];
    if (defaultLocId) {
        locationDetails = getLocDetails(state, [defaultLocId]);
    }
    if (activeLocationId) {
        locSettings = getLocSettings(state, activeLocationId);
    }

    return {
        activeLocationId,
        selectedLocations,
        locationDetails,
        locSettings,
        state,
        defaultLocId,
    };
};

const ConnectedEditSetings = connect(mapStateToProps, mapDispatchToProps)(EditSetings);

export default ConnectedEditSetings;
