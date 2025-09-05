import React, {useState, Suspense, lazy} from 'react';
import {Layout, ConfigProvider} from 'antd';
import {BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import {HeaderMenu, FooterSection} from './components/HeaderFooter';
import {Home} from './components/Home';
import {Toaster} from 'react-hot-toast';
import LoadingSpinner from './components/LoadingSpinner';
import './styles/modern.css';

// Lazy load components for code splitting
const Grammarian = lazy(() => import('./components/Grammarian').then(module => ({ default: module.Grammarian })));
const AhCounter = lazy(() => import('./components/AhCounter').then(module => ({ default: module.AhCounter })));
const Timekeeper = lazy(() => import('./components/Timekeeper').then(module => ({ default: module.Timekeeper })));
const About = lazy(() => import('./components/About').then(module => ({ default: module.About })));
const GeneralEvaluator = lazy(() => import('./components/GeneralEvaluator').then(module => ({ default: module.GeneralEvaluator })));

const {Content} = Layout;



const AppContent = () => {
    const [speakerKey, setSpeakerNextKey] = useState(1);
    const [speakersList, setSpeakersList] = useState([]);
    const [speechType, setSpeechType] = useState('');
    const [speakerName, setSpeakerName] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get current page from URL path
    const getSelectedKeyFromPath = (pathname) => {
        switch (pathname) {
            case '/':
            case '/home':
                return 'home';
            case '/ah-counter':
                return 'ah_counter';
            case '/timekeeper':
                return 'timekeeper';
            case '/grammarian':
                return 'grammarian';
            case '/general-evaluator':
                return 'general_evaluator';
            case '/about':
                return 'about';
            default:
                return 'home';
        }
    };

    const selectedPage = getSelectedKeyFromPath(location.pathname);

    const handleMenuClick = (key) => {
        switch (key) {
            case 'home':
                navigate('/');
                break;
            case 'ah_counter':
                navigate('/ah-counter');
                break;
            case 'timekeeper':
                navigate('/timekeeper');
                break;
            case 'grammarian':
                navigate('/grammarian');
                break;
            case 'general_evaluator':
                navigate('/general-evaluator');
                break;
            case 'about':
                navigate('/about');
                break;
            default:
                navigate('/');
        }
    };

    const handleNavigate = (page) => {
        handleMenuClick(page);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif',
                    borderRadius: 8,
                    colorPrimary: '#1677ff',
                },
            }}
        >
            <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                <HeaderMenu 
                    selectedKey={selectedPage} 
                    onMenuClick={handleMenuClick}
                />
                <Content style={{marginTop: 60, flex: '1 0 auto', display: 'flex', flexDirection: 'column'}}>
                    <div className="page-transition" style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                        <Routes>
                            <Route path="/" element={<Home onNavigate={handleNavigate}/>} />
                            <Route path="/home" element={<Home onNavigate={handleNavigate}/>} />
                            <Route path="/ah-counter" element={
                                <div style={{padding: window.innerWidth <= 768 ? '0 24px' : '0 48px', flex: 1, display: 'flex', flexDirection: 'column'}}>
                                    <Suspense fallback={<LoadingSpinner message="Loading Ah Counter..." />}>
                                        <AhCounter
                                            speakerKeyState={{var: speakerKey, func: setSpeakerNextKey}}
                                            speakersListState={{var: speakersList, func: setSpeakersList}}
                                            speechTypeState={{var: speechType, func: setSpeechType}}
                                            speakerNameState={{var: speakerName, func: setSpeakerName}}
                                        />
                                    </Suspense>
                                </div>
                            } />
                            <Route path="/timekeeper" element={
                                <div style={{padding: window.innerWidth <= 768 ? '0 24px' : '0 48px', flex: 1, display: 'flex', flexDirection: 'column'}}>
                                    <Suspense fallback={<LoadingSpinner message="Loading Timekeeper..." />}>
                                        <Timekeeper
                                            speakerKeyState={{var: speakerKey, func: setSpeakerNextKey}}
                                            speakersListState={{var: speakersList, func: setSpeakersList}}
                                            speechTypeState={{var: speechType, func: setSpeechType}}
                                            speakerNameState={{var: speakerName, func: setSpeakerName}}
                                        />
                                    </Suspense>
                                </div>
                            } />
                            <Route path="/grammarian" element={
                                <div style={{padding: window.innerWidth <= 768 ? '0 24px' : '0 48px', flex: 1, display: 'flex', flexDirection: 'column'}}>
                                    <Suspense fallback={<LoadingSpinner message="Loading Grammarian..." />}>
                                        <Grammarian
                                            speakerKeyState={{var: speakerKey, func: setSpeakerNextKey}}
                                            speakersListState={{var: speakersList, func: setSpeakersList}}
                                            speechTypeState={{var: speechType, func: setSpeechType}}
                                            speakerNameState={{var: speakerName, func: setSpeakerName}}
                                        />
                                    </Suspense>
                                </div>
                            } />
                            <Route path="/general-evaluator" element={
                                <div style={{padding: window.innerWidth <= 768 ? '0 24px' : '0 48px', flex: 1, display: 'flex', flexDirection: 'column'}}>
                                    <Suspense fallback={<LoadingSpinner message="Loading General Evaluator..." />}>
                                        <GeneralEvaluator />
                                    </Suspense>
                                </div>
                            } />
                            <Route path="/about" element={
                                <div style={{padding: window.innerWidth <= 768 ? '0 24px' : '0 48px', flex: 1, display: 'flex', flexDirection: 'column'}}>
                                    <Suspense fallback={<LoadingSpinner message="Loading About..." />}>
                                        <About />
                                    </Suspense>
                                </div>
                            } />
                        </Routes>
                    </div>
                </Content>
                <FooterSection/>
                <Toaster 
                    position="top-center"
                    toastOptions={{
                        duration: 3000,
                        className: 'modern-notification',
                        style: {
                            borderRadius: '12px',
                            background: '#fff',
                            color: '#333',
                            padding: '16px',
                            fontSize: '14px',
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                        },
                    }}
                />
            </Layout>
        </ConfigProvider>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;