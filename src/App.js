import React, {useState} from 'react';
import {Layout} from 'antd';
import {HeaderMenu, FooterSection} from './components/HeaderFooter';
import {Grammarian} from './components/Grammarian';
import {AhCounter} from './components/AhCounter';
import {Timekeeper} from './components/Timekeeper';
import {Home} from './components/Home';
import {About} from './components/About';

const {Content} = Layout;


const App = () => {

    const [speakerKey, setSpeakerNextKey] = useState(1);
    const [speakersList, setSpeakersList] = useState([]);
    const [speechType, setSpeechType] = useState('');
    const [speakerName, setSpeakerName] = useState('');
    const [selectedPage, setSelectedPage] = useState('timekeeper');

    const renderFeedbackSection = () => {
        switch (selectedPage) {
            case 'home':
                return <Home/>
            case 'ah_counter':
                return <AhCounter
                    speakerKeyState={{var: speakerKey, func: setSpeakerNextKey}}
                    speakersListState={{var: speakersList, func: setSpeakersList}}
                    speechTypeState={{var: speechType, func: setSpeechType}}
                    speakerNameState={{var: speakerName, func: setSpeakerName}}
                />
            case 'timekeeper':
                return <Timekeeper
                    speakerKeyState={{var: speakerKey, func: setSpeakerNextKey}}
                    speakersListState={{var: speakersList, func: setSpeakersList}}
                    speechTypeState={{var: speechType, func: setSpeechType}}
                    speakerNameState={{var: speakerName, func: setSpeakerName}}
                    />
            case 'grammarian':
                return <Grammarian
                    speakerKeyState={{var: speakerKey, func: setSpeakerNextKey}}
                    speakersListState={{var: speakersList, func: setSpeakersList}}
                    speechTypeState={{var: speechType, func: setSpeechType}}
                    speakerNameState={{var: speakerName, func: setSpeakerName}}
                />;
            case 'about':
                return <About/>
            default:
                return <div>Page Not Found</div>;
        }
    };

    return (
        <Layout>
            <HeaderMenu selectedKey={selectedPage} onMenuClick={setSelectedPage}/>
            {
                selectedPage === 'home'
                ? <div>{renderFeedbackSection()}</div>
                : <div><Content style={{padding: '0 48px'}}>{renderFeedbackSection()}</Content></div>
            }
            <FooterSection/>
        </Layout>
    );
};

export default App;