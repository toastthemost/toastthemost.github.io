import {Typography, Flex, Descriptions, Divider, Row, Col, Checkbox, Space, Input, Button, Radio, message, Tour, Grid, Affix } from 'antd';
import {cardStyle} from '../styles/styles';
import React, {useState, useRef, useEffect} from "react";
import {LogSection} from "./Logger";
import {SpeakerSection} from "./SpeakersContent";
import {HelpCircle} from 'lucide-react';

const {Title, Text} = Typography;
const {TextArea} = Input;

const Grammarian = ({speakerKeyState, speakersListState, speechTypeState, speakerNameState}) => {
        const [messageApi, contextHolder] = message.useMessage();
        const screens = Grid.useBreakpoint();

        const options = [
            {label: 'Basic', value: 'Basic'},
            {label: 'Good', value: 'Good'},
            {label: 'Excellent', value: 'Excellent'},
        ];

        const [usedWordOfDay, setUsedWordOfDay] = useState(false);
        const onWordOfDayUseChange = e => {
            setUsedWordOfDay(e.target.checked);
        };

        const [retrievedQuotesValue, setRetrievedQuotesValue] = useState('');
        const [collectedQuotes, setCollectedQuotesValues] = useState('');
        const [retrievedImproperValue, setRetrievedImproperValue] = useState('');
        const [collectedImproperUsage, setCollectedImproperUsage] = useState('');
        const [overallGrammer, setOverallGrammer] = useState('');
        const [commentsValue, setCommentsValue] = useState('');

        // Helper function to add an item to a collected list.
        const addItem = (value, collected, setCollected, setRetrieved) => {
            if (value !== '') {
                setCollected(collected === '' ? value : collected + '; ' + value);
                setRetrieved('');
            }
        };

        // Updated to use addItem helper.
        const handleQuotesButton = () => {
            addItem(retrievedQuotesValue, collectedQuotes, setCollectedQuotesValues, setRetrievedQuotesValue);
        };

        const handleImproperUsageButton = () => {
            addItem(retrievedImproperValue, collectedImproperUsage, setCollectedImproperUsage, setRetrievedImproperValue);
        };

        const handleOverallGrammerChange = (input) => {
            setOverallGrammer(input.target.value);
        };

        const handleCommentsInput = (input) => {
            setCommentsValue(input.target.value);
        };

        const handleResetFeedbackButton = () => {
            setUsedWordOfDay(false);
            setRetrievedImproperValue('');
            setCollectedImproperUsage('');
            setRetrievedQuotesValue('');
            setCollectedQuotesValues('');
            setOverallGrammer(null);
            setCommentsValue('');
            localStorage.removeItem('toastmasters-grammarian');
        };

        const [logs, setLogs] = useState('');

        // Load data from localStorage on component mount
        useEffect(() => {
            const savedData = localStorage.getItem('toastmasters-grammarian');
            if (savedData) {
                try {
                    const parsedData = JSON.parse(savedData);
                    if (parsedData.collectedQuotes) setCollectedQuotesValues(parsedData.collectedQuotes);
                    if (parsedData.collectedImproperUsage) setCollectedImproperUsage(parsedData.collectedImproperUsage);
                    if (parsedData.overallGrammer) setOverallGrammer(parsedData.overallGrammer);
                    if (parsedData.commentsValue) setCommentsValue(parsedData.commentsValue);
                    if (parsedData.logs) setLogs(parsedData.logs);
                } catch (error) {
                    console.error('Error parsing saved Grammarian data:', error);
                }
            }
        }, []);

        // Save data to localStorage whenever state changes
        useEffect(() => {
            const dataToSave = {
                collectedQuotes,
                collectedImproperUsage,
                overallGrammer,
                commentsValue,
                logs
            };
            localStorage.setItem('toastmasters-grammarian', JSON.stringify(dataToSave));
        }, [collectedQuotes, collectedImproperUsage, overallGrammer, commentsValue, logs]);

        // Tour functionality
        const [isTourOpen, setIsTourOpen] = useState(false);
        const speakerSectionRef = useRef(null);
        const wordOfDayRef = useRef(null);
        const quotesRef = useRef(null);
        const grammarRef = useRef(null);
        const feedbackButtonsRef = useRef(null);
        const logsRef = useRef(null);

        const tourSteps = [
            {
                title: 'Welcome to Grammarian! 📝',
                description: 'Track grammar, word usage, and language quality during Toastmasters meetings.',
                target: null,
            },
            {
                title: 'Speaker Information',
                description: 'Select the current speaker and speech type before taking notes.',
                target: () => speakerSectionRef.current,
            },
            {
                title: 'Word of the Day',
                description: 'Check if the speaker used the word of the day in their speech.',
                target: () => wordOfDayRef.current,
            },
            {
                title: 'Quotes & Thoughts',
                description: 'Collect memorable quotes, thoughts, words, or sayings from the speech.',
                target: () => quotesRef.current,
            },
            {
                title: 'Grammar Assessment',
                description: 'Rate the overall grammar and language quality, and add specific feedback.',
                target: () => grammarRef.current,
            },
            {
                title: 'Save Feedback',
                description: 'Log your feedback or reset the form to start fresh with the next speaker.',
                target: () => feedbackButtonsRef.current,
            },
            {
                title: 'Meeting Logs',
                description: 'Review all logged feedback and export or reset as needed.',
                target: () => logsRef.current,
            },
        ];
        const handleLogFeedbackButton = () => {
            if (speechTypeState.var !== '' && speakerNameState.var !== '') {

                let usedWordOfDayText = usedWordOfDay ? 'Used' : 'Not Used';
                let feedback = `---- ${speakerNameState.var} (${speechTypeState.var}) ----\nWord of the Day: ${usedWordOfDayText}\nQuotes\\Thoughts\\Words\\Sayings: ${collectedQuotes}\nImproper Grammer/Language use: ${collectedImproperUsage}\nOverall Grammer and Language: ${overallGrammer}\nComments: ${commentsValue}\n`;

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
                    backgroundImage: 'url(/images/grammer.jpg)',
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
                <Row align="center" gutter={24} style={{marginTop: 32, position: 'relative', zIndex: 2, flex: 1}}>
                {contextHolder}
                <SpeakerSection
                    speakerKeyState={speakerKeyState}
                    speakersListState={speakersListState}
                    speechTypeState={speechTypeState}
                    speakerNameState={speakerNameState}
                    ref={speakerSectionRef}
                />
                <Col className="gutter-row" xs={24} md={24} lg={12}>
                    <Row style={{width: '100%'}}>
                        <div style={{...cardStyle, width: '100%'}}>
                            <Title level={4}>Current Speech</Title>
                            <Flex gap="large" vertical>
                                <Descriptions items={[
                                    {
                                        key: '1',
                                        label: 'Speech Type',
                                        children: speechTypeState.var,
                                    },
                                    {
                                        key: '2',
                                        label: 'Speaker',
                                        children: speakerNameState.var,
                                    },
                                ]}/>
                                <Divider size='small'>Feedback</Divider>
                                <Row gutter={[16, 16]} justify="center" align="middle">
                                    <Col xs={24} sm={10}>
                                        <Text type="strong">Word of the day :</Text>
                                    </Col>
                                    <Col xs={24} sm={14} ref={wordOfDayRef}>
                                        <Checkbox checked={usedWordOfDay} onChange={onWordOfDayUseChange}>Used?</Checkbox>
                                    </Col>
                                    <Col xs={24} sm={10}>
                                        <Text type="strong">Quotes/Thoughts/Words/Sayings :</Text>
                                    </Col>
                                    <Col xs={24} sm={14} ref={quotesRef}>
                                        <Flex gap="small" vertical>
                                            <Space.Compact style={{width: '100%'}}>
                                                <Input
                                                    placeholder="Input text and Hit Enter to add"
                                                    value={retrievedQuotesValue}
                                                    onChange={e => setRetrievedQuotesValue(e.target.value)}
                                                    onPressEnter={handleQuotesButton}
                                                />
                                                <Button type='primary' onClick={handleQuotesButton}>Add</Button>
                                            </Space.Compact>
                                            {collectedQuotes !== '' ? <div>{collectedQuotes}</div> : ''}
                                        </Flex>
                                    </Col>
                                    <Col xs={24} sm={10}>
                                        <Text type="strong">Improper Grammer/Language use :</Text>
                                    </Col>
                                    <Col xs={24} sm={14}>
                                        <Flex gap="small" vertical>
                                            <Space.Compact style={{width: '100%'}}>
                                                <Input
                                                    placeholder="Input text and Hit Enter to add"
                                                    value={retrievedImproperValue}
                                                    onChange={e => setRetrievedImproperValue(e.target.value)}
                                                    onPressEnter={handleImproperUsageButton}
                                                />
                                                <Button type='primary' onClick={handleImproperUsageButton}>Add</Button>
                                            </Space.Compact>
                                            {collectedImproperUsage !== '' ? <div>{collectedImproperUsage}</div> : ''}
                                        </Flex>
                                    </Col>
                                    <Col xs={24} sm={10}>
                                        <Text type="strong">Overall Grammer and Language :</Text>
                                    </Col>
                                    <Col xs={24} sm={14} ref={grammarRef}>
                                        <Radio.Group
                                            block
                                            options={options}
                                            value={overallGrammer}
                                            optionType="button"
                                            buttonStyle="solid"
                                            onChange={handleOverallGrammerChange}
                                        />
                                    </Col>
                                    <Col xs={24} sm={10}>
                                        <Text type="strong">Overall Comments :</Text>
                                    </Col>
                                    <Col xs={24} sm={14}>
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
                                <Flex justify="space-between" gap="middle" wrap ref={feedbackButtonsRef}>
                                    <Button type='primary' danger onClick={handleResetFeedbackButton}
                                            style={{minWidth: '120px'}}>Reset
                                        Feedback</Button>
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
                        <LogSection page={"grammarian"} logs={logs} setLogs={setLogs}/>
                    </Row>
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
;

export {Grammarian};
