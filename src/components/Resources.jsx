import React, { useState, useEffect } from 'react';
import {
    Typography,
    Row,
    Col,
    Button,
    Card,
    Grid,
    List,
    Divider,
    Collapse,
    Modal,
    Checkbox,
    Progress,
} from 'antd';
import { FileTextOutlined, CheckSquareOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { cardStyle } from '../styles/styles';

const { Title, Text } = Typography;

export function Resources() {
    const screens = Grid.useBreakpoint();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [checklists, setChecklists] = useState({});

    // Load checklist state from localStorage on component mount
    useEffect(() => {
        const savedChecklists = localStorage.getItem('toastmasters-checklists');
        if (savedChecklists) {
            setChecklists(JSON.parse(savedChecklists));
        }
    }, []);

    // Save checklist state to localStorage whenever it changes
    useEffect(() => {
        if (Object.keys(checklists).length > 0) {
            localStorage.setItem('toastmasters-checklists', JSON.stringify(checklists));
        }
    }, [checklists]);

    const showModal = (role) => {
        setSelectedRole(role);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedRole(null);
    };

    const handleChecklistChange = (roleKey, itemIndex, checked) => {
        setChecklists(prev => ({
            ...prev,
            [roleKey]: {
                ...prev[roleKey],
                [itemIndex]: checked
            }
        }));
    };

    const resetChecklist = (roleKey) => {
        setChecklists(prev => ({
            ...prev,
            [roleKey]: {}
        }));
    };

    const getCompletionPercentage = (roleKey, items) => {
        const roleChecklist = checklists[roleKey] || {};
        
        // Count only completed items that correspond to actual checkable items
        let completedCheckableItems = 0;
        let totalCheckableItems = 0;
        
        items.forEach((item, index) => {
            const isHeader = item.includes('BEFORE MEETING:') || item.includes('DURING MEETING:') || item.includes('AFTER MEETING:');
            const isEmpty = item.trim() === '';
            
            if (!isHeader && !isEmpty) {
                totalCheckableItems++;
                if (roleChecklist[index]) {
                    completedCheckableItems++;
                }
            }
        });
        
        return totalCheckableItems > 0 ? Math.round((completedCheckableItems / totalCheckableItems) * 100) : 0;
    };

    // Define checklists for each role
    const roleChecklists = {
        'speaker': {
            title: 'Speaker Checklist',
            items: [
                '📋 BEFORE MEETING:',
                'Review your pathway project objectives',
                'Download Evaluation Resources PDF from this page',
                'Craft speech based on project objectives',
                'Meeting theme is secondary to project goals',
                'Contact your evaluator before the meeting',
                'Provide printed evaluation form if they prefer physical',
                'Email digital evaluation form if they prefer online',
                'Ask evaluator for any specific requirements',
                'Bring any props needed (if attending physically)',
                'Test mic, camera, and background (if attending virtually)',
                '',
                '🎤 DURING MEETING:',
                'Shake hands with TMoD when coming to stage',
                'Respect timer signals during your speech',
                'Shake hands with TMoD when leaving stage'
            ]
        },
        'speech-evaluator': {
            title: 'Speech Evaluator Checklist',
            items: [
                '📋 BEFORE MEETING:',
                'Familiarize yourself with meeting structure and your time slot',
                'Connect with your assigned speaker before the meeting',
                'Confirm speech title with speaker',
                'Confirm project path/level and objectives',
                'Ensure you have the evaluation sheet from speaker\'s project',
                '',
                '🎤 DURING MEETING:',
                'Observe content delivery during the speech',
                'Note body language and stage presence',
                'Listen to language use and vocal variety',
                'Check alignment to project objectives',
                'Structure your evaluation with CRC format',
                'Stay within 2-3 minutes allotted time',
                'Use specific examples rather than general comments',
                'Fill out written/digital evaluation with detailed feedback',
                'Hand the stage gracefully to GE after evaluation',
                '',
                '✅ AFTER MEETING:',
                'Complete final written evaluation if not done during meeting',
                'Provide additional feedback to speaker if requested'
            ]
        },
        'toastmaster-of-day': {
            title: 'Toastmaster of the Day Checklist',
            items: [
                '📋 BEFORE MEETING:',
                'Prepare engaging opening around the theme',
                'Familiarize yourself with the meeting structure',
                'Confirm the availability of all roleplayers',
                'Coordinate with the relevant session taker if there is any special topic to cover',
                'Collect and use short intros for speakers',
                'Make sure to write Speaker, Evaluators and all role takers names on the whiteboard before the meeting',
                'Keep a backup plan ready in case of dropouts',
                '',
                '🎤 DURING MEETING:',
                'Manage time and transactions smoothly',
                'Lead applause and ensure your introductions don\'t overlap with it',
                'Always shake hands while handing over the stage',
                'Summarize the theme before closing',
                'Hand the meeting back to the PO gracefully'
            ]
        },
        'general-evaluator': {
            title: 'General Evaluator Checklist',
            items: [
                '📋 BEFORE MEETING:',
                'Use General Evaluator Tab in this web app for detailed checklist',
                'Familiarize yourself with meeting structure',
                'Closely coordinate with TMoD before the meeting',
                'Confirm availability of evaluation role players',
                'Act as a lead for evaluation team',
                'Confirm that all speech evaluators have their evaluation sheets ready',
                'Ensure the role player names are written on whiteboard',
                '',
                '🎤 DURING MEETING:',
                'Closely coordinate with TMoD during the meeting',
                'Ensure each evaluator is evaluated properly and gets their speaking slot',
                'Cover overall meeting flow, time management and role player\'s performance',
                'Give balanced feedback - Positives before improvements',
                'Summarize key learnings and overall meeting effectiveness',
                'Hand the stage back to the TMoD'
            ]
        },
        'timekeeper': {
            title: 'Timekeeper Checklist',
            items: [
                '📋 BEFORE MEETING:',
                'Use Timekeeper Tab in this web app',
                'Familiarize yourself with meeting structure and timing rules',
                'Physical: Collect Timing Flyers from Custodian',
                'Virtual: Download official zoom images (Link in resource section)',
                'Virtual: Share screen with default blue image (don\'t set your zoom background)',
                'Physical: Sit where visible to speaker, evaluators and GE',
                'Check with TMoD for any Ice-Breaker speech',
                'Know timing: Ice Breaker 4-6min, Other speech 5-7min, Table Topics 1-2min, Evaluations 2-3min',
                'Prepare backup timing options',
                '',
                '🎤 DURING MEETING:',
                'Share timing rules clearly at start',
                'Ensure signals are visible and timely',
                'Record actual speaking times',
                'Present report clearly when called',
                'Hand stage back to GE gracefully'
            ]
        },
        'grammarian': {
            title: 'Grammarian Checklist',
            items: [
                '📋 BEFORE MEETING:',
                'Choose a word of the day that aligns with meeting theme',
                'Prepare a short definition and 2-3 usage examples',
                'Coordinate with the GE to confirm when you will introduce your role',
                'Use Grammarian tab in this web app to help you during meeting',
                'Write the word of the day and its meaning on the whiteboard (physical) or request TMoD/GE to do it (virtual)',
                '',
                '🎤 DURING MEETING:',
                'Encourage members to use the word of the day throughout the meeting',
                'Listen attentively to all speakers and role players',
                'Note good usage of language and opportunities for improvements',
                'Keep feedback encouraging and balanced',
                'Track how often the word of the day was used and by whom',
                'Note memorable language and phrases',
                'Identify key grammatical strengths and 1-2 improvement areas',
                'Deliver your report clearly within allocated time',
                'Hand the stage back to the GE gracefully'
            ]
        },
        'ah-counter': {
            title: 'Ah-Counter Checklist',
            items: [
                '📋 BEFORE MEETING:',
                'Familiarize yourself with the meeting structure and your time slot',
                'Coordinate with GE when you can introduce yourself',
                'Use Ah-Counter tab to help you during meeting',
                '',
                '🎤 DURING MEETING:',
                'Explain the purpose of Ah-Counter during your introduction',
                'Clarify which filler words/sounds you will be tracking',
                'Pay close attention to all speakers and role players throughout the meeting',
                'Note frequency of filler words for each participant',
                'Be accurate but not distracting',
                'Keep your report encouraging and concise',
                'Share overall observations in your report',
                'Mention common fillers used by the group',
                'Point out patterns and positive improvements',
                'Deliver your report within allocated time',
                'Hand the stage back to GE gracefully'
            ]
        },
        'table-topics-master': {
            title: 'Table Topics Master Checklist',
            items: [
                '📋 BEFORE MEETING:',
                'Familiarize yourself with the meeting structure and your time slot',
                'Closely coordinate with TMoD to confirm how much time is available for Table Topics',
                'Prepare 8-10 Table Topics questions in advance',
                'Ensure topics are closely aligned with meeting themes',
                'Keep a balance of questions to suit both first timers and experienced speakers',
                '',
                '🎤 DURING MEETING:',
                'Briefly explain the purpose of Table Topics at the start of your session',
                'Announce the speaking time rules (1-2 min with 30 sec grace)',
                'When inviting speakers, first call guests, then members without roles and then role players',
                'Always call out speaker name and Table Topic clearly while speaker is on stage for evaluation to note',
                'Encourage participation but avoid pressurizing reluctant speakers',
                'Listen carefully and lead applause after every speech',
                'Manage time carefully to stay within the slot',
                'Wrap up thanking participants and highlight creativity or standout responses',
                'Hand the stage gracefully back to TMoD'
            ]
        }
    };

    return (
        <>
            {/* Background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/images/about_us.jpg)',
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
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                zIndex: 1
            }}></div>

            <Row align="center" gutter={24} style={{marginTop: 32, position: 'relative', zIndex: 2, flex: 1}}>
                    {/* Role Player Handbook - Left Column */}
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: 24 }}>
                        <div style={{...cardStyle, width: '100%', height: '100%'}}>
                            {/* Card Header */}
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                marginBottom: 16,
                                gap: 12
                            }}>
                                <FileTextOutlined style={{ 
                                    fontSize: screens.xs ? 28 : 32, 
                                    color: '#52c41a' 
                                }} />
                                <Title level={4} style={{ margin: 0, color: '#1d1d1d', fontSize: screens.xs ? 16 : 18 }}>
                                    Role Player Handbook
                                </Title>
                            </div>
                            
                            <Text style={{ 
                                color: '#666', 
                                fontSize: screens.xs ? 14 : 15,
                                lineHeight: 1.5,
                                display: 'block',
                                marginBottom: 16
                            }}>
                                Essential guides for all Toastmasters meeting roles. Learn how to excel as a Timekeeper, Ah-Counter, Grammarian, and more.
                            </Text>

                            <Divider style={{ margin: '12px 0' }} />

                            {/* Role List - No Categories */}
                            <List
                                itemLayout="horizontal"
                                size="small"
                                dataSource={[
                                        {
                                            title: "Speaker",
                                            description: "Essential checklist for delivering effective speeches and presentations.",
                                            roleKey: "speaker"
                                        },
                                        {
                                            title: "Speech Evaluator",
                                            description: "Guide to providing constructive feedback and effective speech evaluations.",
                                            roleKey: "speech-evaluator"
                                        },
                                        {
                                            title: "Toastmaster of the Day",
                                            description: "Complete guide to hosting and managing Toastmasters meetings effectively.",
                                            roleKey: "toastmaster-of-day"
                                        },
                                        {
                                            title: "General Evaluator",
                                            description: "Comprehensive guide to evaluating overall meeting effectiveness and providing feedback.",
                                            roleKey: "general-evaluator"
                                        },
                                        {
                                            title: "Timekeeper",
                                            description: "Learn how to effectively manage meeting timing and provide clear time signals to speakers.",
                                            roleKey: "timekeeper"
                                        },
                                        {
                                            title: "Grammarian",
                                            description: "Guide to improving meeting language quality and introducing vocabulary effectively.",
                                            roleKey: "grammarian"
                                        },
                                        {
                                            title: "Ah-Counter",
                                            description: "Master the art of tracking filler words and helping speakers improve their delivery.",
                                            roleKey: "ah-counter"
                                        },
                                        {
                                            title: "Table Topics Master",
                                            description: "Learn to create engaging impromptu speaking opportunities and manage table topics sessions.",
                                            roleKey: "table-topics-master"
                                        }
                                ]}
                                renderItem={(item) => (
                                        <List.Item
                                            actions={[
                                                <Button
                                                    type="primary"
                                                    icon={<CheckSquareOutlined />}
                                                    size={screens.xs ? "small" : "middle"}
                                                    onClick={() => showModal(item.roleKey)}
                                                    style={{
                                                        minWidth: screens.xs ? '40px' : 'auto',
                                                        padding: screens.xs ? '4px 8px' : '8px 16px',
                                                        fontSize: screens.xs ? '12px' : '14px',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {screens.xs ? '' : 'Checklist'}
                                                </Button>
                                            ]}
                                            style={{
                                                padding: '8px 0',
                                                borderBottom: '1px solid #f5f5f5'
                                            }}
                                        >
                                            <List.Item.Meta
                                                avatar={
                                                    <FileTextOutlined 
                                                        style={{ 
                                                            fontSize: 18, 
                                                            color: '#52c41a',
                                                            marginTop: 2
                                                        }} 
                                                    />
                                                }
                                                title={
                                                    <Text strong style={{ 
                                                        fontSize: 13,
                                                        color: '#1d1d1d'
                                                    }}>
                                                        {item.title}
                                                    </Text>
                                                }
                                                description={
                                                    <Text style={{ 
                                                        color: '#666',
                                                        fontSize: 11,
                                                        lineHeight: 1.3
                                                    }}>
                                                        {item.description}
                                                    </Text>
                                                }
                                            />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>

                    {/* Evaluation Resources - Right Column */}
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: 24 }}>
                        <div style={{...cardStyle, width: '100%', height: '100%'}}>
                            {/* Card Header */}
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                marginBottom: 16,
                                gap: 12
                            }}>
                                <FileTextOutlined style={{ 
                                    fontSize: screens.xs ? 28 : 32, 
                                    color: '#1677ff' 
                                }} />
                                <Title level={4} style={{ margin: 0, color: '#1d1d1d', fontSize: screens.xs ? 16 : 18 }}>
                                    Evaluation Resources
                                </Title>
                            </div>
                            
                            <Text style={{ 
                                color: '#666', 
                                fontSize: screens.xs ? 14 : 15,
                                lineHeight: 1.5,
                                display: 'block',
                                marginBottom: 16
                            }}>
                                Speech evaluation guides, role player resources, and essential tools for Toastmasters meetings. Download PDFs and images for effective evaluations.
                            </Text>

                            <Divider style={{ margin: '12px 0' }} />

                            {/* Collapsible Level Sections */}
                            <Collapse
                                ghost
                                size="middle"
                                defaultActiveKey={['level1']}
                                style={{ 
                                    border: 'none',
                                    background: 'transparent'
                                }}
                                items={[
                                    {
                                        key: 'level1',
                                        label: (
                                            <Title level={5} style={{ 
                                                color: '#1677ff', 
                                                margin: 0,
                                                fontSize: screens.xs ? 14 : 16
                                            }}>
                                                📚 Speech Evaluations: Level 1
                                            </Title>
                                        ),
                                            children: (
                                                <List
                                                    itemLayout="horizontal"
                                                    size="small"
                                                    dataSource={[
                                                        {
                                                            title: "Ice Breaker",
                                                            description: "Your first speech project. Get to know your audience and let them get to know you.",
                                                            filename: "L1-Ice-Breaker.pdf"
                                                        },
                                                        {
                                                            title: "Writing a Speech with Purpose",
                                                            description: "Learn to write speeches with clear objectives and purpose-driven content.",
                                                            filename: "L1-Writing-a-Speech-with-Purpose.pdf"
                                                        },
                                                        {
                                                            title: "Introduction to Vocal Variety & Body Language",
                                                            description: "Master the fundamentals of vocal variety and effective body language in speaking.",
                                                            filename: "L1-Introduction-to-Vocal-Variety-and-Body-Language.pdf"
                                                        },
                                                        {
                                                            title: "Evaluation & Feedback (1st Speech)",
                                                            description: "Comprehensive guide for evaluating first speeches with constructive feedback techniques.",
                                                            filename: "L1-Evaluation-and-Feedback-1st-Speech.pdf"
                                                        },
                                                        {
                                                            title: "Evaluation & Feedback (2nd Speech)",
                                                            description: "Advanced evaluation techniques and feedback methods for second-level speeches.",
                                                            filename: "L1-Evaluation-and-Feedback-2nd-Speech.pdf"
                                                        }
                                                    ]}
                                                    renderItem={(item) => (
                                                        <List.Item
                                                            actions={[
                                                                <Button
                                                                    type="primary"
                                                                    size={screens.xs ? "small" : "middle"}
                                                                    onClick={() => window.open(`/pdfs/${item.filename}`, '_blank')}
                                                                    style={{
                                                                        minWidth: screens.xs ? '40px' : 'auto',
                                                                        padding: screens.xs ? '4px 8px' : '8px 16px',
                                                                        fontSize: screens.xs ? '12px' : '14px',
                                                                        fontWeight: 'bold'
                                                                    }}
                                                                >
                                                                    PDF
                                                                </Button>
                                                            ]}
                                                            style={{
                                                                padding: '8px 0',
                                                                borderBottom: '1px solid #f5f5f5'
                                                            }}
                                                        >
                                                            <List.Item.Meta
                                                                avatar={
                                                                    <FileTextOutlined 
                                                                        style={{ 
                                                                            fontSize: 18, 
                                                                            color: '#1677ff',
                                                                            marginTop: 2
                                                                        }} 
                                                                    />
                                                                }
                                                                title={
                                                                    <Text strong style={{ 
                                                                        fontSize: 13,
                                                                        color: '#1d1d1d'
                                                                    }}>
                                                                        {item.title}
                                                                    </Text>
                                                                }
                                                                description={
                                                                    <Text style={{ 
                                                                        color: '#666',
                                                                        fontSize: 11,
                                                                        lineHeight: 1.3
                                                                    }}>
                                                                        {item.description}
                                                                    </Text>
                                                                }
                                                            />
                                                        </List.Item>
                                                    )}
                                                />
                                            )
                                        },
                                        {
                                            key: 'level2',
                                            label: (
                                                <Title level={5} style={{ 
                                                    color: '#52c41a', 
                                                    margin: 0,
                                                    fontSize: screens.xs ? 14 : 16
                                                }}>
                                                    🎯 Speech Evaluations: Level 2
                                                </Title>
                                            ),
                                            children: (
                                                <List
                                                    itemLayout="horizontal"
                                                    size="small"
                                                    dataSource={[
                                                        {
                                                            title: "Understanding Your Leadership Style",
                                                            description: "Discover and understand your unique leadership style and how to apply it effectively.",
                                                            filename: "L2-Understand-Your-Leadership-Style.pdf"
                                                        }
                                                    ]}
                                                    renderItem={(item) => (
                                                        <List.Item
                                                            actions={[
                                                                <Button
                                                                    type="primary"
                                                                    size={screens.xs ? "small" : "middle"}
                                                                    onClick={() => window.open(`/pdfs/${item.filename}`, '_blank')}
                                                                    style={{
                                                                        minWidth: screens.xs ? '40px' : 'auto',
                                                                        padding: screens.xs ? '4px 8px' : '8px 16px',
                                                                        fontSize: screens.xs ? '12px' : '14px',
                                                                        fontWeight: 'bold'
                                                                    }}
                                                                >
                                                                    PDF
                                                                </Button>
                                                            ]}
                                                            style={{
                                                                padding: '8px 0',
                                                                borderBottom: '1px solid #f5f5f5'
                                                            }}
                                                        >
                                                            <List.Item.Meta
                                                                avatar={
                                                                    <FileTextOutlined 
                                                                        style={{ 
                                                                            fontSize: 18, 
                                                                            color: '#52c41a',
                                                                            marginTop: 2
                                                                        }} 
                                                                    />
                                                                }
                                                                title={
                                                                    <Text strong style={{ 
                                                                        fontSize: 13,
                                                                        color: '#1d1d1d'
                                                                    }}>
                                                                        {item.title}
                                                                    </Text>
                                                                }
                                                                description={
                                                                    <Text style={{ 
                                                                        color: '#666',
                                                                        fontSize: 11,
                                                                        lineHeight: 1.3
                                                                    }}>
                                                                        {item.description}
                                                                    </Text>
                                                                }
                                                            />
                                                        </List.Item>
                                                    )}
                                                />
                                            )
                                        },
                                        {
                                            key: 'other-resources',
                                            label: (
                                                <Title level={5} style={{ 
                                                    color: '#fa8c16', 
                                                    margin: 0,
                                                    fontSize: screens.xs ? 14 : 16
                                                }}>
                                                    🔗 Other Resources
                                                </Title>
                                            ),
                                            children: (
                                                <List
                                                    itemLayout="horizontal"
                                                    size="small"
                                                    dataSource={[
                                                        {
                                                            title: "Ah-Counter Script and Log",
                                                            description: "Script template and logging format for tracking filler words and speech patterns.",
                                                            filename: "ah-counter-script-and-log-A4.pdf"
                                                        },
                                                        {
                                                            title: "General Evaluator Checklist",
                                                            description: "Comprehensive checklist for General Evaluators to assess overall meeting effectiveness.",
                                                            filename: "general-evaluator-checklist-A4.pdf"
                                                        },
                                                        {
                                                            title: "Timer Script and Log",
                                                            description: "Timing script template and log format for accurate meeting time management.",
                                                            filename: "timer-script-and-log-A4.pdf"
                                                        },
                                                        {
                                                            title: "Grammarian Script and Log",
                                                            description: "Script template and log format for tracking word of the day usage and language quality.",
                                                            filename: "grammarian-script-and-log-A4.pdf"
                                                        },
                                                        {
                                                            title: "Timekeeper Images for Zoom",
                                                            description: "Signal images for virtual meetings - use during timekeeper role to show timing status.",
                                                            timekeeperImages: [
                                                                { name: "JPG", filename: "Timer-Blue.jpg", color: "#1677ff" },
                                                                { name: "JPG", filename: "Timer-Green.jpg", color: "#52c41a" },
                                                                { name: "JPG", filename: "Timer-Yellow.jpg", color: "#faad14" },
                                                                { name: "JPG", filename: "Timer-Red.jpg", color: "#ff4d4f" }
                                                            ]
                                                        }
                                                    ]}
                                                    renderItem={(item) => (
                                                        <List.Item
                                                            actions={item.timekeeperImages ? [
                                                                <div key="timekeeper-buttons" style={{
                                                                    display: 'grid',
                                                                    gridTemplateColumns: screens.xs ? '1fr 1fr' : '1fr 1fr',
                                                                    gridTemplateRows: screens.xs ? '1fr 1fr' : '1fr 1fr',
                                                                    gap: screens.xs ? '4px' : '8px',
                                                                    width: '100%',
                                                                    maxWidth: screens.xs ? '140px' : '200px'
                                                                }}>
                                                                    {item.timekeeperImages.map((img) => (
                                                                        <Button
                                                                            key={img.filename}
                                                                            size={screens.xs ? "small" : "middle"}
                                                                            onClick={() => window.open(`/pdfs/${img.filename}`, '_blank')}
                                                                            style={{
                                                                                width: '100%',
                                                                                minHeight: screens.xs ? '30px' : '40px',
                                                                                fontSize: screens.xs ? '10px' : '14px',
                                                                                fontWeight: 'bold',
                                                                                padding: screens.xs ? '2px 4px' : '8px 12px',
                                                                                backgroundColor: img.color,
                                                                                borderColor: img.color,
                                                                                color: 'white'
                                                                            }}
                                                                        >
                                                                            {img.name}
                                                                        </Button>
                                                                    ))}
                                                                </div>
                                                            ] :
                                                                item.filename || item.link ? [
                                                                    <Button
                                                                        type="primary"
                                                                        size={screens.xs ? "small" : "middle"}
                                                                        onClick={() => window.open(item.filename ? `/pdfs/${item.filename}` : item.link, '_blank')}
                                                                        style={{
                                                                            minWidth: screens.xs ? '50px' : 'auto',
                                                                            padding: screens.xs ? '4px 8px' : '8px 16px',
                                                                            fontSize: screens.xs ? '12px' : '14px',
                                                                            fontWeight: 'bold'
                                                                        }}
                                                                    >
                                                                        {item.filename ? (item.filename.endsWith('.pdf') ? 'PDF' : 'IMG') : 'LINK'}
                                                                    </Button>
                                                                ] : []}
                                                            style={{
                                                                padding: '8px 0',
                                                                borderBottom: '1px solid #f5f5f5'
                                                            }}
                                                        >
                                                            <List.Item.Meta
                                                                avatar={
                                                                    <FileTextOutlined 
                                                                        style={{ 
                                                                            fontSize: 18, 
                                                                            color: '#fa8c16',
                                                                            marginTop: 2
                                                                        }} 
                                                                    />
                                                                }
                                                                title={
                                                                    <Text strong style={{ 
                                                                        fontSize: 13,
                                                                        color: '#1d1d1d'
                                                                    }}>
                                                                        {item.title}
                                                                    </Text>
                                                                }
                                                                description={
                                                                    <Text style={{ 
                                                                        color: '#666',
                                                                        fontSize: 11,
                                                                        lineHeight: 1.3
                                                                    }}>
                                                                        {item.description}
                                                                    </Text>
                                                                }
                                                            />
                                                        </List.Item>
                                                    )}
                                                />
                                            )
                                        }
                                ]}
                            />
                        </div>
                    </Col>
                </Row>

            {/* Role Checklist Modal */}
            <Modal
                title={selectedRole ? roleChecklists[selectedRole]?.title : 'Role Checklist'}
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={[
                    <Button key="reset" onClick={() => resetChecklist(selectedRole)} style={{ float: 'left' }}>
                        Reset All
                    </Button>,
                    <Button key="close" type="primary" onClick={handleModalClose}>
                        Close
                    </Button>
                ]}
                width={600}
                style={{ top: 20 }}
            >
                {selectedRole && roleChecklists[selectedRole] && (
                    <div>
                        <div style={{ marginBottom: 16, textAlign: 'center' }}>
                            <Progress 
                                percent={getCompletionPercentage(selectedRole, roleChecklists[selectedRole].items)}
                                strokeColor={{
                                    '0%': '#ff4d4f',
                                    '50%': '#faad14',
                                    '100%': '#52c41a',
                                }}
                                format={(percent) => `${percent}% Complete`}
                            />
                        </div>
                        <List
                            dataSource={roleChecklists[selectedRole].items}
                            renderItem={(item, index) => {
                                // Check if item is a section header (starts with emoji or is empty)
                                const isHeader = item.includes('BEFORE MEETING:') || item.includes('DURING MEETING:') || item.includes('AFTER MEETING:');
                                const isEmpty = item.trim() === '';
                                
                                if (isEmpty) {
                                    return (
                                        <div style={{ height: '16px' }} key={index}></div>
                                    );
                                }
                                
                                if (isHeader) {
                                    return (
                                        <List.Item
                                            key={index}
                                            style={{
                                                padding: '16px 0 8px 0',
                                                borderBottom: 'none'
                                            }}
                                        >
                                            <Text
                                                strong
                                                style={{
                                                    fontSize: 16,
                                                    color: '#1677ff',
                                                    fontWeight: 600
                                                }}
                                            >
                                                {item}
                                            </Text>
                                        </List.Item>
                                    );
                                }
                                
                                return (
                                    <List.Item
                                        key={index}
                                        style={{
                                            padding: '8px 0',
                                            borderBottom: '1px solid #f5f5f5'
                                        }}
                                    >
                                        <Checkbox
                                            checked={checklists[selectedRole]?.[index] || false}
                                            onChange={(e) => handleChecklistChange(selectedRole, index, e.target.checked)}
                                            style={{ marginRight: 12 }}
                                        >
                                            <Text
                                                style={{
                                                    textDecoration: checklists[selectedRole]?.[index] ? 'line-through' : 'none',
                                                    color: checklists[selectedRole]?.[index] ? '#999' : '#333',
                                                    fontSize: 14,
                                                    lineHeight: 1.4
                                                }}
                                            >
                                                {item}
                                            </Text>
                                        </Checkbox>
                                        {checklists[selectedRole]?.[index] && (
                                            <CheckCircleOutlined style={{ color: '#52c41a', marginLeft: 8 }} />
                                        )}
                                    </List.Item>
                                );
                            }}
                        />
                        <div style={{ marginTop: 16, padding: '12px', backgroundColor: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 4 }}>
                            <Text style={{ fontSize: 12, color: '#389e0d' }}>
                                💡 Your progress is automatically saved. Use this checklist during your role to ensure you don't miss any important tasks!
                            </Text>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}