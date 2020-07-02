import React, { MouseEvent } from 'react';
import { LocChildren } from '../../ducks/locations';

interface DefaultProps {
    locationDetails: LocChildren;
    activeLocationId: string;
    showLocPopUp: string;
    popLocPopup: (e: MouseEvent, id: string) => any;
    loadLocsettings: (e: MouseEvent, activeLocId: string) => any;
    isLast: boolean;
}

export const LocationMenu = (props: DefaultProps) => {
    const { locationDetails, activeLocationId, showLocPopUp, popLocPopup, loadLocsettings, isLast } = props;

    const locDetails = { ...locationDetails };
    const isActiveLocId = activeLocationId === locDetails.id;
    const children = locDetails.children || {};
    const childrenKeys = Object.keys(children);

    return (
        <div className="locations-menu" key={locDetails.id}>
            <a
                className={`locations ${isActiveLocId ? 'active-loc' : ''}`}
                onClick={e => popLocPopup(e, locDetails.id)}
            >
                <span>{locDetails.label}</span>
                {childrenKeys.length ? <span className="drop-down" /> : null}
                {isLast ? null : '/'}
            </a>
            {childrenKeys.length ? (
                <div className="popup">
                    <div className={`popuptext loc-popup ${showLocPopUp === locDetails.id ? 'show' : ''}`}>
                        {childrenKeys.map(key => (
                            <div key={children[key].id} onClick={e => loadLocsettings(e, children[key].id)}>
                                {children[key].label}
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};
