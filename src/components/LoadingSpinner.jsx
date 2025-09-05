import React from 'react';
import { Typography } from 'antd';
import { Loader2 } from 'lucide-react';

const { Text } = Typography;

export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      gap: '16px'
    }}>
      <div className="floating">
        <Loader2 size={32} className="animate-spin" />
      </div>
      <Text type="secondary">{message}</Text>
    </div>
  );
};

export default LoadingSpinner;