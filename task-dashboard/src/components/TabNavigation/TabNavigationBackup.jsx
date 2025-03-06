import styled from '@emotion/styled';

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: -2px;
`;

const Tab = styled.button`
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  color: ${props => props.active ? '#3b82f6' : '#64748b'};
  font-weight: ${props => props.active ? '600' : '500'};
  border-bottom: 2px solid ${props => props.active ? '#3b82f6' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #3b82f6;
  }
`;

const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <TabContainer>
      <Tab 
        active={activeTab === 'tasks'} 
        onClick={() => onTabChange('tasks')}
      >
        Active Tasks
      </Tab>
      <Tab 
        active={activeTab === 'progress'} 
        onClick={() => onTabChange('progress')}
      >
        Progress Overview
      </Tab>
      <Tab 
        active={activeTab === 'attendance'} 
        onClick={() => onTabChange('attendance')}
      >
        Attendance
      </Tab>
      <Tab 
        active={activeTab === 'details'} 
        onClick={() => onTabChange('details')}
      >
        Details
      </Tab>
    </TabContainer>
  );
};

export default TabNavigation;
