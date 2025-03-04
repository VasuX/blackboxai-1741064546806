import styled from '@emotion/styled';
import { FaTasks, FaChartLine } from 'react-icons/fa';

const NavContainer = styled.nav`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e2e8f0;
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: ${props => props.active ? '#3b82f6' : '#64748b'};
  font-weight: ${props => props.active ? '600' : '500'};
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    color: #3b82f6;
    background: #f8fafc;
  }

  svg {
    font-size: 1.25rem;
  }
`;

const Navigation = () => {
  return (
    <NavContainer>
      <NavLink href="#" active={true}>
        <FaChartLine /> Dashboard
      </NavLink>
      <NavLink href="#">
        <FaTasks /> Tasks
      </NavLink>
    </NavContainer>
  );
};

export default Navigation;
