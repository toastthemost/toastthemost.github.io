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
    message,
} from 'antd';
import {blue, green, yellow, red} from '@ant-design/colors';
import {cardStyle} from '../styles/styles';
import React, {useRef, useState} from "react";

import {LogSection} from "./Logger";
import {SpeakerSection} from "./SpeakersContent";

const {Title} = Typography;

const min = {
    'Ice Breaker': 4 * 60000,
    'Other Speech': 5 * 60000,
    'Table Topic': 60000,
    'Evaluation': 2 * 60000
}

const mid = {
    'Ice Breaker': 5 * 60000,
    'Other Speech': 6 * 60000,
    'Table Topic': 1.5 * 60000,
    'Evaluation': 2.5 * 60000
}

const max = {
    'Ice Breaker': 6 * 60000,
    'Other Speech': 7 * 60000,
    'Table Topic': 2 * 60000,
    'Evaluation': 3 * 60000
}



export const Timekeeper = ({speakerKeyState, speakersListState, speechTypeState, speakerNameState}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [api, flagContextHolder] = notification.useNotification();

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

    const handleStartButton = () => {
        if (speechTypeState.var !== '' && speakerNameState.var !== '') {
            startTimeRef.current = Date.now();
            // Reset flag refs on start
            minShownRef.current = false;
            midShownRef.current = false;
            maxShownRef.current = false;
            const fullGraceTime = max[speechTypeState.var] + 15000;
            setSpeechInProgress(true);

            timer.current = setInterval(() => {
                const elapsed = Date.now() - startTimeRef.current;
                elapsedRef.current = elapsed;

                const minutes = Math.floor(elapsed / 60000);
                const seconds = Math.floor((elapsed % 60000) / 1000);
                setTimerDisplay(`${String(minutes).padStart(1, '0')}:${String(seconds).padStart(2, '0')}`);

                setPercentage(elapsed * 100 / fullGraceTime);

                if (elapsed >= max[speechTypeState.var] && !maxShownRef.current) {
                    setStrokeColor(red[5]);
                    showRed('error');
                    maxShownRef.current = true;
                } else if (elapsed >= mid[speechTypeState.var] && !midShownRef.current) {
                    setStrokeColor(yellow[5]);
                    showYellow('warning');
                    midShownRef.current = true;
                } else if (elapsed >= min[speechTypeState.var] && !minShownRef.current) {
                    setStrokeColor(green[5]);
                    showGreen('success');
                    minShownRef.current = true;
                }

            }, 1000)
            messageApi.open({type: 'success', content: "Timer Started"});
        } else {
            messageApi.open({type: 'error', content: "Missing Speaker's Info !!"});
        }
    }

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
        messageApi.open({type: 'warning', content: "Timer Stopped !!"});
    }

    const [logs, setLogs] = useState('');

    return (
        <Row align="center" gutter={24} style={{marginTop: 32}}>
            {contextHolder}
            {flagContextHolder}
            <SpeakerSection
                speakerKeyState={speakerKeyState}
                speakersListState={speakersListState}
                speechTypeState={speechTypeState}
                speakerNameState={speakerNameState}
            />
            <Col className="gutter-row" span={12}>
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
                            <Row gutter={[0, 8]} justify="center" align="middle">
                                <Progress
                                    size={200}
                                    type="circle"
                                    percent={percentage}
                                    format={() => timerDisplay}
                                    strokeColor={strokeColor}
                                    status="normal"
                                />
                            </Row>
                            <Row justify="space-between">
                                <Button color="green" variant="solid"  size="large" disabled={speechInProgress}
                                    onClick={handleStartButton}
                                >Start</Button>
                                <Button type="primary" danger size="large" disabled={!speechInProgress}
                                    onClick={handleStopButton}
                                >Stop</Button>
                            </Row>
                        </Flex>
                    </div>
                </Row>
                <Row>
                    <LogSection page={"timekeeper"} logs={logs} setLogs={setLogs}/>
                </Row>
            </Col>
        </Row>
    )
};
