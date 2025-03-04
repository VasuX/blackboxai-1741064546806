import styled from '@emotion/styled';
import { FaUser, FaClock } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AttendanceCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: ${props => props.present ? '#dcfce7' : '#f1f5f9'};
  color: ${props => props.present ? '#16a34a' : '#64748b'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
`;

const TimeInfo = styled.div`
  text-align: right;
  color: #64748b;
`;

const Time = styled.div`
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const Duration = styled.div`
  font-size: 0.875rem;
`;

const Attendance = () => {
  const attendanceData = [
    {
      id: 1,
      name: 'John Smith',
      present: true,
      checkIn: '9:00 AM',
      duration: '8h 30m'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      present: true,
      checkIn: '9:15 AM',
      duration: '8h 15m'
    }
  ];

  return (
    <Container>
      {attendanceData.map(person => (
        <AttendanceCard key={person.id}>
          <Avatar present={person.present}>
            <FaUser />
          </Avatar>
          <Info>
            <Name>{person.name}</Name>
            <Status>
              <FaClock />
              {person.present ? 'Present' : 'Absent'}
            </Status>
          </Info>
          <TimeInfo>
            <Time>{person.checkIn}</Time>
            <Duration>{person.duration}</Duration>
          </TimeInfo>
        </AttendanceCard>
      ))}
    </Container>
  );
};

export default Attendance;
