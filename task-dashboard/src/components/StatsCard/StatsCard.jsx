import styled from '@emotion/styled';
import { FaClock, FaCheck, FaInfo, FaUsers } from 'react-icons/fa';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  background: ${props => {
    switch (props.variant) {
      case 'success':
        return '#dcfce7';
      case 'info':
        return '#dbeafe';
      case 'purple':
        return '#f3e8ff';
      default:
        return '#f1f5f9';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'success':
        return '#16a34a';
      case 'info':
        return '#2563eb';
      case 'purple':
        return '#9333ea';
      default:
        return '#64748b';
    }
  }};
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  margin: 0 0 0.25rem 0;
`;

const Value = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
`;

const StatsCard = ({ title, value, icon, variant }) => {
  const getIcon = () => {
    switch (icon) {
      case 'check':
        return <FaCheck />;
      case 'info':
        return <FaInfo />;
      case 'users':
        return <FaUsers />;
      default:
        return <FaClock />;
    }
  };

  return (
    <Card>
      <IconWrapper variant={variant}>
        {getIcon()}
      </IconWrapper>
      <Content>
        <Title>{title}</Title>
        <Value>{value}</Value>
      </Content>
    </Card>
  );
};

export default StatsCard;
