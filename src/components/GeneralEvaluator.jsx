import React, { useMemo, useState, useEffect } from 'react';
import {
    Typography,
    Flex,
    Collapse,
    Divider,
    Row,
    Col,
    Checkbox,
    Input,
    Button,
    Form,
    Grid,
} from 'antd';
import { UserDeleteOutlined, UserAddOutlined, PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { cardStyle } from '../styles/styles';

const { Title, Text } = Typography;
const { TextArea } = Input;

function EditableText({ namePath }) {
    const form = Form.useFormInstance();
    const value = Form.useWatch(namePath, form);
    return (
        <Form.Item name={namePath} noStyle>
            <Text
                editable={{
                    onChange: (str) => form.setFieldValue(namePath, str),
                }}
            >
                {value ?? ''}
            </Text>
        </Form.Item>
    );
}

const sections = [
    {
        key: 'beforeMeeting',
        header: 'Before the meeting',
        fields: [
            { type: 'checkbox', name: 'isRoomEquipmentOK', label: 'Was the room and equipment set up on time?' },
            { type: 'checkbox', name: 'meetingStartOnTime', label: 'Did the meeting start on time?' },
            { type: 'textarea', name: 'beforeMeetingCommentsValue', placeholder: 'Add comments here' },
        ],
    },
    {
        key: 'meetingOpening',
        header: 'Meeting Opening',
        fields: [
            { type: 'checkbox', name: 'guestsWelcomed', label: 'Were guests welcomed upon arrival?' },
            { type: 'checkbox', name: 'preparedPO', label: 'Was the presiding officer prepared and organized?' },
            { type: 'checkbox', name: 'everyoneIntroduced', label: 'Was everyone properly introduced?' },
            { type: 'checkbox', name: 'toastmasterIntroduced', label: 'Was the Toastmaster of the Day properly introduced?' },
            { type: 'textarea', name: 'meetingOpeningCommentsValue', placeholder: 'Add comments here' },
        ],
    },
    {
        key: 'tmod',
        header: 'Toastmaster of the Day',
        fields: [
            { type: 'checkbox', name: 'allRolesFilled', label: 'Filled all roles prior to the meeting starting?' },
            { type: 'checkbox', name: 'explainedTheme', label: 'Introduced and explained the meeting theme?' },
            { type: 'checkbox', name: 'informedMeetingFormat', label: 'Informed about meeting format?' },
            { type: 'checkbox', name: 'introducedGE', label: 'Introduced the General Evaluator properly?' },
            { type: 'checkbox', name: 'smoothlyTransitioned', label: 'Smoothly transitioned between segments?' },
            { type: 'checkbox', name: 'introducedTT', label: 'Introduced the Topics Master properly?' },
            { type: 'textarea', name: 'tmodCommentsValue', placeholder: 'Add comments here' },
        ],
    },
    {
        key: 'tableTopics',
        header: 'Table Topic Section',
        fields: [
            { type: 'checkbox', name: 'explainedTT', label: 'Explained Table Topics purpose and timing?' },
            { type: 'checkbox', name: 'choseAlignedTopics', label: 'Chose topics aligned with the theme?' },
            { type: 'checkbox', name: 'priorityWithoutRoles', label: 'Prioritized members without roles?' },
            { type: 'checkbox', name: 'engagedGuests', label: 'Engaged Guests?' },
            { type: 'checkbox', name: 'managedTiming', label: 'Managed timing to stay on schedule?' },
            { type: 'checkbox', name: 'returnedControl', label: 'Returned control to the Toastmaster?' },
            { type: 'textarea', name: 'ttmCommentsValue', placeholder: 'Add comments here' },
        ],
    },
];

const tagTeamSections = [
    {
        key: 'grammarian',
        header: 'Grammarian',
        fields: [
            { type: 'text', name: 'evaluator', label: 'Grammarian:' },
            { type: 'checkbox', name: 'introducedRoleAndWordClearly', label: 'Introduced the role and Word of the Day clearly?' },
            { type: 'checkbox', name: 'wordChallengingAndThemeRelated', label: 'Was the Word of the Day challenging and theme related?' },
            { type: 'checkbox', name: 'effectiveGrammarUsageFeedback', label: 'Gave feedback on grammar and usage effectively?' },
            { type: 'textarea', name: 'comments', placeholder: 'Add comments here' },
        ],
    },
    {
        key: 'timekeeper',
        header: 'Timekeeper',
        fields: [
            { type: 'text', name: 'evaluator', label: 'Timekeeper:' },
            { type: 'checkbox', name: 'explainedTimingRulesClearly', label: 'Explained the timing rules clearly?' },
            { type: 'checkbox', name: 'signalsAndReportsOnTime', label: 'Gave signals and reports on time?' },
            { type: 'textarea', name: 'comments', placeholder: 'Add comments here' },
        ],
    },
    {
        key: 'ahCounter',
        header: 'Ah-Counter',
        fields: [
            { type: 'text', name: 'evaluator', label: 'Ah-Counter:' },
            { type: 'checkbox', name: 'explainedRoleClearly', label: 'Explained the role clearly?' },
            { type: 'checkbox', name: 'deliveredAccurateReport', label: 'Delivered an accurate report of filler words and crutch phrases?' },
            { type: 'textarea', name: 'comments', placeholder: 'Add comments here' },
        ],
    },
];

const overallSections = [
    {
        key: 'overallMeetingEvaluation',
        header: 'Overall Meeting Evaluation',
        fields: [
            { type: 'checkbox', name: 'meetingFlowTimeManagement', label: 'Meeting Flow & Time Management?' },
            { type: 'checkbox', name: 'engagementEnergyLevels', label: 'Engagement & Energy Levels?' },
            { type: 'checkbox', name: 'technicalIssuesOrLogisticGaps', label: 'Technical Issues or logistic Gaps?' },
            { type: 'checkbox', name: 'audienceInvolvement', label: 'Audience Involvement?' },
            { type: 'textarea', name: 'comments', placeholder: 'Add comments here' },
        ],
    },
];

function SectionPanel({ baseName, section, expandAll, expandSignal }) {
    const [active, setActive] = useState(section.key === 'beforeMeeting');

    useEffect(() => {
        setActive(!!expandAll);
    }, [expandSignal, expandAll]);

    const activeKey = active ? [section.key] : [];

    return (
        <Collapse
            activeKey={activeKey}
            onChange={(keys) => {
                const isOpen = Array.isArray(keys) ? keys.includes(section.key) : keys === section.key;
                setActive(isOpen);
            }}
            items={[{
                key: section.key,
                label: section.header,
                children: (
                    <Flex gap="small" vertical>
                        {section.fields.map((f) => (
                            f.type === 'checkbox' ? (
                                <Form.Item key={f.name} name={[baseName, f.name]} valuePropName="checked" noStyle>
                                    <Checkbox aria-label={f.label}>{f.label}</Checkbox>
                                </Form.Item>
                            ) : f.type === 'text' ? (
                                <Flex key={f.name} gap="middle" align="center">
                                    <Text strong>{f.label}</Text>
                                    <EditableText namePath={[baseName, f.name]} />
                                </Flex>
                            ) : (
                                <Form.Item key={f.name} name={[baseName, f.name]} noStyle>
                                    <TextArea placeholder={f.placeholder} autoSize={{ minRows: 2, maxRows: 2 }} />
                                </Form.Item>
                            )
                        ))}
                    </Flex>
                ),
            }]} />
    );
}

function RolesEditor() {
    return (
        <Flex gap="small" vertical>
            <Divider>Roles</Divider>
            <Flex gap="middle">
                <Text strong>Sergeant at Arms:</Text>
                <EditableText namePath={["roles", "sergeantAtArms"]} />
            </Flex>
            <Flex gap="middle">
                <Text strong>Presiding Officer:</Text>
                <EditableText namePath={["roles", "presidingOfficer"]} />
            </Flex>
            <Flex gap="middle">
                <Text strong>Toastmaster of the Day:</Text>
                <EditableText namePath={["roles", "toastmasterOfTheDay"]} />
            </Flex>
            <Flex gap="middle">
                <Text strong>Table Topics Master:</Text>
                <EditableText namePath={["roles", "tableTopicsMaster"]} />
            </Flex>
        </Flex>
    );
}

function SpeechEvaluator({ namePath }) {
    return (
        <Flex gap="small" vertical>
            <Flex gap="middle" align="center">
                <Text strong>Evaluator:</Text>
                <EditableText namePath={[...namePath, 'evaluator']} />
            </Flex>
            <Flex gap="middle" align="center">
                <Text strong>Speaker:</Text>
                <EditableText namePath={[...namePath, 'speaker']} />
            </Flex>
            <Form.Item name={[...namePath, 'usedCRC']} valuePropName="checked" noStyle>
                <Checkbox>Used CRC Method?</Checkbox>
            </Form.Item>
            <Form.Item name={[...namePath, 'actionableRecommendation']} valuePropName="checked" noStyle>
                <Checkbox>Were recommendations specific and actionable?</Checkbox>
            </Form.Item>
            <Form.Item name={[...namePath, 'withinTime']} valuePropName="checked" noStyle>
                <Checkbox>Delivered evaluations within time?</Checkbox>
            </Form.Item>
            <Form.Item name={[...namePath, 'comments']} noStyle>
                <TextArea placeholder="Add comments here" autoSize={{ minRows: 2, maxRows: 2 }} />
            </Form.Item>
        </Flex>
    );
}

export function GeneralEvaluator() {
    const [form] = Form.useForm();
    const screens = Grid.useBreakpoint();

    // Meeting Sections Expand Control
    const [expandAll, setExpandAll] = useState(false);
    const [expandSignal, setExpandSignal] = useState(0);
    const toggleExpandAll = () => {
        setExpandAll(prev => !prev);
        setExpandSignal(s => s + 1);
    };

    // Evaluation Sections Expand Control
    const [expandAllEvaluations, setExpandAllEvaluations] = useState(false);
    const [expandSignalEvaluations, setExpandSignalEvaluations] = useState(0);
    const toggleExpandAllEvaluations = () => {
        setExpandAllEvaluations(prev => !prev);
        setExpandSignalEvaluations(s => s + 1);
    };

    const initialValues = useMemo(() => {
        const base = {
            roles: {
                sergeantAtArms: 'Placeholder',
                presidingOfficer: 'Placeholder',
                toastmasterOfTheDay: 'Placeholder',
                tableTopicsMaster: 'Placeholder',
            },
            evaluations: [{}], // start with one
            notes: '', // Notes field
        };
        const allSectionKeys = [
            ...sections.map(s => s.key),
            ...tagTeamSections.map(s => s.key),
            ...overallSections.map(s => s.key),
        ];
        allSectionKeys.forEach(k => { base[k] = {}; });
        return base;
    }, []);

    // Function to convert a question into a statement (positive or negative)
    const convertQuestionToStatement = (question, isPositive) => {
        let statement = question;

        if (isPositive) {
            if (question.startsWith("Was ")) {
                statement = "✅ The " + question.slice(4).replace("?", "") + ".";
            } else if (question.startsWith("Did ")) {
                statement = "✅ The " + question.slice(4).replace("?", "") + ".";
            } else if (question.startsWith("Were ")) {
                statement = "✅ The " + question.slice(5).replace("?", "") + ".";
            } else {
                statement = question.replace("?", "") + ".";
            }
        } else {
            // Negative version
            if (question.startsWith("Was ")) {
                statement = "❌ The " + question.slice(4).replace("?", "") + ".";
            } else if (question.startsWith("Did ")) {
                statement = "❌ The " + question.slice(4).replace("?", "") + ".";
            } else if (question.startsWith("Were ")) {
                statement = "❌ The " + question.slice(5).replace("?", "") + ".";
            } else {
                // For other types of questions, assume the subject is implied
                statement = "❌ The " + question.replace("?", "") + ".";
            }
        }

        return statement;
    };

    // Function to generate structured notes content
    const generateNotesContent = () => {
        const values = form.getFieldsValue();
        const positives = [];
        const toImprove = [];

        // Process Meeting Sections
        sections.forEach(section => {
            section.fields.forEach(field => {
                if (field.type === 'checkbox') {
                    const value = values[section.key]?.[field.name];
                    const positiveStatement = convertQuestionToStatement(field.label, true);
                    const negativeStatement = convertQuestionToStatement(field.label, false);
                    if (value) {
                        positives.push(`${positiveStatement}`);
                    } else {
                        toImprove.push(`${negativeStatement}`);
                    }
                }
            });
        });

        // Process Tag Team Sections
        tagTeamSections.forEach(section => {
            section.fields.forEach(field => {
                if (field.type === 'checkbox') {
                    const value = values[section.key]?.[field.name];
                    const positiveStatement = convertQuestionToStatement(field.label, true);
                    const negativeStatement = convertQuestionToStatement(field.label, false);
                    if (value) {
                        positives.push(`${positiveStatement}`);
                    } else {
                        toImprove.push(`${negativeStatement}`);
                    }
                }
            });
        });

        // Process Overall Sections
        overallSections.forEach(section => {
            section.fields.forEach(field => {
                if (field.type === 'checkbox') {
                    const value = values[section.key]?.[field.name];
                    const positiveStatement = convertQuestionToStatement(field.label, true);
                    const negativeStatement = convertQuestionToStatement(field.label, false);
                    if (value) {
                        positives.push(`${positiveStatement}`);
                    } else {
                        toImprove.push(`${negativeStatement}`);
                    }
                }
            });
        });

        // Process Evaluations
        const evaluationCheckboxes = {
            usedCRC: "Used CRC Method?",
            actionableRecommendation: "Were recommendations specific and actionable?",
            withinTime: "Delivered evaluations within time?",
        };

        values.evaluations.forEach(evaluation => {
            Object.entries(evaluationCheckboxes).forEach(([fieldName, question]) => {
                const value = evaluation[fieldName];
                const positiveStatement = convertQuestionToStatement(question, true);
                const negativeStatement = convertQuestionToStatement(question, false);
                if (value) {
                    positives.push(`${positiveStatement}`);
                } else {
                    toImprove.push(`${negativeStatement}`);
                }
            });
        });

        // Build the content
        let content = '';
        if (positives.length > 0) {
            content += '--------------- Positives ---------------\n';
            content += positives.join('\n');
            content += '\n';
        }
        if (toImprove.length > 0) {
            content += '--------------- To Improve ---------------\n';
            content += toImprove.join('\n');
            content += '\n';
        }

        return content;
    };

    // Handle button click
    const handleGenerateNotes = () => {
        const newContent = generateNotesContent();
        const currentNotes = form.getFieldValue('notes') || '';
        form.setFieldsValue({notes: currentNotes + newContent});
    };

    return (
        <Form form={form} layout="vertical" initialValues={initialValues} style={{ marginTop: 32 }}>
            <Row gutter={[8, 16]} justify="center">
                <Col xs={24} md={12} lg={8}>
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                            <Title level={4} style={{ margin: 0 }}>Meeting Sections</Title>
                            <Button
                                size="small"
                                onClick={toggleExpandAll}
                                icon={expandAll ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
                            >
                                {expandAll ? 'Collapse All' : 'Expand All'}
                            </Button>
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <RolesEditor />
                        </div>
                        {/* General Sections */}
                        {sections.map((section) => (
                            <SectionPanel key={section.key} baseName={section.key} section={section} expandAll={expandAll} expandSignal={expandSignal} />
                        ))}
                    </div>
                </Col>

                <Col xs={24} md={12} lg={8}>
                    <div style={cardStyle}>
                        <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap'}}>
                            <Title level={4} style={{margin: 0}}>Evaluations</Title>
                            <Button
                                size="small"
                                onClick={toggleExpandAllEvaluations}
                                icon={expandAllEvaluations ? <MinusSquareOutlined/> : <PlusSquareOutlined/>}
                            >
                                {expandAllEvaluations ? 'Collapse All' : 'Expand All'}
                            </Button>
                        </div>

                        <Form.List name="evaluations">
                            {(fields, { add, remove }) => (
                                <>
                                    <Divider style={{ marginTop: 0, marginBottom: 8 }}>Speech Evaluations</Divider>
                                    <Flex gap="small" wrap vertical={screens.xs} style={{ marginBottom: 8 }}>
                                        <Button onClick={() => add()} icon={<UserAddOutlined />} block={screens.xs}>
                                            Add Evaluation
                                        </Button>
                                        <Button
                                            onClick={() => fields.length > 0 && remove(fields.length - 1)}
                                            icon={<UserDeleteOutlined />}
                                            disabled={fields.length === 0}
                                            block={screens.xs}
                                        >
                                            Remove Evaluation
                                        </Button>
                                    </Flex>

                                    <Collapse
                                        items={fields.map((field, i) => ({
                                            key: String(field.key),
                                            label: `Evaluation # ${i + 1}`,
                                            children: <SpeechEvaluator namePath={[field.name]} />,
                                        }))}
                                    />

                                </>
                            )}
                        </Form.List>

                        <Divider style={{ marginTop: 12, marginBottom: 8 }}>Tag Team Evaluation</Divider>

                        {tagTeamSections.map(section => (
                            <SectionPanel
                                key={section.key}
                                baseName={section.key}
                                section={section}
                                expandAll={expandAllEvaluations}
                                expandSignal={expandSignalEvaluations}
                            />
                        ))}

                        <Divider style={{ marginTop: 12, marginBottom: 8 }}>General Evaluation</Divider>
                        {overallSections.map(section => (
                            <SectionPanel
                                key={section.key}
                                baseName={section.key}
                                section={section}
                                expandAll={expandAllEvaluations}
                                expandSignal={expandSignalEvaluations}
                            />
                        ))}
                    </div>
                </Col>
            </Row>

            {/* Notes Section */}
            <Row gutter={[8, 16]} justify="center">
                <Col xs={16}>
                    <div style={cardStyle}>
                        <Flex gap={8} vertical>
                            <Form.Item name="notes" noStyle>
                                <TextArea
                                    placeholder="Add any additional notes here..."
                                    autoSize={{minRows: 3, maxRows: 6}}
                                    style={{width: '100%'}}
                                />
                            </Form.Item>
                            <Button type="primary" onClick={handleGenerateNotes}>Append Observations</Button>
                        </Flex>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}