import React from "react";
import {Typography, Input, Flex, Row, Button, message} from "antd";
import {saveAs} from 'file-saver';

const {Title} = Typography;
const {TextArea} = Input;

export const LogSection = ({page, logs, setLogs}) => {
    const [messageApi, contextHolder] = message.useMessage();

    const handleLogSectionChange = (input) => {
        setLogs(input.target.value);
    }

    const handleResetLogsButton = () => {
        setLogs('');
        messageApi.open({type: 'warning', content: "Logs section cleared !!"});
    }

    const handleExportButton = () => {
        if (logs === '') {
            messageApi.open({type: 'error', content: "No logs to export !!"});
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
            <Row justify="space-between">
                <Button danger onClick={handleResetLogsButton}>Reset Logs</Button>
                <Button onClick={handleExportButton}>Export Logs</Button>
            </Row>
        </Flex>
    )
}