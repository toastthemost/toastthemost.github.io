// Common message handler utilities
export const createMessageHandler = (messageApi) => ({
    success: (content) => messageApi.open({ type: 'success', content }),
    error: (content) => messageApi.open({ type: 'error', content }),
    warning: (content) => messageApi.open({ type: 'warning', content }),
    info: (content) => messageApi.open({ type: 'info', content })
});

// Common validation messages
export const VALIDATION_MESSAGES = {
    MISSING_SPEAKER_INFO: "Missing Speaker's Info !!",
    MISSING_SPEAKER_NAME: "Missing Speaker's Name !!",
    FEEDBACK_ADDED: "Feedback Added Successfully",
    SPEAKER_REMOVED: "Speaker Removed!",
    UPDATED_CURRENT_SPEECH: "Updated Current Speech",
    SPEAKER_ADDED_TO_LIST: "Speaker's Info added to the List",
    UPDATED_FROM_LIST: "Updated Current Speech from List"
};