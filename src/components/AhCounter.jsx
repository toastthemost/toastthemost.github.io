import {
    Typography, Flex, Descriptions, Divider, Row, Col, Input, Button, message, Table, Grid, Collapse, Tour, Affix
} from 'antd';
import {cardStyle, tableIconStyle} from '../styles/styles';
import React, {useState, useRef, useEffect} from "react";
import {PlusCircleTwoTone} from '@ant-design/icons';
import {HelpCircle} from 'lucide-react';
import {LogSection} from "./Logger";
import {SpeakerSection} from "./SpeakersContent";


const {Title, Text} = Typography;
const {TextArea} = Input;


const AhCounter = ({speakerKeyState, speakersListState, speechTypeState, speakerNameState}) => {
    const screens = Grid.useBreakpoint();
    const [messageApi, contextHolder] = message.useMessage();

    const [retrievedCustomFiller, setRetrievedCustomFiller] = useState('');
    const handleCustomFillerInputChange = (input) => {
        setRetrievedCustomFiller(input.target.value.toLowerCase());
    }

    const [fillerList, setFillerList] = useState([]);

    // Helper function to add a filler
    const addFiller = (filler) => {
        if (!filler) return;
        setFillerList(prevList => {
            const existing = prevList.find(item => item.key === filler);
            return existing
              ? prevList.map(item => item.key === filler ? {...item, count: item.count + 1} : item)
              : [...prevList, { key: filler, filler: filler, count: 1 }];
        });
    };

    const handleAddFillerButton = () => {
        addFiller(retrievedCustomFiller);
        setRetrievedCustomFiller('');
    };

    const handleLibraryButton = (buttonKey) => {
        addFiller(buttonKey);
    };

    const vocalPausesButtons = [
        {pause: 'Um', span: 6},
        {pause: 'Uh', span: 6},
        {pause: 'Er', span: 6},
        {pause: 'Hm', span: 6},
        {pause: 'Long Pause', span: 24}
    ].map(item => <Col xs={12} sm={8} md={item.span} lg={item.span}><Button
        key={item.pause.toLowerCase()}
        color="cyan"
        variant="solid"
        style={{width: "100%"}}
        onClick={() => handleLibraryButton(item.pause.toLowerCase())}
    >{item.pause}</Button></Col>);

    const singleWordsButtons = [
        {word: 'Yeah', span: 6},
        {word: 'OK', span: 6},
        {word: 'So',span: 6},
        {word: 'Well', span: 6},
        {word: 'Now', span: 8},
        {word: 'And', span: 8},
        {word: 'Right', span: 8},
        {word: 'Actually', span: 8},
        {word: 'Basically', span: 8},
        {word: 'Literally', span: 8}
    ].map(item => <Col xs={12} sm={8} md={item.span} lg={item.span}><Button
        key={item.word.toLowerCase()}
        color="purple"
        variant="solid"
        style={{width: "100%"}}
        onClick={() => handleLibraryButton(item.word.toLowerCase())}
    >{item.word}</Button></Col>);

    const phrasesButtons = [
        {phrase: 'You know', span: 12},
        {phrase: 'I mean', span: 12},
        {phrase: 'Kind of', span: 12},
        {phrase: 'Sort of', span: 12},
    ].map(item => <Col xs={12} sm={12} md={item.span} lg={item.span}><Button
        key={item.phrase.toLowerCase()}
        color="gold"
        variant="solid"
        style={{width: "100%"}}
        onClick={() => handleLibraryButton(item.phrase.toLowerCase())}
    >{item.phrase}</Button></Col>);

    const [commentsValue, setCommentsValue] = useState('');
    const handleCommentsInput = (input) => {
        setCommentsValue(input.target.value);
    };

    const handleResetFeedbackButton = () => {
        setRetrievedCustomFiller('')
        setFillerList([]);
        setCommentsValue('');
        localStorage.removeItem('toastmasters-ah-counter');
    }

    const [logs, setLogs] = useState('');

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedData = localStorage.getItem('toastmasters-ah-counter');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                if (parsedData.fillerList) setFillerList(parsedData.fillerList);
                if (parsedData.commentsValue) setCommentsValue(parsedData.commentsValue);
                if (parsedData.logs) setLogs(parsedData.logs);
            } catch (error) {
                console.error('Error parsing saved Ah-Counter data:', error);
            }
        }
    }, []);

    // Save data to localStorage whenever state changes
    useEffect(() => {
        const dataToSave = {
            fillerList,
            commentsValue,
            logs
        };
        localStorage.setItem('toastmasters-ah-counter', JSON.stringify(dataToSave));
    }, [fillerList, commentsValue, logs]);

    // Tour functionality
    const [isTourOpen, setIsTourOpen] = useState(false);
    const speakerSectionRef = useRef(null);
    const fillerButtonsRef = useRef(null);
    const customFillerRef = useRef(null);
    const fillerTableRef = useRef(null);
    const feedbackRef = useRef(null);
    const logsRef = useRef(null);

    const tourSteps = [
        {
            title: 'Welcome to Ah-Counter! 🔊',
            description: 'Track filler words, sounds, and pauses during Toastmasters speeches to help speakers improve.',
            target: null,
        },
        {
            title: 'Speaker Information',
            description: 'Start by selecting the speaker and speech type you\'re tracking.',
            target: () => speakerSectionRef.current,
        },
        {
            title: 'Quick Filler Buttons',
            description: 'Use these preset buttons to quickly track common filler words and sounds.',
            target: () => fillerButtonsRef.current,
        },
        {
            title: 'Custom Filler Words',
            description: 'Add your own filler words that aren\'t in the preset list.',
            target: () => customFillerRef.current,
        },
        {
            title: 'Filler Count Table',
            description: 'Track counts for each filler word. Click + to increment counts during the speech.',
            target: () => fillerTableRef.current,
        },
        {
            title: 'Feedback & Comments',
            description: 'Add overall comments about the speaker\'s filler word usage and log your feedback.',
            target: () => feedbackRef.current,
        },
        {
            title: 'Meeting Logs',
            description: 'Review all logged feedback and export or reset logs as needed.',
            target: () => logsRef.current,
        },
    ];
    const handleLogFeedbackButton = () => {
        if (speechTypeState.var !== '' && speakerNameState.var !== '') {
            let feedback = `---- ${speakerNameState.var} (${speechTypeState.var}) ----\n${fillerList.map(item => `${item.filler}: ${item.count}`).join('; ')}\nComments: ${commentsValue}\n`;

            setLogs(prevLogs => prevLogs + feedback + '\n')

            handleResetFeedbackButton()
            speechTypeState.func('');
            speakerNameState.func('');

            messageApi.open({type: 'success', content: "Feedback Added Successfully"});

        } else {
            messageApi.open({type: 'error', content: "Missing Speaker's Info !!"});
        }
    }


    return (
        <>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/images/ah_counter.jpg)',
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
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                zIndex: 1
            }}></div>
            <Row justify="center" align="top" gutter={[16, 24]} style={{marginTop: 32, position: 'relative', zIndex: 2, flex: 1}}>
        {contextHolder}
        <SpeakerSection
            speakerKeyState={speakerKeyState}
            speakersListState={speakersListState}
            speechTypeState={speechTypeState}
            speakerNameState={speakerNameState}
            ref={speakerSectionRef}
        />
        <Col className="gutter-row" xs={24} md={14} lg={10}>
            <Row style={{width: '100%'}}>
                <div style={{...cardStyle, width: '100%'}}>
                    <Title level={4}>Current Speech</Title>
                    <Flex gap="large" vertical>
                        <Descriptions items={[{
                            key: '1', label: 'Speech Type', children: speechTypeState.var,
                        }, {
                            key: '2', label: 'Speaker', children: speakerNameState.var,
                        },]}/>
                        <Divider size='small'>Feedback</Divider>
                        <Row gutter={[0, 16]} justify="center" align="middle">
                            <Col xs={24} sm={10}>
                                <Text type="strong">Add Custom Fillers :</Text>
                            </Col>
                            <Col xs={24} sm={14} ref={customFillerRef}>
                                <Flex gap="small">
                                    <Input
                                        placeholder="Input text and Hit Enter to add"
                                        value={retrievedCustomFiller}
                                        onChange={handleCustomFillerInputChange}
                                        onPressEnter={handleAddFillerButton}
                                        style={{ flex: 1 }}
                                    />
                                    <Button type='primary'
                                            onClick={handleAddFillerButton}
                                            style={{minWidth: '80px', flexShrink: 0}}
                                    >Add</Button>
                                </Flex>
                            </Col>
                            <Col span={24} ref={fillerTableRef}>
                            <Table
                                dataSource={fillerList}
                                pagination={false}
                                style={{width: '100%'}}
                                size="small"
                                scroll={{ x: true }}
                                columns={[{
                                    title: 'Filler', dataIndex: 'filler', key: 'filler'
                                }, {
                                    title: 'Count', dataIndex: 'count', key: 'count', align: 'center'
                                }, {
                                    title: 'Action',
                                    dataIndex: 'action',
                                    align: 'center',
                                    render: (_, record) => (<PlusCircleTwoTone
                                        style={tableIconStyle}
                                        onClick={() => addFiller(record.key)}
                                    />),
                                }]}/>
                            </Col>
                            <Col span={10}>
                                <Text type="strong">Overall Comments :</Text>
                            </Col>
                            <Col span={14}>
                                <Flex gap={6} vertical>
                                    <TextArea
                                        placeholder="Add comments here"
                                        autoSize={{minRows: 2, maxRows: 4}}
                                        value={commentsValue}
                                        onChange={handleCommentsInput}
                                    />
                                </Flex>
                            </Col>
                        </Row>
                        <Flex justify="space-between" gap="small" wrap ref={feedbackRef}>
                            <Button type='primary' danger
                                    onClick={handleResetFeedbackButton}
                                    style={{minWidth: '120px'}}
                            >Reset Feedback</Button>
                            <Button
                                type='primary'
                                onClick={handleLogFeedbackButton}
                                style={{minWidth: '120px'}}
                            >Log Feedback</Button>
                        </Flex>
                    </Flex>
                </div>
            </Row>
            <Row style={{width: '100%', marginTop: 16}} ref={logsRef}>
                <LogSection page={"ahcounter"} logs={logs} setLogs={setLogs}/>
            </Row>
        </Col>
        <Col className="gutter-row" xs={24} md={10} lg={6}>
            <div style={{...cardStyle, width: '100%'}}>
                <Title level={5}>Fillers Library</Title>
                <Text type="secondary">Use this section to add common fillers during speech</Text>
                <Collapse
                    defaultActiveKey={screens.xs ? [] : ['1']}
                    ghost
                    items={[
                        {
                            key: '1',
                            label: 'Show/Hide Fillers',
                            children: (
                                <div ref={fillerButtonsRef}>
                                    <Divider>Vocal Pauses</Divider>
                                    <Row gutter={[8, 16]} justify="center">{vocalPausesButtons}</Row>
                                    <Divider>Single Words</Divider>
                                    <Row gutter={[8, 16]} justify="center">{singleWordsButtons}</Row>
                                    <Divider>Phrases</Divider>
                                    <Row gutter={[8, 16]} justify="center">{phrasesButtons}</Row>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </Col>
    </Row>
    
    {/* Tour Button with Affix */}
    <div style={{ 
        position: 'absolute', 
        right: screens.xs ? 16 : 24, 
        top: 10,
        zIndex: 1001 
    }}>
        <Affix offsetTop={10}>
            <Button 
                shape="circle"
                type="primary" 
                size={screens.xs ? "middle" : "large"}
                icon={<HelpCircle size={screens.xs ? 16 : 20} />}
                title="Start tour"
                onClick={() => setIsTourOpen(true)}
                style={{
                    width: screens.xs ? 40 : 48,
                    height: screens.xs ? 40 : 48,
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
                }}
            />
        </Affix>
    </div>
    
    {/* Interactive Tour */}
    <Tour
        open={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        steps={tourSteps}
        type="primary"
        zIndex={1002}
    />
        </>
    )
}


export {AhCounter};
