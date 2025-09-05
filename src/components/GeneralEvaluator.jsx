import React, { useMemo, useState, useEffect, useRef } from 'react';
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
    Tour,
    Affix,
} from 'antd';
import { UserDeleteOutlined, UserAddOutlined, PlusSquareOutlined, MinusSquareOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
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
                {value || 'Click to edit'}
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
        if (expandSignal > 0) {
            setActive(!!expandAll);
        }
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
                                <Form.Item key={f.name} name={[baseName, f.name]} noStyle>
                                    <Form.Item shouldUpdate noStyle>
                                        {(form) => {
                                            const value = form.getFieldValue([baseName, f.name]);
                                            return (
                                                <Checkbox 
                                                    indeterminate={value === null}
                                                    checked={value === true}
                                                    onChange={(e) => form.setFieldValue([baseName, f.name], e.target.checked)}
                                                    aria-label={f.label}
                                                >
                                                    {f.label}
                                                </Checkbox>
                                            );
                                        }}
                                    </Form.Item>
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
                <EditableText namePath={['evaluations', ...namePath, 'evaluator']} />
            </Flex>
            <Flex gap="middle" align="center">
                <Text strong>Speaker:</Text>
                <EditableText namePath={['evaluations', ...namePath, 'speaker']} />
            </Flex>
            <Form.Item shouldUpdate noStyle>
                {(form) => {
                    const fieldPath = ['evaluations', ...namePath, 'usedCRC'];
                    const value = form.getFieldValue(fieldPath);
                    return (
                        <Checkbox 
                            indeterminate={value === null}
                            checked={value === true}
                            onChange={(e) => form.setFieldValue(fieldPath, e.target.checked)}
                        >
                            Used CRC Method?
                        </Checkbox>
                    );
                }}
            </Form.Item>
            <Form.Item shouldUpdate noStyle>
                {(form) => {
                    const fieldPath = ['evaluations', ...namePath, 'actionableRecommendation'];
                    const value = form.getFieldValue(fieldPath);
                    return (
                        <Checkbox 
                            indeterminate={value === null}
                            checked={value === true}
                            onChange={(e) => form.setFieldValue(fieldPath, e.target.checked)}
                        >
                            Were recommendations specific and actionable?
                        </Checkbox>
                    );
                }}
            </Form.Item>
            <Form.Item shouldUpdate noStyle>
                {(form) => {
                    const fieldPath = ['evaluations', ...namePath, 'withinTime'];
                    const value = form.getFieldValue(fieldPath);
                    return (
                        <Checkbox 
                            indeterminate={value === null}
                            checked={value === true}
                            onChange={(e) => form.setFieldValue(fieldPath, e.target.checked)}
                        >
                            Delivered evaluations within time?
                        </Checkbox>
                    );
                }}
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

    // Tour functionality
    const [isTourOpen, setIsTourOpen] = useState(false);
    const meetingSectionsRef = useRef(null);
    const rolesRef = useRef(null);
    const evaluationsRef = useRef(null);
    const speechEvaluationsRef = useRef(null);
    const tagTeamRef = useRef(null);
    const notesRef = useRef(null);
    const actionButtonsRef = useRef(null);

    const tourSteps = [
        {
            title: 'Welcome to General Evaluator! 📊',
            description: 'This comprehensive tool helps you evaluate all aspects of a Toastmasters meeting systematically.',
            target: null,
        },
        {
            title: 'Meeting Sections',
            description: 'Track meeting flow from setup to closing. Use the expand/collapse controls to manage sections efficiently.',
            target: () => meetingSectionsRef.current,
        },
        {
            title: 'Roles Assignment',
            description: 'Record who filled each key role during the meeting. Click on any name to edit it directly.',
            target: () => rolesRef.current,
        },
        {
            title: 'Evaluations Panel',
            description: 'Comprehensive evaluation tracking for all speeches and supporting roles during the meeting.',
            target: () => evaluationsRef.current,
        },
        {
            title: 'Speech Evaluations',
            description: 'Add/remove speech evaluators and track their performance using the CRC method and timing.',
            target: () => speechEvaluationsRef.current,
        },
        {
            title: 'Tag Team Evaluation',
            description: 'Evaluate supporting roles like Grammarian, Timekeeper, and Ah-Counter performance.',
            target: () => tagTeamRef.current,
        },
        {
            title: 'Notes & Export',
            description: 'Generate structured observations, add personal notes, and export your complete evaluation.',
            target: () => notesRef.current,
        },
        {
            title: 'Action Buttons',
            description: 'Use these controls to generate observations from your checkboxes, clear notes, or export your evaluation.',
            target: () => actionButtonsRef.current,
        },
    ];

    const initialValues = useMemo(() => {
        const base = {
            roles: {
                sergeantAtArms: 'Click to edit',
                presidingOfficer: 'Click to edit',
                toastmasterOfTheDay: 'Click to edit',
                tableTopicsMaster: 'Click to edit',
            },
            evaluations: [{ evaluator: '', speaker: '', usedCRC: null, actionableRecommendation: null, withinTime: null, comments: '' }], // start with one
            notes: '', // Notes field
        };
        const allSectionKeys = [
            ...sections.map(s => s.key),
            ...tagTeamSections.map(s => s.key),
            ...overallSections.map(s => s.key),
        ];
        // Initialize all checkbox fields to null (intermediate state)
        allSectionKeys.forEach(k => { 
            base[k] = {};
            const currentSections = [...sections, ...tagTeamSections, ...overallSections];
            const section = currentSections.find(s => s.key === k);
            if (section) {
                section.fields.forEach(field => {
                    if (field.type === 'checkbox') {
                        base[k][field.name] = null;
                    }
                });
            }
        });
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
                statement = "✅ " + question.replace("?", "") + ".";
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
                statement = "❌ " + question.replace("?", "") + ".";
            }
        }

        return statement;
    };

    // Function to generate structured notes content
    const generateNotesContent = () => {
        const values = form.getFieldsValue();
        let content = '';

        // Helper function to process a section
        const processSection = (section, sectionValues) => {
            const sectionPositives = [];
            const sectionToImprove = [];
            let sectionComments = '';

            section.fields.forEach(field => {
                if (field.type === 'checkbox') {
                    const value = sectionValues?.[field.name];
                    const positiveStatement = convertQuestionToStatement(field.label, true);
                    const negativeStatement = convertQuestionToStatement(field.label, false);
                    if (value === true) {
                        sectionPositives.push(`  ${positiveStatement}`);
                    } else if (value === false) {
                        sectionToImprove.push(`  ${negativeStatement}`);
                    }
                    // Skip undefined/null values (untouched checkboxes)
                } else if (field.type === 'textarea' && field.name === 'comments') {
                    const commentValue = sectionValues?.[field.name];
                    if (commentValue && commentValue.trim() !== '') {
                        sectionComments = commentValue.trim();
                    }
                }
            });

            // Add section content if there are observations or comments
            if (sectionPositives.length > 0 || sectionToImprove.length > 0 || sectionComments) {
                content += `--------------- ${section.header} ---------------\n`;
                
                if (sectionPositives.length > 0) {
                    content += sectionPositives.join('\n') + '\n';
                }
                
                if (sectionToImprove.length > 0) {
                    content += sectionToImprove.join('\n') + '\n';
                }
                
                if (sectionComments) {
                    content += `Comments: ${sectionComments}\n`;
                }
                
                content += '\n';
            }
        };

        // Process Meeting Sections
        sections.forEach(section => {
            processSection(section, values[section.key]);
        });

        // Process Tag Team Sections
        tagTeamSections.forEach(section => {
            processSection(section, values[section.key]);
        });

        // Process Overall Sections
        overallSections.forEach(section => {
            processSection(section, values[section.key]);
        });

        // Process Evaluations
        const evaluationCheckboxes = {
            usedCRC: "Used CRC Method?",
            actionableRecommendation: "Were recommendations specific and actionable?",
            withinTime: "Delivered evaluations within time?",
        };

        if (values.evaluations && Array.isArray(values.evaluations)) {
            values.evaluations.forEach((evaluation, index) => {
                if (evaluation) {
                    const evaluationPositives = [];
                    const evaluationToImprove = [];

                    Object.entries(evaluationCheckboxes).forEach(([fieldName, question]) => {
                        const value = evaluation[fieldName];
                        const positiveStatement = convertQuestionToStatement(question, true);
                        const negativeStatement = convertQuestionToStatement(question, false);
                        if (value === true) {
                            evaluationPositives.push(`  ${positiveStatement}`);
                        } else if (value === false) {
                            evaluationToImprove.push(`  ${negativeStatement}`);
                        }
                        // Skip undefined/null values (untouched checkboxes)
                    });

                    // Add evaluation content if there are observations or comments
                    const evaluationComments = evaluation.comments && evaluation.comments.trim() !== '' 
                        ? evaluation.comments.trim() 
                        : '';
                    
                    if (evaluationPositives.length > 0 || evaluationToImprove.length > 0 || evaluationComments) {
                        const evaluatorName = evaluation.evaluator || 'Evaluator';
                        const speakerName = evaluation.speaker || 'Speaker';
                        content += `--------------- Evaluation #${index + 1} (${evaluatorName}) ---------------\n`;
                        if (evaluation.speaker && evaluation.speaker.trim() !== '') {
                            content += `Speaker: ${speakerName}\n`;
                        }
                        
                        if (evaluationPositives.length > 0) {
                            content += evaluationPositives.join('\n') + '\n';
                        }
                        
                        if (evaluationToImprove.length > 0) {
                            content += evaluationToImprove.join('\n') + '\n';
                        }
                        
                        if (evaluationComments) {
                            content += `Comments: ${evaluationComments}\n`;
                        }
                        
                        content += '\n';
                    }
                }
            });
        }

        return content;
    };

    // Handle button click
    const handleGenerateNotes = () => {
        try {
            const newContent = generateNotesContent();
            const currentNotes = form.getFieldValue('notes') || '';
            const updatedNotes = currentNotes + (currentNotes ? '\n\n' : '') + newContent;
            form.setFieldsValue({notes: updatedNotes});
        } catch (error) {
            console.error('Error generating notes:', error);
            // You could add a notification here if needed
        }
    };

    // Handle clear observations
    const handleClearNotes = () => {
        form.setFieldsValue({notes: ''});
    };

    // Handle export observations
    const handleExportObservations = () => {
        const notes = form.getFieldValue('notes') || '';
        if (notes.trim() === '') {
            // You could add a notification here if needed
            return;
        }
        const blob = new Blob([notes], { type: 'text/plain;charset=utf-8' });
        const currentDate = new Date().toISOString().split('T')[0];
        saveAs(blob, `General_Evaluator_Observations_${currentDate}.txt`);
    };

    // Handle reset sections
    const handleResetSections = () => {
        form.resetFields();
    };

    return (
        <>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/images/ge.jpg)',
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
            <Form form={form} layout="vertical" initialValues={initialValues} style={{ marginTop: 32, position: 'relative', zIndex: 2, flex: 1 }}>
            <Row gutter={[8, 16]} justify="center">
                <Col xs={24} md={12} lg={8} style={{marginBottom: 24}} ref={meetingSectionsRef}>
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
                        <div style={{ marginBottom: 12 }} ref={rolesRef}>
                            <RolesEditor />
                        </div>
                        {/* General Sections */}
                        {sections.map((section) => (
                            <SectionPanel key={section.key} baseName={section.key} section={section} expandAll={expandAll} expandSignal={expandSignal} />
                        ))}
                    </div>
                </Col>

                <Col xs={24} md={12} lg={8} style={{marginBottom: 24}} ref={evaluationsRef}>
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
                                    <Flex gap="small" wrap vertical={screens.xs} style={{ marginBottom: 8 }} ref={speechEvaluationsRef}>
                                        <Button onClick={() => add({ evaluator: '', speaker: '', usedCRC: null, actionableRecommendation: null, withinTime: null, comments: '' })} icon={<UserAddOutlined />} block={screens.xs}>
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
                                        defaultActiveKey={fields.length > 0 ? [String(fields[0].key)] : []}
                                        items={fields.map((field, i) => ({
                                            key: String(field.key),
                                            label: `Evaluation # ${i + 1}`,
                                            children: <SpeechEvaluator namePath={[field.name]} />,
                                        }))}
                                    />

                                </>
                            )}
                        </Form.List>

                        <Divider style={{ marginTop: 12, marginBottom: 8 }} ref={tagTeamRef}>Tag Team Evaluation</Divider>

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
                <Col xs={24} md={16} ref={notesRef}>
                    <div style={cardStyle}>
                        <Flex gap={8} vertical>
                            <Flex justify="space-between" gap="middle" wrap style={{marginBottom: 16}}>
                                <Button type="primary" danger onClick={handleResetSections}
                                        style={{minWidth: '120px'}}>Reset Sections</Button>
                                <Button type="primary" onClick={handleGenerateNotes}
                                        style={{minWidth: '120px'}}>Append Observations</Button>
                            </Flex>
                            <Form.Item name="notes" noStyle>
                                <TextArea
                                    placeholder="Add any additional notes here..."
                                    autoSize={{minRows: 3}}
                                    style={{width: '100%', resize: 'vertical'}}
                                />
                            </Form.Item>
                            <Flex justify="space-between" gap="middle" wrap ref={actionButtonsRef}>
                                <Button danger onClick={handleClearNotes}
                                        style={{minWidth: '120px'}}>Clear Notes</Button>
                                <Button onClick={handleExportObservations}
                                        style={{minWidth: '120px'}}>Export Notes</Button>
                            </Flex>
                        </Flex>
                    </div>
                </Col>
            </Row>
        </Form>
        
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
                    icon={<QuestionCircleOutlined />}
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
    );
}