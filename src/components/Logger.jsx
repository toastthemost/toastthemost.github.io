import React from "react";
import {Typography, Input, Flex, Row, Button, message, Grid} from "antd";
import {saveAs} from 'file-saver';

const {Title} = Typography;
const {TextArea} = Input;

export const LogSection = ({page, logs, setLogs}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const screens = Grid.useBreakpoint();

    // Helper function to show messages
    const showMessage = (type, content) => {
        messageApi.open({type, content});
    };

    const handleLogSectionChange = (input) => {
        setLogs(input.target.value);
    };

    const handleResetLogsButton = () => {
        setLogs('');
        // Clear localStorage based on page
        if (page === 'timekeeper') {
            localStorage.removeItem('toastmasters-timekeeper-logs');
        } else if (page === 'ah-counter') {
            const savedData = localStorage.getItem('toastmasters-ah-counter');
            if (savedData) {
                try {
                    const parsedData = JSON.parse(savedData);
                    parsedData.logs = '';
                    localStorage.setItem('toastmasters-ah-counter', JSON.stringify(parsedData));
                } catch (error) {
                    console.error('Error updating ah-counter logs:', error);
                }
            }
        } else if (page === 'grammarian') {
            const savedData = localStorage.getItem('toastmasters-grammarian');
            if (savedData) {
                try {
                    const parsedData = JSON.parse(savedData);
                    parsedData.logs = '';
                    localStorage.setItem('toastmasters-grammarian', JSON.stringify(parsedData));
                } catch (error) {
                    console.error('Error updating grammarian logs:', error);
                }
            }
        }
        showMessage('warning', "Logs section cleared !!");
    };

    const handleExportButton = () => {
        if (logs === '') {
            showMessage('error', "No logs to export !!");
        } else {
            const blob = new Blob([logs], {type: 'text/plain;charset=utf-8'});

            try {
                saveAs(blob, `${page}_logs.txt`);
            } catch (error) {
                console.error('Download failed', error);
            }
        }
    };

    return (
        <Flex gap="small" vertical style={{marginTop: 16, width: '100%' }}>
            {contextHolder}
            <Title level={5}>Meeting Logs</Title>
            <TextArea
                placeholder="Logs will get updated here after clicking on Add Feedback"
                autoSize={{minRows: 3, maxRows: 9}}
                value={logs}
                onChange={handleLogSectionChange}
            />
            <Flex justify="space-between" gap="middle" wrap>
                <Button danger onClick={handleResetLogsButton}
                        style={{minWidth: '120px'}}>Reset Logs</Button>
                <Button onClick={handleExportButton}
                        style={{minWidth: '120px'}}>Export Logs</Button>
            </Flex>
        </Flex>
    )
}
