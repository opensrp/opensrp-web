import React from 'react';
import { Row, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

export interface Info {
    label: string;
    value: string;
}

/** Type definition for renderHeaderProp */
export type renderHeaderProp = (
    visible: boolean,
    title?: string,
    link?: string,
    linkLable?: string,
) => JSX.Element | null;

/** Type definition for renderBodyProp */
export type renderBodyProp = (rowData: Info[]) => JSX.Element;

/** Renders header section of a InfoCard */
export function renderHeaderFunc(visible: boolean, title?: string, link?: string, linkLabel?: string) {
    if (visible) {
        return (
            <Row className="basic-info-header-bg">
                <Col className="basic-info-header">
                    <span className="basic-info-title"> {title}</span>
                    <div className="float-right basic-info-edit">
                        <Link to={`${link}`}>{linkLabel}</Link>
                    </div>
                </Col>
            </Row>
        );
    } else {
        return null;
    }
}

/** Renders body section of InfoCard */
export function renderRowsFunc(rowData: Info[] = []) {
    if (rowData.length % 2 == 1) rowData = [...rowData, { label: '', value: '' }];
    const information = Array.from(Array(rowData.length).keys())
        .filter((i: number) => i % 2 == 0)
        .map((i: number) => {
            return (
                <tbody key={i}>
                    <tr>
                        <td className="basic-info-label"> {rowData[i].label} </td>
                        <td> {rowData[i].value} </td>
                        <td className="basic-info-label">{rowData[i + 1].label}</td>
                        <td>{rowData[i + 1].value}</td>
                    </tr>
                </tbody>
            );
        });

    return (
        <Table className="basic-info-table" borderless={true}>
            {information}
        </Table>
    );
}

/** Interface to define props for InfoCard */
export interface InfoCardProps {
    renderHeader: renderHeaderProp;
    renderRows: renderBodyProp;
    visible: boolean;
    title?: string;
    link?: string;
    linkLable?: string;
    rowData: Info[];
}

/** default props for InfoCard */
const defaultInfoCardProps: Partial<InfoCardProps> = {
    renderHeader: renderHeaderFunc,
    renderRows: renderRowsFunc,
    visible: true,
    title: '',
    link: '',
    linkLable: '',
    rowData: [],
};

/** A simple component that takes in data and renders information  */
const InfoCard = (props: InfoCardProps) => {
    const { renderHeader, renderRows, visible, title, link, linkLable, rowData } = props;

    return (
        <div id="basic-info-container">
            {renderHeader(visible, title, link, linkLable)}
            {renderRows(rowData)}
        </div>
    );
};

InfoCard.defaultProps = defaultInfoCardProps;

export default InfoCard;
