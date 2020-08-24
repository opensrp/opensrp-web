import ListView from '@onaio/list-view';
import { OpenSRPService } from '@opensrp/server-service';
import React, { useEffect, MouseEvent, useState, ChangeEvent } from 'react';
import { Store } from 'redux';
import { Setting, getLocSettings, fetchLocSettings } from '../../ducks/settings';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import {
    fetchLocs,
    getActiveLocId,
    getSelectedLocs,
    getLocDetails,
    LocChildren,
    LocPayload,
    getDefaultLocId,
} from '../../ducks/locations';
import { LocationMenu } from '../LocationsMenu';
import { FormConfigProps, EditSettingLabels, SettingValue } from '../../helpers/types';
import { SearchForm } from '../SearchForm';
import { labels, EditSettingsButton } from '../../helpers/utils';
import { POP_CHARACTERISTICS_PARAM, SETTINGS_TRUE } from '../../constants';
import { editSetting, getInheritedFromLabel, isInheritedFromValid } from './utils';

/** reqister search and question mark icons */
library.add(faSearch, faQuestionCircle);

/** dafault edit settings interface */
interface EditSettingsDefaultProps {
    activeLocationId: string;
    currentLocName: string;
    debounceTime: number;
    defaultLocId: string;
    fetchSettings: typeof fetchLocSettings;
    fetchLocations: typeof fetchLocs;
    labels: EditSettingLabels;
    locationDetails: LocChildren | {};
    locationSettings: Setting[];
    selectedLocations: string[];
    state: Partial<Store>;
    tableClass: string;
}

/** component for displaying population characteristics */
const EditSetings = (props: FormConfigProps & EditSettingsDefaultProps) => {
    const {
        labels,
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
        v2BaseUrl,
        tableClass,
    } = props;

    const {
        actionLabel,
        pageTitle,
        placeholder,
        descriptionLabel,
        nameLabel,
        settingLabel,
        inheritedLable,
        editLabel,
        inheritSettingsLabel,
        setToNoLabel,
        setToYesLabel,
        noDataFound,
    } = labels;

    const [showLocPopUp, setShowLocPopup] = useState('');
    const [locSettings, setLocSettings] = useState(locationSettings);
    const [loading, setLoading] = useState(false);

    /**
     * gets settings of a particular location
     * @param {string} currentLocId
     */
    const getLocationSettings = async (currentLocId: string) => {
        setLoading(locationSettings.length < 1);
        const params = {
            identifier: POP_CHARACTERISTICS_PARAM,
            locationId: currentLocId,
            resolve: true,
            serverVersion: 0,
        };
        const clientService = new OpenSRPService(v2BaseUrl, settingsEndpoint, getPayload);
        await clientService
            .list(params)
            .then((res: Setting[]) => {
                fetchSettings(res, currentLocId, true);
            })
            .catch(error => customAlert && customAlert(String(error), { type: 'error' }))
            .finally(() => setLoading(false));
    };

    /**
     * gets full location hierarch of the identifier provided
     * @param {string} currentLocId  - location identifier
     */
    const getLocations = (currentLocId: string) => {
        setLoading(true);
        const clientService = new OpenSRPService(baseURL, locationsEndpoint, getPayload);
        return clientService.read(currentLocId);
    };

    /** gets location assigned to user*/
    const getUserLocHierarchy = () => {
        setLoading(true);
        const clientService = new OpenSRPService(baseURL, secAuthEndpoint, getPayload);
        return clientService.list();
    };

    const getLocsandSettings = async () => {
        try {
            const userLocs = await getUserLocHierarchy();
            const { map: userLocMap } = userLocs.locations.locationsHierarchy;
            const userLocId = Object.keys(userLocMap)[0];
            const hierarchy = await getLocations(userLocId);
            fetchLocations(hierarchy);
        } catch (error) {
            customAlert && customAlert(String(error), { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!defaultLocId) {
            getLocsandSettings();
        }
    }, []);

    useEffect(() => {
        if (activeLocationId) {
            getLocationSettings(activeLocationId);
        }
    }, [props.activeLocationId]);

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
        fetchSettings([{ ...row, editing: !row.editing }], activeLocationId);
    };

    const editSettingHandler = async (e: MouseEvent, row: Setting, value: SettingValue) => {
        e.preventDefault();
        editSetting(
            state,
            row,
            value,
            v2BaseUrl,
            settingsEndpoint,
            getPayload,
            fetchSettings,
            activeLocationId,
            customAlert,
        );
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
    const loadLocsettings = async (e: MouseEvent, activeLocId: string) => {
        e.preventDefault();
        const selectedLocs = [...selectedLocations, activeLocId];
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

    // adds question mark to inherited from header
    const iheritedFrom = (
        <span>
            {inheritedLable} <FontAwesomeIcon icon="question-circle" />
        </span>
    );

    // construct table data and headers
    const listViewProps = {
        data: locSettings.map(row => {
            const value = typeof row.value === 'string' ? row.value === SETTINGS_TRUE : row.value;
            const inheritedFrom = row.inheritedFrom?.trim();

            return [
                row.label,
                row.description,
                <p key={row.key}>{value ? 'Yes' : 'No'}</p>,
                getInheritedFromLabel(state, inheritedFrom),
                <EditSettingsButton
                    key={row.documentId}
                    changeSetting={editSettingHandler}
                    editLabel={editLabel}
                    inheritSettingsLabel={inheritSettingsLabel}
                    openEditModal={openEditModal}
                    row={row}
                    setToNoLabel={setToNoLabel}
                    setToYesLabel={setToYesLabel}
                    value={value}
                    showInheritSettingsLabel={activeLocationId !== defaultLocId}
                />,
            ];
        }),
        headerItems: [nameLabel, descriptionLabel, settingLabel, iheritedFrom, actionLabel],
        tableClass,
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
    fetchSettings: fetchLocSettings,
    fetchLocations: fetchLocs,
    labels,
    locationDetails: {},
    locationSettings: [],
    selectedLocations: [],
    state: {},
    tableClass: 'table table-striped',
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
        locationDetails = getLocDetails(state, defaultLocId);
        currentLocName = getLocDetails(state, selectedLocations[selectedLocations.length - 1]).label;
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
