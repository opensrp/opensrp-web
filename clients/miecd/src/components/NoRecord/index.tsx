import React from 'react';
import './index.css';

/**
 * ineterface for NoRecord object props
 * @member {string} message - message to be showed by the component
 */
interface Props {
    message: string;
}

/**
 * The NoRecord component shows a message passed to it
 * as a prop to the user
 * @param {string} message - message to be showed by the component
 */
export default function NoRecord({ message = '' }: Props) {
    return <div className="norecord">{message}</div>;
}
