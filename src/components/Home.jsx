import React from 'react';
import { Carousel, Typography, Button } from 'antd';
const { Title, Paragraph } = Typography;

export const Home = () => {

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
            description: 'Manage feedback flow, summarize insights, and elevate the club.',
            button_text: 'Launch App'
        }
    ];
    return (
        <Carousel arrows autoplay adaptiveHeight effect="fade">
            {imageSlides.map((slide, index) => (
                <div key={index} style={{ position: 'relative', height: "600px", marginTop: 20}}>
                    <img
                        src={slide.src}
                        alt={slide.title}
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
                            justifyContent: 'end',
                            alignItems: 'center',
                            color: 'white',
                            padding: '40px',
                            textAlign: 'center'
                        }}
                    >
                        <Title level={2} style={{ color: 'white' }}>{slide.title}</Title>
                        <Paragraph style={{ maxWidth: '600px', color: 'white' }}>
                            {slide.description}
                        </Paragraph>
                        <Button type="primary">{slide.button_text}</Button>
                    </div>
                </div>
            ))}
        </Carousel>
    )
};