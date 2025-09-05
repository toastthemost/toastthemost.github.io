// Speech timing constants in milliseconds
export const SPEECH_TIMINGS = {
    min: {
        'Ice Breaker': 4 * 60000,
        'Other Speech': 5 * 60000,
        'Table Topic': 60000,
        'Evaluation': 2 * 60000
    },
    mid: {
        'Ice Breaker': 5 * 60000,
        'Other Speech': 6 * 60000,
        'Table Topic': 1.5 * 60000,
        'Evaluation': 2.5 * 60000
    },
    max: {
        'Ice Breaker': 6 * 60000,
        'Other Speech': 7 * 60000,
        'Table Topic': 2 * 60000,
        'Evaluation': 3 * 60000
    }
};

// Speech types array for consistent usage across components
export const SPEECH_TYPES = [
    { value: 'Ice Breaker', label: 'Ice Breaker' },
    { value: 'Other Speech', label: 'Other Speech' },
    { value: 'Table Topic', label: 'Table Topic' },
    { value: 'Evaluation', label: 'Evaluation' }
];