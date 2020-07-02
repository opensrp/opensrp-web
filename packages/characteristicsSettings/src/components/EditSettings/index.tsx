import ListView from '@onaio/list-view';
import { OpenSRPService } from '@opensrp/server-service';
import React, { useEffect, MouseEvent, useState, ChangeEvent } from 'react';
import '../../styles/index.css';
import { Store } from 'redux';
import settingsReducer, { Setting, getLocSettings, settingsReducerName, fetchLocSettings } from '../../ducks/settings';
import { connect } from 'react-redux';
import reducerRegistry from '@onaio/redux-reducer-registry';
import locationReducer, {
    fetchLocs,
    getActiveLocId,
    getSelectedLocs,
    getLocDetails,
    LocChildren,
    locationReducerName,
    LocPayload,
    getDefaultLocId,
} from '../../ducks/locations';
import { LocationMenu } from '../LocationsMenu';

// static data for testing: to be removed to use data from server
import { locs } from '../../ducks/locations/tests/fixtures';
import { FormConfigProps } from '../../helpers/types';
import { SearchForm } from '../SearchForm';
import {
    SEARCH_SETTINGS_LABEL,
    EDIT_LABEL,
    PAGE_TITLE_LABEL,
    NAME_LABEL,
    DESCRIPTION_LABEL,
    SETTINGS_LABEL,
    INHERITED_FROM_LABEL,
    SET_TO_NO_LABEL,
    SET_TO_YES_LABEL,
    INHERIT_SETTING_LABEL,
    NO_DATA_FOUND,
} from '../../constants';
import { preparePutData } from '../../helpers/utils';
import '../../../../OpenSRPTable/src/index.css';

reducerRegistry.register(settingsReducerName, settingsReducer);
reducerRegistry.register(locationReducerName, locationReducer);

/** dafault edit settings interface */
export interface EditSettingsDefaultProps {
    activeLocationId: string;
    currentLocName: string;
    debounceTime: number;
    defaultLocId: string;
    descriptionLabel: string;
    editLabel: string;
    fetchSettings: typeof fetchLocSettings;
    fetchLocations: typeof fetchLocs;
    inheritedLable: string;
    inheritSettingsLabel: string;
    locationDetails: LocChildren | {};
    locationSettings: Setting[];
    nameLabel: string;
    noDataFound: string;
    pageTitle: string;
    placeholder: string;
    selectedLocations: string[];
    settingLabel: string;
    setToNoLabel: string;
    setToYesLabel: string;
    state: Partial<Store>;
}

/** component for displaying population characteristics */
const EditSetings = (props: FormConfigProps & EditSettingsDefaultProps) => {
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
        LoadingComponent,
        baseURL,
        restBaseURL,
        getPayload,
        locationsEndpoint,
        secAuthEndpoint,
        settingsEndpoint,
        customAlert,
        debounceTime,
        placeholder,
        pageTitle,
        descriptionLabel,
        nameLabel,
        settingLabel,
        inheritedLable,
        editLabel,
        inheritSettingsLabel,
        setToNoLabel,
        setToYesLabel,
        noDataFound,
    } = props;

    const [showLocPopUp, setShowLocPopup] = useState('');
    const [locSettings, setLocSettings] = useState(locationSettings);
    const [loading, setLoading] = useState(false);

    /**
     * gets settings of a particular location
     * @param {string} currentLocId
     */
    const getLocationSettings = async (currentLocId: string) => {
        setLoading(true);
        const params = { locationId: currentLocId };
        const clientService = new OpenSRPService(restBaseURL, settingsEndpoint, getPayload);
        await clientService
            .list(params)
            .then(res => {
                fetchSettings(res, currentLocId);
            })
            .catch(error => {
                customAlert && customAlert(String(error), { type: 'error' });
            })
            .finally(() => setLoading(false));
    };

    /**
     * gets full location hierarch of the identifier provided
     * @param {string} currentLocId  - location identifier
     */
    const getLocations = async (currentLocId: string) => {
        setLoading(true);
        const url = `${locationsEndpoint}/${currentLocId}`;
        const clientService = new OpenSRPService(baseURL, url, getPayload);
        await clientService
            .list()
            .then(async res => {
                const { map } = res.locationsHierarchy;
                const locId = Object.keys(map)[0];
                await getLocationSettings(locId);
                fetchLocations(res);
            })
            .catch(async error => {
                const { map } = locs.locationsHierarchy;
                const locId = Object.keys(map)[0];
                await getLocationSettings(locId);
                fetchLocations(locs);

                setLoading(false);
                customAlert && customAlert(String(error), { type: 'error' });
            })
            .finally(() => setLoading(false));
    };

    /** gets location assigned to user*/
    const getUserLocHierarchy = async () => {
        setLoading(true);
        const clientService = new OpenSRPService(baseURL, secAuthEndpoint, getPayload);
        await clientService
            .list()
            .then(res => {
                const { map } = res.locations.locationsHierarchy;
                const locId = Object.keys(map)[0];
                getLocations(locId);
            })
            .catch(error => {
                setLoading(false);
                customAlert && customAlert(String(error), { type: 'error' });
            });
    };

    useEffect(() => {
        if (!defaultLocId) {
            getUserLocHierarchy();
        }
    }, []);

    useEffect(() => {
        setLocSettings(props.locationSettings);
    }, [props.locationSettings]);

    // handle search input
    const handleSearchInput = (e: ChangeEvent) => {
        e.preventDefault();
        let input = (e.target as any).value;
        input = input.replace(/\s+/g, ' ').trimStart();
        if (!input) {
            setLocSettings(locationSettings);
            return false;
        }
        if (locationSettings.length) {
            input = input.toUpperCase();
            const results = locationSettings.filter((seting: Setting) => seting.label.toUpperCase().includes(input));
            setLocSettings(results);
            return true;
        }
    };

    // toggle settings update modal
    const openEditModal = (e: MouseEvent, row: Setting) => {
        e.preventDefault();
        const activeLoc = activeLocationId;
        fetchSettings([{ ...row, editing: !row.editing }], activeLoc);
    };

    // update setting
    const changeSetting = async (e: MouseEvent, row: any, value: string) => {
        e.preventDefault();
        if (value === row.value) {
            return false;
        }
        const activeLoc = activeLocationId;
        const data = preparePutData(row, value);
        const clientService = new OpenSRPService(restBaseURL, settingsEndpoint, getPayload);
        await clientService
            .update(data)
            .then(() => {
                fetchSettings([{ ...row, value }], activeLoc);
            })
            .catch(error => {
                customAlert && customAlert(String(error), { type: 'error' });
            })
            .finally(() => setLoading(false));
    };

    // update active location
    const popLocPopup = (e: MouseEvent, id: string) => {
        e.preventDefault();
        const isClossing = showLocPopUp === id;
        if (isClossing) {
            setShowLocPopup('');
        } else {
            setShowLocPopup(id);
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
            getLocationSettings(activeLocId);
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
        setShowLocPopup('');
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
            const value = typeof row.value === 'string' ? row.value === 'true' : row.value;
            return [
                row.label,
                row.description,
                <p key={row.key}>{value ? 'Yes' : 'No'}</p>,
                row.inherited_from?.trim() || '_',
                <div className="popup" key={row.key}>
                    <a href="#" onClick={e => openEditModal(e, row)}>
                        {editLabel}
                    </a>
                    <div className={`popuptext ${row.editing ? 'show' : ''}`}>
                        <div onClick={e => changeSetting(e, row, 'true')}>
                            <span className={value ? 'check' : 'empty-check'} />
                            <span>{setToYesLabel}</span>
                        </div>
                        <div onClick={e => changeSetting(e, row, 'false')}>
                            <span className={value ? 'empty-check' : 'check'} /> <span>{setToNoLabel}</span>
                        </div>
                        <div className="inherit-from">
                            <span className={row.inherited_from?.trim() ? 'check' : 'empty-check'} />
                            {inheritSettingsLabel}
                        </div>
                    </div>
                </div>,
            ];
        }),
        headerItems: [nameLabel, descriptionLabel, settingLabel, inheritedLable, editLabel],
        tableClass: 'table table-striped',
    };

    const searchProps = {
        debounceTime,
        onChangeHandler: handleSearchInput,
        placeholder,
    };

    if (LoadingComponent && loading) {
        return <div>{LoadingComponent}</div>;
    }

    return (
        <div>
            <div className="title">
                <h4>
                    {pageTitle} {currentLocName && <span>({currentLocName})</span>}
                </h4>
                <SearchForm {...searchProps} />
            </div>
            <div className="box">{locationMenu}</div>
            <ListView {...listViewProps} />
            {!locSettings.length && <div className="no-data">{noDataFound}</div>}
        </div>
    );
};

/** Editsettings default props */
const defaultProps: EditSettingsDefaultProps = {
    activeLocationId: '',
    currentLocName: '',
    debounceTime: 1000,
    defaultLocId: '',
    descriptionLabel: DESCRIPTION_LABEL,
    editLabel: EDIT_LABEL,
    fetchSettings: fetchLocSettings,
    fetchLocations: fetchLocs,
    inheritedLable: INHERITED_FROM_LABEL,
    inheritSettingsLabel: INHERIT_SETTING_LABEL,
    locationDetails: {},
    locationSettings: [],
    nameLabel: NAME_LABEL,
    noDataFound: NO_DATA_FOUND,
    pageTitle: PAGE_TITLE_LABEL,
    placeholder: SEARCH_SETTINGS_LABEL,
    selectedLocations: [],
    settingLabel: SETTINGS_LABEL,
    setToNoLabel: SET_TO_NO_LABEL,
    setToYesLabel: SET_TO_YES_LABEL,
    state: {},
};

EditSetings.defaultProps = defaultProps;

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

export { EditSetings, ConnectedEditSetings };
