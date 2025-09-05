// Reusable tour configuration utility
export const createTourSteps = (pageConfig) => {
    const { pageName, icon, description, steps } = pageConfig;
    
    return [
        {
            title: `Welcome to ${pageName}! ${icon}`,
            description,
            target: null,
        },
        ...steps
    ];
};

export const tourConfigs = {
    timekeeper: {
        pageName: 'Timekeeper',
        icon: '🕒',
        description: 'This tool helps you track speech times and manage speakers during Toastmasters meetings.',
        steps: [
            {
                title: 'Speaker Information',
                description: 'Start by adding speaker details here. Select speech type and enter the speaker\'s name.',
                target: 'speakerSectionRef',
            },
            {
                title: 'Timer Display',
                description: 'The circular timer shows elapsed time and changes color: Green (minimum), Yellow (mid-time), Red (maximum).',
                target: 'timerRef',
            },
            {
                title: 'Timer Controls',
                description: 'Use these buttons to start and stop the timer. Keyboard shortcuts: Ctrl+S/Cmd+S to start, Ctrl+E/Cmd+E to stop, Ctrl+T/Cmd+T to toggle.',
                target: 'startButtonRef',
            },
            {
                title: 'Meeting Logs',
                description: 'All speaker times are logged here. You can export or reset the logs as needed.',
                target: 'logsRef',
            },
        ]
    },
    
    ahCounter: {
        pageName: 'Ah-Counter',
        icon: '🔊',
        description: 'Track filler words, sounds, and pauses during Toastmasters speeches to help speakers improve.',
        steps: [
            {
                title: 'Speaker Information',
                description: 'Start by selecting the speaker and speech type you\'re tracking.',
                target: 'speakerSectionRef',
            },
            {
                title: 'Quick Filler Buttons',
                description: 'Use these preset buttons to quickly track common filler words and sounds.',
                target: 'fillerButtonsRef',
            },
            {
                title: 'Custom Filler Words',
                description: 'Add your own filler words that aren\'t in the preset list.',
                target: 'customFillerRef',
            },
            {
                title: 'Filler Count Table',
                description: 'Track counts for each filler word. Click + to increment counts during the speech.',
                target: 'fillerTableRef',
            },
            {
                title: 'Feedback & Comments',
                description: 'Add overall comments about the speaker\'s filler word usage and log your feedback.',
                target: 'feedbackRef',
            },
            {
                title: 'Meeting Logs',
                description: 'Review all logged feedback and export or reset logs as needed.',
                target: 'logsRef',
            },
        ]
    },
    
    grammarian: {
        pageName: 'Grammarian',
        icon: '📝',
        description: 'Track grammar, word usage, and language quality during Toastmasters meetings.',
        steps: [
            {
                title: 'Speaker Information',
                description: 'Select the current speaker and speech type before taking notes.',
                target: 'speakerSectionRef',
            },
            {
                title: 'Word of the Day',
                description: 'Check if the speaker used the word of the day in their speech.',
                target: 'wordOfDayRef',
            },
            {
                title: 'Quotes & Thoughts',
                description: 'Collect memorable quotes, thoughts, words, or sayings from the speech.',
                target: 'quotesRef',
            },
            {
                title: 'Grammar Assessment',
                description: 'Rate the overall grammar and language quality, and add specific feedback.',
                target: 'grammarRef',
            },
            {
                title: 'Save Feedback',
                description: 'Log your feedback or reset the form to start fresh with the next speaker.',
                target: 'feedbackButtonsRef',
            },
            {
                title: 'Meeting Logs',
                description: 'Review all logged feedback and export or reset as needed.',
                target: 'logsRef',
            },
        ]
    },
    
    generalEvaluator: {
        pageName: 'General Evaluator',
        icon: '📊',
        description: 'This comprehensive tool helps you evaluate all aspects of a Toastmasters meeting systematically.',
        steps: [
            {
                title: 'Meeting Sections',
                description: 'Track meeting flow from setup to closing. Use the expand/collapse controls to manage sections efficiently.',
                target: 'meetingSectionsRef',
            },
            {
                title: 'Roles Assignment',
                description: 'Record who filled each key role during the meeting. Click on any name to edit it directly.',
                target: 'rolesRef',
            },
            {
                title: 'Evaluations Panel',
                description: 'Comprehensive evaluation tracking for all speeches and supporting roles during the meeting.',
                target: 'evaluationsRef',
            },
            {
                title: 'Speech Evaluations',
                description: 'Add/remove speech evaluators and track their performance using the CRC method and timing.',
                target: 'speechEvaluationsRef',
            },
            {
                title: 'Tag Team Evaluation',
                description: 'Evaluate supporting roles like Grammarian, Timekeeper, and Ah-Counter performance.',
                target: 'tagTeamRef',
            },
            {
                title: 'Notes & Export',
                description: 'Generate structured observations, add personal notes, and export your complete evaluation.',
                target: 'notesRef',
            },
            {
                title: 'Action Buttons',
                description: 'Use these controls to generate observations from your checkboxes, clear notes, or export your evaluation.',
                target: 'actionButtonsRef',
            },
        ]
    }
};

// Helper to get tour steps with ref resolution
export const getTourSteps = (pageKey, refs) => {
    const config = tourConfigs[pageKey];
    if (!config) return [];
    
    const steps = createTourSteps(config);
    
    // Resolve ref targets
    return steps.map(step => ({
        ...step,
        target: step.target && typeof step.target === 'string' && refs[step.target] 
            ? () => refs[step.target].current 
            : step.target
    }));
};