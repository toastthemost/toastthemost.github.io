import {Typography, Flex, Descriptions, Divider, Row, Col, Checkbox, Space, Input, Button, Radio, message, FloatButton, Tooltip } from 'antd';
import {cardStyle} from '../styles/styles';
import React, {useState} from "react";
import {LogSection} from "./Logger";
import {SpeakerSection} from "./SpeakersContent";
import { QuestionCircleOutlined } from '@ant-design/icons';

const {Title, Text} = Typography;
const {TextArea} = Input;

const Grammarian = ({speakerKeyState, speakersListState, speechTypeState, speakerNameState}) => {
        const [messageApi, contextHolder] = message.useMessage();

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
        };

        const [logs, setLogs] = useState('');
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
            <Row align="center" gutter={24} style={{marginTop: 32}}>
                {contextHolder}
                <FloatButton tooltip="Start tour" icon={<QuestionCircleOutlined />} type="primary" style={{ insetInlineEnd: 24 }} />
                <SpeakerSection
                    speakerKeyState={speakerKeyState}
                    speakersListState={speakersListState}
                    speechTypeState={speechTypeState}
                    speakerNameState={speakerNameState}
                />
                <Col xs={24} md={12}>
                    <Row>
                        <div style={cardStyle}>
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
                                <Row gutter={[0, 16]} justify="center" align="middle">
                                    <Col span={10}>
                                        <Text type="strong">Word of the day :</Text>
                                    </Col>
                                    <Col span={14}>
                                        <Checkbox checked={usedWordOfDay} onChange={onWordOfDayUseChange}>Used?</Checkbox>
                                    </Col>
                                    <Col span={10}>
                                        <Text type="strong">Quotes/Thoughts/Words/Sayings :</Text>
                                    </Col>
                                    <Col span={14}>
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
                                    <Col span={10}>
                                        <Text type="strong">Improper Grammer/Language use :</Text>
                                    </Col>
                                    <Col span={14}>
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
                                    <Col span={10}>
                                        <Text type="strong">Overall Grammer and Language :</Text>
                                    </Col>
                                    <Col span={14}>
                                        <Radio.Group
                                            block
                                            options={options}
                                            value={overallGrammer}
                                            optionType="button"
                                            buttonStyle="solid"
                                            onChange={handleOverallGrammerChange}
                                        />
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
                                <Row justify="space-between">
                                    <Button type='primary' danger onClick={handleResetFeedbackButton}>Reset
                                        Feedback</Button>
                                    <Button
                                        type='primary'
                                        onClick={handleLogFeedbackButton}
                                    >Log Feedback</Button>
                                </Row>
                            </Flex>
                        </div>
                    </Row>
                    <Row>
                        <LogSection page={"grammarian"} logs={logs} setLogs={setLogs}/>
                    </Row>
                </Col>
            </Row>
        )
    }
;

export {Grammarian};
