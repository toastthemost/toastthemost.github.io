import { headerStyle } from '../styles/styles';
import { Layout, Menu, Drawer, Button } from "antd";
import { MenuOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

const { Header, Footer } = Layout;

const HeaderMenu = ({selectedKey, onMenuClick}) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const menuItems = [
        { key: 'ah_counter', label: 'Ah-Counter' },
        { key: 'timekeeper', label: 'Timekeeper' },
        { key: 'grammarian', label: 'Grammarian' },
        { key: 'general_evaluator', label: 'General Evaluator' },
        { key: 'resources', label: 'Resources' },
        { key: 'about', label: 'About' },
    ];

    const getAppName = () => {
        const currentItem = menuItems.find(item => item.key === selectedKey);
        return currentItem ? currentItem.label : 'Toastmasters';
    };

    const handleMenuClick = (key) => {
        onMenuClick(key);
        setDrawerVisible(false);
    };

    if (isMobile) {
        return (
            <>
                <Header style={{...headerStyle, padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <img 
                            src="/images/TTM.png" 
                            alt="Toast The Most Logo" 
                            style={{ 
                                height: '60px', 
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                cursor: 'pointer',
                                border: '2px solid rgba(255, 255, 255, 0.1)',
                            }}
                            onClick={() => handleMenuClick('home')}
                        />
                        <div style={{color: 'white', fontSize: '18px', fontWeight: 'bold'}}>{getAppName()}</div>
                    </div>
                    <Button
                        type="text"
                        icon={<MenuOutlined style={{color: 'white', fontSize: '20px'}} />}
                        onClick={() => setDrawerVisible(true)}
                    />
                </Header>
                <Drawer
                    title="Menu"
                    placement="right"
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                    bodyStyle={{padding: 0}}
                >
                    <Menu
                        mode="vertical"
                        selectedKeys={[selectedKey]}
                        onClick={({ key }) => handleMenuClick(key)}
                    >
                        {menuItems.map(item => (
                            <Menu.Item key={item.key}>
                                {item.label}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Drawer>
            </>
        );
    }

    return (
        <Header style={{...headerStyle, display: 'flex', alignItems: 'center'}}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '24px' }}>
                <img 
                    src="/images/TTM.png" 
                    alt="Toast The Most Logo" 
                    style={{ 
                        height: '70px', 
                        width: '70px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease',
                    }}
                    onClick={() => onMenuClick('home')}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.border = '2px solid rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.border = '2px solid rgba(255, 255, 255, 0.1)';
                    }}
                />
            </div>
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ 
                    flex: 1,
                    height: '80px',
                    lineHeight: '80px'
                }}
                selectedKeys={[selectedKey]}
                onClick={({ key }) => onMenuClick(key)}
            >
                {menuItems.map((item, index) => (
                    <Menu.Item 
                        key={item.key} 
                        style={{
                            height: '80px',
                            lineHeight: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            ...(index === menuItems.length - 1 ? { marginLeft: 'auto' } : {})
                        }}
                    >
                        <span style={{ lineHeight: 'normal' }}>{item.label}</span>
                    </Menu.Item>
                ))}
            </Menu>
        </Header>
    );
};

const FooterSection = () => {
    return (
        <Footer style={{ 
            flexShrink: 0,
            position: 'relative', 
            zIndex: 10, 
            textAlign: 'center', 
            backgroundColor: 'rgba(0, 0, 0, 0.8)', 
            color: 'white', 
            backdropFilter: 'blur(10px)',
            marginTop: 'auto'
        }}>
            Toastmasters Apps ©{new Date().getFullYear()} Created by Toast The Most Ggn Club A
        </Footer>
    )
};

export { HeaderMenu, FooterSection };