import * as React from 'react';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Table } from 'reactstrap';
import './index.css';
import classnames from 'classnames';
import { Client } from '../../../store/ducks/clients';

export interface RegisterPanelData {
    report: string;
    date: string;
    reporter: string;
    message: string;
}

export interface RegisterPanelProps {
    registerData: RegisterPanelData[];
    client: Client;
    tabs: string[];
}

export interface RegisterPanelState {
    activeTab: string;
}

export const defaultRegisterPanelState: RegisterPanelState = {
    activeTab: '',
};

class RegisterPanel extends React.Component<RegisterPanelProps, RegisterPanelState> {
    constructor(props: RegisterPanelProps) {
        super(props);
        this.state = defaultRegisterPanelState;
    }
    changeTab = (tabName: string) => {
        this.setState({ activeTab: tabName });
    };

    render() {
        const { client, registerData, tabs } = this.props;
        return (
            <div id="members-list-container">
                <Row>
                    <Col className="members-list-header" style={{ borderBottom: '1px solid #e8e8e9' }}>
                        <h5> RegisterPanels: </h5>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Nav style={{ marginLeft: '2.5%' }} tabs>
                            {tabs.map((tabName: string, index: number) => {
                                <NavItem key={index} onClick={() => this.changeTab(tabName)}>
                                    <NavLink className={classnames({ active: this.state.activeTab === tabName })}>
                                        {tabName}
                                    </NavLink>
                                </NavItem>;
                            })}
                        </Nav>
                        <TabContent activeTab={'1'}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col className="basic-info-body">
                                        <Table className="basic-info-table" borderless={true}>
                                            <tbody>
                                                <tr>
                                                    <td className="basic-info-label">HHID Number</td>
                                                    <td></td>
                                                    <td className="basic-info-label">Phone</td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr>
                                                    <td className="basic-info-label">Family Name</td>
                                                    <td></td>
                                                    <td className="basic-info-label">Provider</td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr>
                                                    <td className="basic-info-label">Head of Household</td>
                                                    <td></td>
                                                    <td className="basic-info-label">RegisterPanel date</td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="members-list-body" style={{ padding: '30px' }}>
                                        <Table style={{ border: '2px solid #e8e8e9' }}>
                                            <thead style={{ backgroundColor: '#f5f5f5' }}>
                                                <tr>
                                                    <td>Report</td>
                                                    <td>Date</td>
                                                    <td>Reporter</td>
                                                    <td style={{ width: '50%' }}>Message</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {registerData.map((data: RegisterPanelData, index: number) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{data.report}</td>
                                                            <td> {data.date} </td>
                                                            <td>{data.reporter}</td>
                                                            <td>{data.message}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RegisterPanel;
