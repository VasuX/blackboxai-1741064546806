import { useState } from 'react';
import styled from '@emotion/styled';
import Navigation from './components/Navigation/Navigation';
import StatsCard from './components/StatsCard/StatsCard';
import TabNavigation from './components/TabNavigation/TabNavigation';
import TaskCard from './components/TaskCard/TaskCard';
import ProgressOverview from './components/ProgressOverview/ProgressOverview';
import Attendance from './components/Attendance/Attendance';
import UserDetails from './components/UserDetails/UserDetails';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const AttendanceContainer = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const ContentContainer = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  min-height: 400px;
`;

function App() {
  const [activeTab, setActiveTab] = useState('details');
  const [taskStats, setTaskStats] = useState({
    total: 4,
    completed: 1,
    inProgress: 2
  });

  const updateTaskStats = (stats) => {
    setTaskStats(stats);
  };

  return (
    <Container>
      <Navigation />
      <StatsContainer>
        <StatsCard 
          title="Total Tasks" 
          value={taskStats.total.toString()} 
          icon="clock" 
        />
        <StatsCard 
          title="Completed" 
          value={taskStats.completed.toString()} 
          icon="check" 
          variant="success" 
        />
        <StatsCard 
          title="In Progress" 
          value={taskStats.inProgress.toString()} 
          icon="info" 
          variant="info" 
        />
      </StatsContainer>
      <AttendanceContainer>
        <StatsCard 
          title="Attendance" 
          value="2" 
          icon="users" 
          variant="purple" 
        />
      </AttendanceContainer>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <ContentContainer>
        {activeTab === 'tasks' && <TaskCard onStatsUpdate={updateTaskStats} />}
        {activeTab === 'progress' && <ProgressOverview />}
        {activeTab === 'attendance' && <Attendance />}
        {activeTab === 'details' && <UserDetails />}
      </ContentContainer>
    </Container>
  );
}

export default App;
