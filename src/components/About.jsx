import React from 'react';
import {Typography, Col, Row} from 'antd';
import {cardStyle} from '../styles/styles';
const { Title, Paragraph } = Typography;

export const About = () => {
    return (
        <>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/images/about_us.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: 0
            }}></div>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                zIndex: 1
            }}></div>
            <Row justify="center" align="middle" gutter={[24, 24]} style={{marginTop: 32, position: 'relative', zIndex: 2, minHeight: 'calc(100vh - 120px)'}}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div style={{ 
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        minHeight: '500px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <img alt="about us" src='/images/about_us.jpg' 
                             style={{ 
                                 width: '100%', 
                                 height: '100%',
                                 minHeight: '500px',
                                 objectFit: 'cover',
                                 borderRadius: '16px',
                                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                             }} />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div style={{...cardStyle, padding: '48px 32px'}}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '32px',
                            gap: '16px'
                        }}>
                            <img 
                                src="/images/TTM.png" 
                                alt="Toast The Most Logo" 
                                style={{ 
                                    height: '180px', 
                                    width: '180px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '6px solid #1677ff',
                                    boxShadow: '0 20px 50px rgba(22, 119, 255, 0.4)',
                                    flexShrink: 0
                                }}
                            />
                            <Title level={2} style={{margin: 0, color: '#1677ff', textAlign: 'left', fontSize: 'clamp(24px, 3vw, 32px)'}}>About Us</Title>
                        </div>
                        <Paragraph style={{ 
                            fontSize: 'clamp(14px, 2.5vw, 16px)',
                            lineHeight: 1.6,
                            marginBottom: '24px'
                        }}>
                            The Toastmasters Interactive Toolkit is a web-based browser only application created to enhance and simplify the conduct of Toastmasters meetings. It provides essential tools including timekeeping, filler word tracking, and speaker queue management, all integrated into a single, user-friendly platform.
                        </Paragraph>
                        <Paragraph style={{ 
                            fontSize: 'clamp(14px, 2.5vw, 16px)',
                            lineHeight: 1.6
                        }}>
                            This application has been developed by the "Toast the Most Ggn Club A" Toastmasters club at Fidelity International, with the goal of supporting members in building communication and leadership skills efficiently during club sessions.
                        </Paragraph>
                    </div>
                </Col>
            </Row>
        </>
    )
}