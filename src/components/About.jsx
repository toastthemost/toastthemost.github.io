import React from 'react';
import {Typography, Col, Row} from 'antd';
const { Title, Paragraph } = Typography;

export const About = () => {
    return (
        <div>
            <Row align="center" gutter={24} style={{marginTop: 32}}>
                <Col className="gutter-row" span={12}>
                    <img alt="about us" src='/images/about_us.jpg' style={{ width: '100%', height: 'auto' }} />
                </Col>
                <Col className="gutter-row" span={12}>
                    <Title>About Us</Title>
                    <Paragraph style={{ fontSize: 16 }}>
                        The Toastmasters Interactive Toolkit is a web-based browser only application created to enhance and simplify the conduct of Toastmasters meetings. It provides essential tools including timekeeping, filler word tracking, and speaker queue management, all integrated into a single, user-friendly platform.
                    </Paragraph>
                    <Paragraph style={{ fontSize: 16 }}>
                        This application has been developed by the “Toast the Most FIL Club A” Toastmasters club at Fidelity International, with the goal of supporting members in building communication and leadership skills efficiently during club sessions.
                    </Paragraph>
                </Col>
            </Row>
        </div>
    )
}