import { useState } from 'react';
import styled from '@emotion/styled';
import { FaPlus, FaCheck, FaClock } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Task = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const TaskInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const StatusIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  background: ${props => {
    switch (props.status) {
      case 'completed':
        return '#dcfce7';
      case 'in-progress':
        return '#dbeafe';
      default:
        return '#f1f5f9';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'completed':
        return '#16a34a';
      case 'in-progress':
        return '#2563eb';
      default:
        return '#64748b';
    }
  }};
`;

const TaskTitle = styled.div`
  font-weight: 500;
  color: #1e293b;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  background: ${props => props.primary ? '#3b82f6' : '#f1f5f9'};
  color: ${props => props.primary ? 'white' : '#64748b'};

  &:hover {
    background: ${props => props.primary ? '#2563eb' : '#e2e8f0'};
  }

  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TaskCard = ({ onStatsUpdate }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design Updates', status: 'completed' },
    { id: 2, title: 'Frontend Development', status: 'in-progress' },
    { id: 3, title: 'Backend Integration', status: 'in-progress' },
    { id: 4, title: 'Testing', status: 'pending' }
  ]);

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: `Task ${tasks.length + 1}`,
      status: 'pending'
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    updateStats(updatedTasks);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    updateStats(updatedTasks);
  };

  const updateStats = (currentTasks) => {
    const stats = {
      total: currentTasks.length,
      completed: currentTasks.filter(t => t.status === 'completed').length,
      inProgress: currentTasks.filter(t => t.status === 'in-progress').length
    };
    onStatsUpdate(stats);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheck />;
      case 'in-progress':
        return <FaClock />;
      default:
        return <FaClock />;
    }
  };

  return (
    <Container>
      <Button primary onClick={addTask}>
        <FaPlus /> New Task
      </Button>
      <TaskList>
        {tasks.map(task => (
          <Task key={task.id}>
            <TaskInfo>
              <StatusIcon status={task.status}>
                {getStatusIcon(task.status)}
              </StatusIcon>
              <TaskTitle>{task.title}</TaskTitle>
            </TaskInfo>
            <TaskActions>
              {task.status !== 'completed' && (
                <Button onClick={() => updateTaskStatus(task.id, 'completed')}>
                  Complete
                </Button>
              )}
              {task.status === 'pending' && (
                <Button onClick={() => updateTaskStatus(task.id, 'in-progress')}>
                  Start
                </Button>
              )}
            </TaskActions>
          </Task>
        ))}
      </TaskList>
    </Container>
  );
};

export default TaskCard;
