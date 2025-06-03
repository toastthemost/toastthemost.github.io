import { headerStyle } from '../styles/styles';
import { Layout, Menu } from "antd";

const { Header, Footer } = Layout;

const HeaderMenu = ({selectedKey, onMenuClick}) => {
    const menuItems = [
        { key: 'home', label: 'Home' },
        { key: 'ah_counter', label: 'Ah-Counter' },
        { key: 'timekeeper', label: 'Timekeeper' },
        { key: 'grammarian', label: 'Grammarian' },
        { key: 'about', label: 'About', style: { marginLeft: 'auto' } },
    ];
    return (
        <Header style={headerStyle}>
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ flex: 1 }}
                selectedKeys={selectedKey}
                onClick={({ key }) => onMenuClick(key)}
            >
                {menuItems.map(item => (
                    <Menu.Item key={item.key} style={item.style}>
                        {item.label}
                    </Menu.Item>
                ))}
            </Menu>
        </Header>
    );
};

const FooterSection = () => {
    return (
        <Footer>
            Toastmaster Apps ©{new Date().getFullYear()} Created by Toast The Most Fidelity Club A
        </Footer>
    )
};

export { HeaderMenu, FooterSection };