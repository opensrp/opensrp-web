import React from 'react';
import { Row, Col } from 'reactstrap';
import './index.css';

export interface InfoCardProps {
    title: string;
    children: React.ReactNode;
}
const InfoCard: React.FC<InfoCardProps> = (props: InfoCardProps) => {
    return (
        <div id="info-container">
            <Row className="info-header-bg">
                <Col className="info-header">
                    <span className="info-title">
                        <b>
                            <h5>{props.title}</h5>
                        </b>
                    </span>
                </Col>
            </Row>
            <Row>{props.children}</Row>
        </div>
    );
};

export default InfoCard;
