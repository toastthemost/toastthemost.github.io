import React from 'react';
import { Carousel, Typography, Button } from 'antd';
const { Title, Paragraph } = Typography;

// Moved imageSlides outside the component
const imageSlides = [
    { src: '/images/mic.jpg', title: 'Welcome to Toastmasters Apps', description: 'Empowering your club with smart meeting tools.', button_text: 'Learn More', page: 'about', showLogo: true },
    { src: '/images/timekeeper.jpg', title: 'Timekeeper', description: 'Track time and report with accuracy, every meeting.', button_text: 'Launch App', page: 'timekeeper' },
    { src: '/images/ah_counter.jpg', title: 'Ah Counter', description: 'Record and report Ah counts to help speakers improve.', button_text: 'Launch App', page: 'ah_counter' },
    { src: '/images/grammer.jpg', title: 'Grammarian', description: 'Note word choices, grammar, and effective language use.', button_text: 'Launch App', page: 'grammarian' },
    { src: '/images/ge.jpg', title: 'General Evaluator', description: 'Provides general feedback to help improving overall meeting', button_text: 'Launch App', page: 'general_evaluator' }
];

// Helper component to render a slide
const slideOuterStyle = {
    width: '100%',
    maxWidth: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const slideContainerStyle = {
    position: 'relative',
    width: '100%',
    height: 'calc(100vh - 144px)',
    overflow: 'hidden',
    background: '#101010'
};

const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
};

const overlayStyle = {
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%',
    background: 'rgba(0, 0, 0, 0.45)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '8vw 4vw 6vw 4vw',
    color: 'white',
    textAlign: 'center',
    boxSizing: 'border-box'
};

const titleStyle = {
    color: 'white',
    fontWeight: 700,
    fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
    marginBottom: '0.4em'
};

const textStyle = {
    color: 'white',
    fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
    margin: 0,
    marginBottom: '1.5em'
};

const buttonStyle = {
  fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
  padding: '0.8em 2.2em',
  marginTop: '1.5em',
  height: 'auto',
  borderRadius: '50px',
  border: 'none',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
  fontWeight: '600',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden'
};

const Slide = ({ src, title, description, button_text, page, onNavigate, showLogo }) => (
    <div style={slideOuterStyle}>
        <div style={slideContainerStyle}>
            <img src={src} alt={title} style={imageStyle} />
            <div style={overlayStyle}>
                {showLogo && (
                    <img 
                        src="/images/TTM.png" 
                        alt="Toast The Most Logo" 
                        style={{ 
                            height: 'clamp(100px, 12vw, 180px)', 
                            width: 'clamp(100px, 12vw, 180px)',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginBottom: '1em',
                            filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))',
                            border: '3px solid rgba(255, 255, 255, 0.3)'
                        }}
                    />
                )}
                <Title level={2} style={titleStyle}>{title}</Title>
                <Paragraph style={textStyle}>{description}</Paragraph>
                <Button 
                    style={buttonStyle} 
                    type="primary"
                    onClick={() => onNavigate && onNavigate(page)}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-3px) scale(1.05)';
                        e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)';
                        e.target.style.background = 'linear-gradient(135deg, #7c8def 0%, #8b5fbf 100%)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0) scale(1)';
                        e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                        e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    }}
                    onMouseDown={(e) => {
                        e.target.style.transform = 'translateY(-1px) scale(1.02)';
                    }}
                    onMouseUp={(e) => {
                        e.target.style.transform = 'translateY(-3px) scale(1.05)';
                    }}
                >{button_text}</Button>
            </div>
        </div>
    </div>
);

export const Home = ({ onNavigate }) => (
    <Carousel
        arrows
        autoplay
        effect="fade"
        dots
        style={{ width: '100%', maxWidth: '100vw', margin: 0 }}
    >
        {imageSlides.map((slide, idx) => (
            <Slide key={idx} {...slide} onNavigate={onNavigate} />
        ))}
    </Carousel>
);
