import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProgressSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1rem 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const Progress = styled.div`
  height: 100%;
  background: ${props => {
    switch (props.type) {
      case 'completed':
        return '#16a34a';
      case 'in-progress':
        return '#2563eb';
      default:
        return '#64748b';
    }
  }};
  width: ${props => props.value}%;
  transition: width 0.3s ease;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #64748b;
  font-size: 0.875rem;
`;

const ProgressOverview = () => {
  const projectProgress = {
    completed: 20,
    inProgress: 40,
    pending: 40
  };

  const sprintProgress = {
    completed: 30,
    inProgress: 50,
    pending: 20
  };

  return (
    <Container>
      <ProgressSection>
        <SectionTitle>Project Progress</SectionTitle>
        <ProgressBar>
          <Progress type="completed" value={projectProgress.completed} />
        </ProgressBar>
        <ProgressInfo>
          <span>Completed Tasks</span>
          <span>{projectProgress.completed}%</span>
        </ProgressInfo>
        
        <ProgressBar>
          <Progress type="in-progress" value={projectProgress.inProgress} />
        </ProgressBar>
        <ProgressInfo>
          <span>In Progress</span>
          <span>{projectProgress.inProgress}%</span>
        </ProgressInfo>
        
        <ProgressBar>
          <Progress value={projectProgress.pending} />
        </ProgressBar>
        <ProgressInfo>
          <span>Pending</span>
          <span>{projectProgress.pending}%</span>
        </ProgressInfo>
      </ProgressSection>

      <ProgressSection>
        <SectionTitle>Current Sprint</SectionTitle>
        <ProgressBar>
          <Progress type="completed" value={sprintProgress.completed} />
        </ProgressBar>
        <ProgressInfo>
          <span>Completed Tasks</span>
          <span>{sprintProgress.completed}%</span>
        </ProgressInfo>
        
        <ProgressBar>
          <Progress type="in-progress" value={sprintProgress.inProgress} />
        </ProgressBar>
        <ProgressInfo>
          <span>In Progress</span>
          <span>{sprintProgress.inProgress}%</span>
        </ProgressInfo>
        
        <ProgressBar>
          <Progress value={sprintProgress.pending} />
        </ProgressBar>
        <ProgressInfo>
          <span>Pending</span>
          <span>{sprintProgress.pending}%</span>
        </ProgressInfo>
      </ProgressSection>
    </Container>
  );
};

export default ProgressOverview;
