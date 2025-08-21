import { Typography, Flex, Collapse, Divider, Row, Col, Checkbox, Input, Button, message } from 'antd';
import { LogSection } from "./Logger";
import { buttonIconStyle, cardStyle } from "../styles/styles";
import React, { useState } from "react";
import { UserDeleteOutlined, UserAddOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const { Title, Text } = Typography;
const { TextArea } = Input;

export const GeneralEvaluator = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [formState, setFormState] = useState({
        isRoomEquipmentOK: false,
        meetingStartOnTime: false,
        beforeMeetingCommentsValue: '',
        guestsWelcomed: false,
        preparedPO: false,
        everyoneIntroduced: false,
        TMoDIntroduced: false,
        meetingOpeningCommentsValue: '',
        allRolesFilled: false,
        explainedTheme: false,
        informedMeetingFormat: false,
        introducedGE: false,
        smoothlyTransitioned: false,
        introducedTT: false,
        TMoDCommentsValue: '',
        explainedTT: false,
        choseAlignedTopics: false,
        priorityWithoutRoles: false,
        engagedGuests: false,
        managedTiming: false,
        returnedControl: false,
        TTMCommentsValue: ''
    });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormState(prev => ({ ...prev, [name]: checked }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const [SAA, setSAA] = useState('Placeholder');
    const [PO, setPO] = useState('Placeholder');
    const [TMoD, setTMoD] = useState('Placeholder');
    const [GE, setGE] = useState('Placeholder');
    const [grammarian, setGrammarian] = useState('Placeholder');
    const [timekeeper, setTimekeeper] = useState('Placeholder');
    const [ahCounter, setAhCounter] = useState('Placeholder');
    const [TTM, setTTM] = useState('Placeholder');

    const [evaluatorIndex, setEvaluatorIndex] = useState(1);
    const handleAddEvaluatorButton = () => {
        setEvaluatorIndex(index => index + 1 );
    };
    const handleDeleteEvaluatorButton = () => {
        setEvaluatorIndex(index => index - 1 );
    };

    // Define panel contents to reduce repetition for general sections.
    const panels = [
      {
          key: '1',
          header: "Before the meeting",
          content: (
              <Flex gap="small" vertical>
                  <Checkbox name="isRoomEquipmentOK" checked={formState.isRoomEquipmentOK} onChange={handleCheckboxChange}>
                      Was the room and equipment set up on time?
                  </Checkbox>
                  <Checkbox name="meetingStartOnTime" checked={formState.meetingStartOnTime} onChange={handleCheckboxChange}>
                      Did the meeting start on time?
                  </Checkbox>
                  <TextArea
                      name="beforeMeetingCommentsValue"
                      placeholder="Add comments here"
                      autoSize={{ minRows: 2, maxRows: 2 }}
                      value={formState.beforeMeetingCommentsValue}
                      onChange={handleInputChange}
                  />
              </Flex>
          )
      },
      {
          key: '2',
          header: "Meeting Opening",
          content: (
              <Flex gap="small" vertical>
                  <Checkbox name="guestsWelcomed" checked={formState.guestsWelcomed} onChange={handleCheckboxChange}>
                      Were guests welcomed upon arrival?
                  </Checkbox>
                  <Checkbox name="preparedPO" checked={formState.preparedPO} onChange={handleCheckboxChange}>
                      Was the presiding officer prepared and organized?
                  </Checkbox>
                  <Checkbox name="everyoneIntroduced" checked={formState.everyoneIntroduced} onChange={handleCheckboxChange}>
                      Was everyone properly introduced?
                  </Checkbox>
                  <Checkbox name="TMoDIntroduced" checked={formState.TMoDIntroduced} onChange={handleCheckboxChange}>
                      Was the Toastmaster of the Day properly introduced?
                  </Checkbox>
                  <TextArea
                      name="meetingOpeningCommentsValue"
                      placeholder="Add comments here"
                      autoSize={{ minRows: 2, maxRows: 2 }}
                      value={formState.meetingOpeningCommentsValue}
                      onChange={handleInputChange}
                  />
              </Flex>
          )
      },
      {
          key: '3',
          header: "Toastmaster of the Day",
          content: (
              <Flex gap="small" vertical>
                  <Checkbox name="allRolesFilled" checked={formState.allRolesFilled} onChange={handleCheckboxChange}>
                      Filled all roles prior to the meeting starting?
                  </Checkbox>
                  <Checkbox name="explainedTheme" checked={formState.explainedTheme} onChange={handleCheckboxChange}>
                      Introduced and explained the meeting theme?
                  </Checkbox>
                  <Checkbox name="informedMeetingFormat" checked={formState.informedMeetingFormat} onChange={handleCheckboxChange}>
                      Informed about meeting format?
                  </Checkbox>
                  <Checkbox name="introducedGE" checked={formState.introducedGE} onChange={handleCheckboxChange}>
                      Introduced the General Evaluator properly?
                  </Checkbox>
                  <Checkbox name="smoothlyTransitioned" checked={formState.smoothlyTransitioned} onChange={handleCheckboxChange}>
                      Smoothly transitioned between segments?
                  </Checkbox>
                  <Checkbox name="introducedTT" checked={formState.introducedTT} onChange={handleCheckboxChange}>
                      Introduced the Topics Master properly?
                  </Checkbox>
                  <TextArea
                      name="TMoDCommentsValue"
                      placeholder="Add comments here"
                      autoSize={{ minRows: 2, maxRows: 2 }}
                      value={formState.TMoDCommentsValue}
                      onChange={handleInputChange}
                  />
              </Flex>
          )
      },
      {
          key: '4',
          header: "Table Topic Section",
          content: (
              <Flex gap="small" vertical>
                  <Checkbox name="explainedTT" checked={formState.explainedTT} onChange={handleCheckboxChange}>
                      Explained Table Topics purpose and timing?
                  </Checkbox>
                  <Checkbox name="choseAlignedTopics" checked={formState.choseAlignedTopics} onChange={handleCheckboxChange}>
                      Chose topics aligned with the theme?
                  </Checkbox>
                  <Checkbox name="priorityWithoutRoles" checked={formState.priorityWithoutRoles} onChange={handleCheckboxChange}>
                      Prioritized members without roles?
                  </Checkbox>
                  <Checkbox name="engagedGuests" checked={formState.engagedGuests} onChange={handleCheckboxChange}>
                      Engaged Guests?
                  </Checkbox>
                  <Checkbox name="managedTiming" checked={formState.managedTiming} onChange={handleCheckboxChange}>
                      Managed timing to stay on schedule?
                  </Checkbox>
                  <Checkbox name="returnedControl" checked={formState.returnedControl} onChange={handleCheckboxChange}>
                      Returned control to the Toastmaster?
                  </Checkbox>
                  <TextArea
                      name="TTMCommentsValue"
                      placeholder="Add comments here"
                      autoSize={{ minRows: 2, maxRows: 2 }}
                      value={formState.TTMCommentsValue}
                      onChange={handleInputChange}
                  />
              </Flex>
          )
      }
    ];

    return (
        <Row align="center" gutter={[8, 16]} style={{ marginTop: 32 }}>
            {contextHolder}
            <Col className="gutter-row" span={8}>
                <div style={cardStyle}>
                    <Title level={4}>Opening Formalities</Title>
                    <Flex gap="small" vertical>
                        <Divider>Roles</Divider>
                        <Flex gap="middle">
                            <Text strong>Sargent At Arms:</Text>
                            <Text editable={{ onChange: setSAA }}>{SAA}</Text>
                        </Flex>
                        <Flex gap="middle">
                            <Text strong>Presiding Officer:</Text>
                            <Text editable={{ onChange: setPO }}>{PO}</Text>
                        </Flex>
                        <Flex gap="middle">
                            <Text strong>Toastmaster of the Day:</Text>
                            <Text editable={{ onChange: setTMoD }}>{TMoD}</Text>
                        </Flex>
                        <Flex gap="middle">
                            <Text strong>Table Topics Master:</Text>
                            <Text editable={{ onChange: setTTM }}>{TTM}</Text>
                        </Flex>
                        <Collapse defaultActiveKey={['1']}>
                            {panels.map(panel => (
                                <Panel header={panel.header} key={panel.key}>
                                    {panel.content}
                                </Panel>
                            ))}
                        </Collapse>
                    </Flex>
                </div>
            </Col>
            <Col className="gutter-row" span={8}>
                <div style={cardStyle}>
                    <Title level={4}>Evaluations</Title>
                    <Button onClick={handleAddEvaluatorButton}>
                        Add Evaluation<UserAddOutlined style={buttonIconStyle} />
                    </Button>
                    <Button onClick={handleDeleteEvaluatorButton} disabled={evaluatorIndex === 0}>
                        Remove Evaluation<UserDeleteOutlined style={buttonIconStyle} />
                    </Button>
                    <Collapse defaultActiveKey={['1']}>
                        {Array.from({ length: evaluatorIndex }, (_, i) => (
                            <Panel header={`Evaluation # ${i + 1}`} key={`${i + 1}`}>
                                <SpeechEvaluator index={i + 1} formState={formState} setFormState={setFormState} />
                            </Panel>
                        ))}
                        <Panel key='Grammarian' header='Grammarian'>
                            {/* ...existing Grammarian content... */}
                        </Panel>
                    </Collapse>
                </div>
            </Col>
        </Row>
    );
};

const SpeechEvaluator = ({ index, formState, setFormState }) => {
    const evaluatorKey = `evaluator-${index}`;
    const state = formState[evaluatorKey] || {};
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormState(prev => ({
            ...prev,
            [evaluatorKey]: {
                ...prev[evaluatorKey],
                [name]: checked
            }
        }));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [evaluatorKey]: {
                ...prev[evaluatorKey],
                [name]: value
            }
        }));
    };

    return (
        <Flex gap="small" vertical>
            <Checkbox name="usedCRC" checked={state.usedCRC || false} onChange={handleCheckboxChange}>
                Used CRC Method?
            </Checkbox>
            <Checkbox name="actionableRecommendation" checked={state.actionableRecommendation || false} onChange={handleCheckboxChange}>
                Were recommendations specific and actionable?
            </Checkbox>
            <Checkbox name="withinTime" checked={state.withinTime || false} onChange={handleCheckboxChange}>
                Delivered evaluations within time?
            </Checkbox>
            <TextArea
                name="speechEvaluationCommentsValue"
                placeholder="Add comments here"
                autoSize={{ minRows: 2, maxRows: 2 }}
                value={state.speechEvaluationCommentsValue || ''}
                onChange={handleInputChange}
            />
        </Flex>
    );
};
