import React, {useState, forwardRef} from 'react';
import {Typography, Flex, Select, Input, Row, Button, Divider, Table, Space, message, Col, Grid} from 'antd';

import {MinusCircleTwoTone, PlusCircleTwoTone, RightCircleTwoTone} from '@ant-design/icons';
import {cardStyle, buttonIconStyle, tableIconStyle} from '../styles/styles';
import {SPEECH_TYPES} from '../constants/speechTiming';

const {Title, Text} = Typography;

const SpeakerSection = forwardRef(({speakerKeyState, speakersListState, speechTypeState, speakerNameState, style}, ref) => {
    const [messageApi, contextHolder] = message.useMessage();
    const screens = Grid.useBreakpoint();

    const [retrievedSpeechType, setRetrievedSpeechType] = useState('Ice Breaker');
    const handleSpeechTypeSelectChange = (value) => {
        setRetrievedSpeechType(value);
    };

    const [retrievedSpeakerValue, setRetrievedSpeakerValue] = useState('');
    const handleSpeakerInputChange = (input) => {
        setRetrievedSpeakerValue(input.target.value);
    };

    // Helper function to update current speech details and show success message.
    const updateCurrentSpeech = (type, speaker, successMsg) => {
        speechTypeState.func(type);
        speakerNameState.func(speaker);
        messageApi.open({type: 'success', content: successMsg});
    };

    const handleUpdateButton = () => {
        if (retrievedSpeakerValue !== '') {
            updateCurrentSpeech(retrievedSpeechType, retrievedSpeakerValue, "Updated Current Speech");
            setRetrievedSpeakerValue('');
        } else {
            messageApi.open({type: 'error', content: "Missing Speaker's Name !!"});
        }
    };

    const handleAddButton = () => {
        if (retrievedSpeakerValue !== '') {
            speakersListState.func(prevList => [
                ...prevList,
                {key: speakerKeyState.var.toString(), speechType: retrievedSpeechType, speaker: retrievedSpeakerValue}
            ]);
            speakerKeyState.func(key => key + 1);
            updateCurrentSpeech(retrievedSpeechType, retrievedSpeakerValue, "Speaker's Info added to the List");
            setRetrievedSpeakerValue('');
        } else {
            messageApi.open({type: 'error', content: "Missing Speaker's Name !!"});
        }
    };

    const handleDelete = (key) => {
        speakersListState.func(prevData => prevData.filter(item => item.key !== key));
        messageApi.open({type: 'warning', content: "Speaker Removed!"});
    };

    const handleInsert = (key) => {
        speakersListState.func(prevData => {
            const itemToInsert = prevData.find(item => item.key === key);
            if (itemToInsert) {
                const {speechType, speaker} = itemToInsert;
                updateCurrentSpeech(speechType, speaker, "Updated Current Speech from List");
                const newList = prevData.filter(item => item.key !== key);
                return newList;
            }
            return prevData;
        });
    };

    return (
        <Col className="gutter-row" xs={24} md={24} lg={6} style={{marginBottom: 24, ...style}} ref={ref}>
            <div style={cardStyle}>
                {contextHolder}
                <Title level={5}>Speaker's Info</Title>
                <Flex gap="middle" vertical>
                    <Text type="secondary">Add speaker to list or update to current speech</Text>
                    <Select
                        style={{width: '100%'}}
                        defaultValue="Ice Breaker"
                        onChange={handleSpeechTypeSelectChange}
                        options={SPEECH_TYPES}
                    />
                    <Input placeholder="Enter Speaker's Name" onChange={handleSpeakerInputChange}
                           value={retrievedSpeakerValue}/>
                    {screens.xs ? (
                        // Mobile layout - stacked buttons
                        <Flex gap="small" vertical>
                            <Button onClick={handleAddButton} block>
                                Add to List
                                <PlusCircleTwoTone twoToneColor="#73d13d" style={buttonIconStyle}/>
                            </Button>
                            <Button onClick={handleUpdateButton} block>
                                Update
                                <RightCircleTwoTone style={buttonIconStyle}/>
                            </Button>
                        </Flex>
                    ) : (
                        // Desktop layout - side by side with OR
                        <Row gutter={16} align="middle">
                            <Col flex="1">
                                <Button onClick={handleAddButton} block>
                                    Add to List
                                    <PlusCircleTwoTone twoToneColor="#73d13d" style={buttonIconStyle}/>
                                </Button>
                            </Col>
                            <Col>
                                <Text type="secondary" style={{ fontSize: '14px', fontWeight: 'normal' }}>OR</Text>
                            </Col>
                            <Col flex="1">
                                <Button onClick={handleUpdateButton} block>
                                    Update
                                    <RightCircleTwoTone style={buttonIconStyle}/>
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Flex>
                <Divider/>
                <Title level={5}>Speakers' List</Title>
                <Flex gap="small" vertical>
                    <Text type="secondary">Use this list to update speaker to current speech</Text>
                    <Table
                        dataSource={speakersListState.var}
                        pagination={false}
                        size="small"
                        style={{ width: '100%' }}
                        scroll={{ x: true }}
                        columns={[{
                            title: 'Speech Type', dataIndex: 'speechType', key: 'speechType',
                        }, {
                            title: 'Speaker', dataIndex: 'speaker', key: 'speaker',
                        }, {
                            title: 'Action', dataIndex: 'action', render: (_, record) => (<Space>
                                <MinusCircleTwoTone
                                    style={tableIconStyle}
                                    twoToneColor="#ff4d4f"
                                    onClick={() => handleDelete(record.key)}
                                />
                                <RightCircleTwoTone
                                    style={tableIconStyle}
                                    onClick={() => handleInsert(record.key)}
                                />
                            </Space>),
                        }]}/>
                </Flex>
            </div>
        </Col>)
});

export {SpeakerSection}
