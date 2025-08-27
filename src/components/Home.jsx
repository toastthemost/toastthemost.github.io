import React from 'react';
import { Carousel, Typography, Button } from 'antd';
const { Title, Paragraph } = Typography;

// Moved imageSlides outside the component
const imageSlides = [
    {
        src: '/images/mic.jpg',
        title: 'Welcome to Toastmasters Apps',
        description: 'Empowering your club with smart meeting tools.',
        button_text: 'Learn More'
    },
    {
        src: '/images/timekeeper.jpg',
        title: 'Timekeeper',
        description: 'Track time and report with accuracy, every meeting.',
        button_text: 'Launch App'
    },
    {
        src: '/images/ah_counter.jpg',
        title: 'Ah Counter',
        description: 'Record and report Ah counts to help speakers improve.',
        button_text: 'Launch App'
    },
    {
        src: '/images/grammer.jpg',
        title: 'Grammarian',
        description: 'Note word choices, grammar, and effective language use.',
        button_text: 'Launch App'
    },
    {
        src: '/images/ge.jpg',
        title: 'General Evaluator',
        description: 'Provides general feedback to help improving overall meeting',
        button_text: 'Launch App'
    }
    // ...existing commented slides...
];

// Helper component to render a slide
const Slide = ({ src, title, description /*, button_text*/ }) => (
    <div style={{ position: 'relative', height: '600px'}}>
        <img
            src={src}
            alt={title}
            style={{
                width: '100%',
                height: '630px',
                objectFit: 'cover'
            }}
        />
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                color: 'white',
                padding: '40px',
                textAlign: 'center'
            }}
        >
            <Title level={2} style={{ color: 'white' }}>{title}</Title>
            <Paragraph style={{ maxWidth: '600px', color: 'white' }}>
                {description}
            </Paragraph>
            { /* Optionally add a button if needed
            <Button type="primary">{button_text}</Button> 
            */ }
        </div>
    </div>
);

export const Home = () => {
    return (
        <Carousel arrows autoplay adaptiveHeight effect="fade">
            {imageSlides.map((slide, index) => (
                <Slide key={index} {...slide} />
            ))}
        </Carousel>
    );
};
