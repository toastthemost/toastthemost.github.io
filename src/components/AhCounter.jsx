import {
    Typography, Flex, Descriptions, Divider, Row, Col, Space, Input, Button, message, Table
} from 'antd';
import {cardStyle, tableIconStyle} from '../styles/styles';
import React, {useState} from "react";
import {PlusCircleTwoTone} from '@ant-design/icons';
import {LogSection} from "./Logger";
import {SpeakerSection} from "./SpeakersContent";


const {Title, Text} = Typography;
const {TextArea} = Input;


const AhCounter = ({speakerKeyState, speakersListState, speechTypeState, speakerNameState}) => {
    const [messageApi, contextHolder] = message.useMessage();

    const [retrievedCustomFiller, setRetrievedCustomFiller] = useState('');
    const handleCustomFillerInputChange = (input) => {
        setRetrievedCustomFiller(input.target.value.toLowerCase());
    }

    const [fillerList, setFillerList] = useState([]);

    const handleIncrement = (key) => {
        setFillerList(prevList => prevList.map(item => item.key === key ? {...item, count: item.count + 1} : item));
    }

    const handleAddFillerButton = () => {
        const fillerExists = fillerList.find(item => item.key === retrievedCustomFiller);
        if (fillerExists) {
            handleIncrement(retrievedCustomFiller);
        } else {
            setFillerList(prevList => [...prevList, {
                key: retrievedCustomFiller, filler: retrievedCustomFiller, count: 1
            }]);
        }

        setRetrievedCustomFiller('')
    }

    const handleLibraryButton = buttonKey => {
        const fillerExists = fillerList.find(item => item.key === buttonKey);
        if (fillerExists) {
            handleIncrement(buttonKey);
        } else {
            setFillerList(prevList => [...prevList, {
                key: buttonKey, filler: buttonKey, count: 1
            }]);
        }
    }

    const vocalPausesButtons = [
        {pause: 'Um', span: 6},
        {pause: 'Uh', span: 6},
        {pause: 'Er', span: 6},
        {pause: 'Hm', span: 6},
        {pause: 'Long Pause', span: 24}
    ].map(item => <Col span={item.span}><Button
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
    ].map(item => <Col span={item.span}><Button
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
    ].map(item => <Col span={item.span}><Button
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
    }

    const [logs, setLogs] = useState('');
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


    return (<Row align="center" gutter={24} style={{marginTop: 32}}>
        {contextHolder}
        <SpeakerSection
            speakerKeyState={speakerKeyState}
            speakersListState={speakersListState}
            speechTypeState={speechTypeState}
            speakerNameState={speakerNameState}
        />
        <Col className="gutter-row" span={10}>
            <Row>
                <div style={cardStyle}>
                    <Title level={4}>Current Speech</Title>
                    <Flex gap="large" vertical>
                        <Descriptions items={[{
                            key: '1', label: 'Speech Type', children: speechTypeState.var,
                        }, {
                            key: '2', label: 'Speaker', children: speakerNameState.var,
                        },]}/>
                        <Divider size='small'>Feedback</Divider>
                        <Row gutter={[0, 16]} justify="center" align="middle">
                            <Col span={10}>
                                <Text type="strong">Add Custom Fillers :</Text>
                            </Col>
                            <Col span={14}>
                                <Flex gap="small" vertical>
                                    <Space.Compact style={{width: '100%'}}>
                                        <Input
                                            placeholder="Input text and Hit Enter to add"
                                            value={retrievedCustomFiller}
                                            onChange={handleCustomFillerInputChange}
                                            onPressEnter={handleAddFillerButton}
                                        />
                                        <Button type='primary'
                                                onClick={handleAddFillerButton}
                                        >Add</Button>
                                    </Space.Compact>
                                </Flex>
                            </Col>
                            <Table
                                dataSource={fillerList}
                                pagination={false}
                                style={{width: '100%'}}
                                size="small"
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
                                        onClick={() => handleIncrement(record.key)}
                                    />),
                                }]}/>
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
                            <Button type='primary' danger
                                    onClick={handleResetFeedbackButton}
                            >Reset Feedback</Button>
                            <Button
                                type='primary'
                                onClick={handleLogFeedbackButton}
                            >Log Feedback</Button>
                        </Row>
                    </Flex>
                </div>
            </Row>
            <Row>
                <LogSection page={"ahcounter"} logs={logs} setLogs={setLogs}/>
            </Row>
        </Col>
        <Col className="gutter-row" span={6}>
            <div style={cardStyle}>
                <Title level={5}>Fillers Library</Title>
                <Text type="secondary">Use this section to add common fillers during speech</Text>
                <Divider>Vocal Pauses</Divider>
                <Row gutter={[8, 16]} justify="center">{vocalPausesButtons}</Row>
                <Divider>Single Words</Divider>
                <Row gutter={[8, 16]} justify="center">{singleWordsButtons}</Row>
                <Divider>Phrases</Divider>
                <Row gutter={[8, 16]} justify="center">{phrasesButtons}</Row>
            </div>
        </Col>
    </Row>)
}


export {AhCounter};