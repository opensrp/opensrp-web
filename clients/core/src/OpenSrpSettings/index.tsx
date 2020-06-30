import ListView from '@onaio/list-view';
import React, { useEffect, MouseEvent, useState, ChangeEvent } from 'react';
import './index.css';
import { Store } from 'redux';
import settingsReducer, {
    Setting,
    getLocSettings,
    reducerName as settingsReducerName,
    fetchLocSettings,
} from './ducks/settings';
import { connect } from 'react-redux';
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
} from './ducks/locations';
import { LocationMenu } from './helpers/LocationsMenu';

// static data for testing: to be removed to use data from server
import { locHierarchy } from './ducks/locations/tests/fixtures';
import { allSettings } from './ducks/settings/tests/fixtures';

reducerRegistry.register(settingsReducerName, settingsReducer);
reducerRegistry.register(LocsReducerName, locationReducer);

interface DefaultProps {
    activeLocationId: string;
    currentLocName: string;
    defaultLocId: string;
    fetchSettings: typeof fetchLocSettings;
    fetchLocations: typeof fetchLocs;
    locationDetails: LocChildren | {};
    locationSettings: Setting[];
    selectedLocations: string[];
    state: Partial<Store>;
}

const locId = '75af7700-a6f2-448c-a17d-816261a7749a';

const EditSetings = (props: DefaultProps) => {
    const {
        locationSettings,
        fetchSettings,
        fetchLocations,
        activeLocationId,
        selectedLocations,
        locationDetails,
        defaultLocId,
        state,
        currentLocName,
    } = props;

    const [showLocPopUp, changeLocPopup] = useState('');
    const [locSettings, changelocSettings] = useState(locationSettings);
    const [searchInput, changeSearchInput] = useState('');

    const getLocationSettings = async (currentLocId: string, update = false) => {
        if ((!locSettings.length && currentLocId) || update) {
            // code block to fetch settings from Api should enter here then dispatch the line below
            return fetchSettings(allSettings, currentLocId);
        }
    };

    const getLocations = async () => {
        if (!activeLocationId && !Object.keys(locationDetails).length) {
            // code block to fetch locations from Api should enter here then dispatch the line below
            fetchLocations(locHierarchy);
            return getLocationSettings(locId);
        }
        getLocationSettings(locId);
    };

    useEffect(() => {
        getLocations();
        changelocSettings(props.locationSettings);
    }, [props.locationSettings]);

    // handle search input
    const handleSearchInput = (e: ChangeEvent) => {
        e.preventDefault();
        let input = (e.target as any).value;
        input = input.replace(/\s+/g, ' ').trimStart();
        changeSearchInput(input);
        if (!input) {
            changelocSettings(locationSettings);
            return false;
        }
        if (locationSettings.length) {
            input = input.toUpperCase();
            const results = locationSettings.filter((seting: Setting) => seting.label.toUpperCase().includes(input));
            changelocSettings(results);
            return true;
        }
    };

    // toggle settings update modal
    const openEditModal = (e: MouseEvent, row: Setting) => {
        e.preventDefault();
        fetchSettings([{ ...row, editing: !row.editing }], activeLocationId);
    };

    // update setting
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
        const isClossing = showLocPopUp === id;
        if (isClossing) {
            changeLocPopup('');
        } else {
            changeLocPopup(id);
        }
        const lastSelectedloc = [...selectedLocations].pop();
        if (lastSelectedloc !== id && selectedLocations.includes(id) && !isClossing) {
            const index = selectedLocations.indexOf(id);
            let selectedLocs = [...selectedLocations];
            selectedLocs = selectedLocs.slice(0, index + 1);
            const data: LocPayload = {
                locationsHierarchy: {
                    map: {},
                    parentChildren: {},
                    activeLocId: id,
                    selectedLocs,
                    defaultLocId: defaultLocId,
                },
            };
            fetchLocations(data);
        }
    };

    // load settings of selected location
    const loadLocsettings = (e: MouseEvent, activeLocId: string) => {
        e.preventDefault();
        const selectedLocs = [...selectedLocations, activeLocId];
        const locSettings = getLocSettings(state, activeLocId);
        if (!locSettings.length) {
            getLocationSettings(activeLocId, true);
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
        fetchLocations(data);
        changeLocPopup('');
    };

    // prepare location menu
    const locationMenu = [];
    if (selectedLocations.length && Object.keys(locationDetails).length) {
        let locDetails = { ...(locationDetails as LocChildren) };
        let isLast = selectedLocations.length === 1;
        let LocMenuProps = {
            locationDetails: locDetails,
            activeLocationId,
            showLocPopUp,
            popLocPopup,
            loadLocsettings,
            isLast,
        };
        locationMenu.push(<LocationMenu key={locDetails.id} {...LocMenuProps} />);
        for (let i = 1; i < selectedLocations.length; i++) {
            if (locDetails.children) {
                isLast = i === selectedLocations.length - 1;
                locDetails = locDetails.children[selectedLocations[i]];
                LocMenuProps = { ...LocMenuProps, locationDetails: locDetails, isLast };
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
                <h4>Server Settings ({currentLocName})</h4>
                <input
                    className="searchTerm"
                    type="text"
                    value={searchInput}
                    placeholder="Search settings"
                    onChange={e => {
                        handleSearchInput(e);
                    }}
                />
            </div>
            <div className="box">{locationMenu}</div>
            <ListView {...listViewProps} />
        </div>
    );
};

/** map dispatch to props */
const mapDispatchToProps = {
    fetchSettings: fetchLocSettings,
    fetchLocations: fetchLocs,
};

/** Connected EditSetings component */
const mapStateToProps = (state: Partial<Store>) => {
    const activeLocationId: string = getActiveLocId(state);
    const selectedLocations: string[] = getSelectedLocs(state);
    const defaultLocId = getDefaultLocId(state);
    let locationDetails: LocChildren | {} = {};
    let locationSettings: Setting[] = [];
    let currentLocName = '';
    if (defaultLocId && activeLocationId && selectedLocations.length) {
        locationDetails = getLocDetails(state, [defaultLocId]);
        currentLocName = getLocDetails(state, selectedLocations).label;
        locationSettings = getLocSettings(state, activeLocationId);
    }

    return {
        activeLocationId,
        selectedLocations,
        locationDetails,
        locationSettings,
        state,
        defaultLocId,
        currentLocName,
    };
};

const ConnectedEditSetings = connect(mapStateToProps, mapDispatchToProps)(EditSetings);

export default ConnectedEditSetings;
