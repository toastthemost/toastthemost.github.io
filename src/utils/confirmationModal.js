import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

// Reusable confirmation modal utility
export const showConfirmation = ({
    title = 'Confirm Action',
    content = 'Are you sure you want to proceed?',
    onConfirm,
    onCancel,
    okText = 'Yes, Proceed',
    cancelText = 'Cancel',
    type = 'warning'
}) => {
    Modal.confirm({
        title,
        icon: <ExclamationCircleOutlined />,
        content,
        okText,
        cancelText,
        okType: 'danger',
        centered: true,
        onOk: () => {
            if (onConfirm) {
                onConfirm();
            }
        },
        onCancel: () => {
            if (onCancel) {
                onCancel();
            }
        },
    });
};

// Pre-configured confirmations for common actions
export const confirmations = {
    resetFeedback: (onConfirm) => showConfirmation({
        title: 'Reset Feedback?',
        content: 'Are you sure you want to reset all feedback data? This action cannot be undone.',
        onConfirm
    }),
    
    resetLogs: (onConfirm) => showConfirmation({
        title: 'Reset Logs?',
        content: 'Are you sure you want to reset all logged data? This will permanently delete all meeting logs.',
        onConfirm
    }),
    
    resetSections: (onConfirm) => showConfirmation({
        title: 'Reset All Sections?',
        content: 'Are you sure you want to reset all sections? This will clear all checkboxes and input fields.',
        onConfirm
    }),
    
    clearNotes: (onConfirm) => showConfirmation({
        title: 'Clear Notes?',
        content: 'Are you sure you want to clear all notes? This action cannot be undone.',
        onConfirm
    })
};