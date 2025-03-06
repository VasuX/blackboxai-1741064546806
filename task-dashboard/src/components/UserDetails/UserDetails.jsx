import { useState } from 'react';
import styled from '@emotion/styled';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  color: #1e293b;
  font-weight: 600;
  margin: 0;
`;

const FormContainer = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #1e293b;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  background: ${props => props.primary ? '#3b82f6' : props.danger ? '#ef4444' : '#f1f5f9'};
  color: ${props => props.primary || props.danger ? 'white' : '#64748b'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

const UserName = styled.span`
  font-size: 1rem;
  color: #1e293b;
  font-weight: 500;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  color: #64748b;
`;

const UserDetails = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('dashboard_users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    
    const newUser = {
      id: Date.now(),
      name: newName.trim()
    };
    
    setUsers(prev => [...prev, newUser]);
    setNewName('');
    localStorage.setItem('dashboard_users', JSON.stringify([...users, newUser]));
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditName(user.name);
  };

  const handleSave = (id) => {
    if (!editName.trim()) return;
    
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, name: editName.trim() } : user
    );
    
    setUsers(updatedUsers);
    setEditingId(null);
    setEditName('');
    localStorage.setItem('dashboard_users', JSON.stringify(updatedUsers));
  };

  const handleDelete = (id) => {
    const filteredUsers = users.filter(user => user.id !== id);
    setUsers(filteredUsers);
    localStorage.setItem('dashboard_users', JSON.stringify(filteredUsers));
  };

  return (
    <Container>
      <Header>
        <Title>User Management</Title>
      </Header>

      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter user name"
            aria-label="User name"
          />
          <Button primary type="submit">
            <FaPlus /> Add User
          </Button>
        </Form>
      </FormContainer>

      {users.length > 0 ? (
        <UserList>
          {users.map(user => (
            <UserCard key={user.id}>
              {editingId === user.id ? (
                <>
                  <Input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    aria-label="Edit user name"
                  />
                  <ButtonGroup>
                    <Button primary onClick={() => handleSave(user.id)}>
                      <FaSave /> Save
                    </Button>
                    <Button onClick={() => setEditingId(null)}>
                      <FaTimes /> Cancel
                    </Button>
                  </ButtonGroup>
                </>
              ) : (
                <>
                  <UserName>{user.name}</UserName>
                  <ButtonGroup>
                    <Button onClick={() => handleEdit(user)}>
                      <FaEdit /> Edit
                    </Button>
                    <Button danger onClick={() => handleDelete(user.id)}>
                      <FaTrash /> Delete
                    </Button>
                  </ButtonGroup>
                </>
              )}
            </UserCard>
          ))}
        </UserList>
      ) : (
        <EmptyState>
          No users added yet. Add a user using the form above.
        </EmptyState>
      )}
    </Container>
  );
};

export default UserDetails;
