import {
    Typography,
    Flex,
    Descriptions,
    Divider,
    Row,
    Col,
    Progress,
    Button,
    notification,
    Tour,
    Affix,
    Grid,
} from 'antd';
import {blue, green, yellow, red} from '@ant-design/colors';
import {cardStyle} from '../styles/styles';
import React, {useRef, useState} from "react";
import toast from 'react-hot-toast';
import {Play, Square, Timer, HelpCircle} from 'lucide-react';
import {useTimerShortcuts} from '../hooks/useKeyboardShortcuts';

import {LogSection} from "./Logger";
import {SpeakerSection} from "./SpeakersContent";
import {getTourSteps} from '../utils/tourConfig';
import {SPEECH_TIMINGS} from '../constants/speechTiming';

const {Title} = Typography;
const { min, mid, max } = SPEECH_TIMINGS;

export const Timekeeper = ({speakerKeyState, speakersListState, speechTypeState, speakerNameState}) => {
    const [api, flagContextHolder] = notification.useNotification();
    const screens = Grid.useBreakpoint();

    const showGreen = type => {
        api[type]({
            message: 'Minimum Time Up',
            description:
                'This is a reminder to display the Green Flag',
        });
    };

    const showYellow = type => {
        api[type]({
            message: 'Mid Time Up',
            description:
                'This is a reminder to display the Yellow Flag',
        });
    };

    const showRed = type => {
        api[type]({
            message: 'Maximum Time Up',
            description:
                'This is a reminder to display the Red Flag',
        });
    };

    const timer = useRef(null);
    const startTimeRef = useRef(null);
    const minShownRef = useRef(false);
    const midShownRef = useRef(false);
    const maxShownRef = useRef(false);
    const elapsedRef = useRef(0);

    const [timerDisplay, setTimerDisplay] = useState('0:00');
    const [strokeColor, setStrokeColor] = useState(blue[5])
    const [percentage, setPercentage] = useState(0);
    const [speechInProgress, setSpeechInProgress] = useState(false);

    const resetTimerFlags = () => {
        minShownRef.current = false;
        midShownRef.current = false;
        maxShownRef.current = false;
    };

    const formatTimerDisplay = (elapsed) => {
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        return `${String(minutes).padStart(1, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleTimerTick = (elapsed, speechType, fullGraceTime) => {
        setTimerDisplay(formatTimerDisplay(elapsed));
        setPercentage(elapsed * 100 / fullGraceTime);

        if (elapsed >= max[speechType] && !maxShownRef.current) {
            setStrokeColor(red[5]);
            showRed('error');
            maxShownRef.current = true;
        } else if (elapsed >= mid[speechType] && !midShownRef.current) {
            setStrokeColor(yellow[5]);
            showYellow('warning');
            midShownRef.current = true;
        } else if (elapsed >= min[speechType] && !minShownRef.current) {
            setStrokeColor(green[5]);
            showGreen('success');
            minShownRef.current = true;
        }
    };

    const handleStartButton = () => {
        if (speechTypeState.var !== '' && speakerNameState.var !== '') {
            startTimeRef.current = Date.now();
            resetTimerFlags();
            const fullGraceTime = max[speechTypeState.var] + 15000;
            setSpeechInProgress(true);

            timer.current = setInterval(() => {
                const elapsed = Date.now() - startTimeRef.current;
                elapsedRef.current = elapsed;
                handleTimerTick(elapsed, speechTypeState.var, fullGraceTime);
            }, 1000);

            toast.success("Timer Started! Press Space to stop", {
                icon: <Timer size={16} />,
            });
        } else {
            toast.error("Missing Speaker's Info!");
        }
    };

    const handleStopButton = () => {
        clearInterval(timer.current);
        const elapsed = elapsedRef.current;
        setSpeechInProgress(false);
        // Compute withinTime status based on elapsed time
        const withinTime = (elapsed < min[speechTypeState.var] || elapsed >= max[speechTypeState.var]) ? "No" : "Yes";

        let feedback = `${speakerNameState.var} (${speechTypeState.var}) : ${timerDisplay} | Within Time: ${withinTime}`;
        setLogs(prevLogs => prevLogs + feedback + '\n');

        setTimerDisplay('0:00');
        setPercentage(0);
        setStrokeColor(blue[5]);
        speechTypeState.func('');
        speakerNameState.func('');
        toast("Timer Stopped!", {
            icon: <Square size={16} />,
        });
    };

    const [logs, setLogs] = useState('');

    // Add keyboard shortcuts
    const { activeShortcuts } = useTimerShortcuts(
        handleStartButton, 
        handleStopButton, 
        speechInProgress
    );

    // Tour functionality
    const [isTourOpen, setIsTourOpen] = useState(false);
    const speakerSectionRef = useRef(null);
    const timerRef = useRef(null);
    const startButtonRef = useRef(null);
    const logsRef = useRef(null);

    const tourSteps = getTourSteps('timekeeper', {
        speakerSectionRef,
        timerRef,
        startButtonRef,
        logsRef
    });

    return (
        <>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/images/timekeeper.jpg)',
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
            <Row align="center" gutter={24} style={{marginTop: 32, position: 'relative', zIndex: 2, flex: 1}}>
            {flagContextHolder}
            <SpeakerSection
                speakerKeyState={speakerKeyState}
                speakersListState={speakersListState}
                speechTypeState={speechTypeState}
                speakerNameState={speakerNameState}
                ref={speakerSectionRef}
            />
            <Col className="gutter-row" xs={24} md={24} lg={12}>
                <Row style={{width: '100%'}}>
                    <div style={{...cardStyle, width: '100%', borderRadius: '0 !important'}}>
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
                            <Row gutter={[0, 8]} justify="center" align="middle">
                                <div ref={timerRef}>
                                    <Progress
                                        size={200}
                                        type="circle"
                                        percent={percentage}
                                        format={() => timerDisplay}
                                        strokeColor={strokeColor}
                                        status="normal"
                                        strokeLinecap="square"
                                    />
                                </div>
                            </Row>
                            <Flex justify="space-between" gap="middle" wrap ref={startButtonRef}>
                                <Button color="green" variant="solid" size="large" disabled={speechInProgress}
                                    onClick={handleStartButton}
                                    icon={<Play size={16} />}
                                    title={!screens.xs ? "Keyboard shortcuts: Ctrl+S (Windows) / Cmd+S (Mac), or Ctrl+T / Cmd+T" : undefined}
                                    style={{minWidth: '120px'}}
                                >{screens.xs ? 'Start' : 'Start (Ctrl+S)'}</Button>
                                <Button type="primary" danger size="large" disabled={!speechInProgress}
                                    onClick={handleStopButton}
                                    icon={<Square size={16} />}
                                    title={!screens.xs ? "Keyboard shortcuts: Ctrl+E (Windows) / Cmd+E (Mac), or Ctrl+T / Cmd+T" : undefined}
                                    style={{minWidth: '120px'}}
                                >{screens.xs ? 'Stop' : 'Stop (Ctrl+E)'}</Button>
                            </Flex>
                        </Flex>
                    </div>
                </Row>
                
                {/* Keyboard shortcut hints */}
                {activeShortcuts.map((shortcut, index) => (
                    <div key={index} className="keyboard-hint show">
                        {shortcut} pressed
                    </div>
                ))}
                <Row style={{width: '100%', marginTop: 16}} ref={logsRef}>
                    <LogSection page={"timekeeper"} logs={logs} setLogs={setLogs}/>
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
};
