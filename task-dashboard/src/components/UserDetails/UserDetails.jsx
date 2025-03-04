import { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Container = styled.div`
  padding: 1rem;
`;

const UserCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 1rem;
  width: 200px;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: ${props => props.primary ? '#3b82f6' : props.danger ? '#ef4444' : '#f1f5f9'};
  color: ${props => props.primary || props.danger ? 'white' : '#64748b'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  margin-bottom: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const UserDetails = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    try {
      return savedUsers ? JSON.parse(savedUsers) : [];
    } catch (e) {
      console.error('Error loading saved users:', e);
      return [];
    }
  });
  
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  // Save changes to localStorage
  useEffect(() => {
    console.log('Saving users:', users);
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Form submitted with name:', newName);
    
    if (!newName.trim()) {
      console.log('Name is empty, not adding');
      return;
    }
    
    const newUser = {
      id: Date.now(),
      name: newName.trim()
    };
    
    console.log('Adding new user:', newUser);
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers, newUser];
      console.log('Updated users list:', updatedUsers);
      return updatedUsers;
    });
    setNewName('');
  }, [newName]);

  const handleEdit = useCallback((user) => {
    console.log('Editing user:', user);
    setEditingId(user.id);
    setEditName(user.name);
  }, []);

  const handleSave = useCallback((id) => {
    console.log('Saving edit for user:', id);
    if (!editName.trim()) return;
    
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === id ? { ...user, name: editName.trim() } : user
      )
    );
    setEditingId(null);
    setEditName('');
  }, [editName]);

  const handleDelete = useCallback((id) => {
    console.log('Deleting user:', id);
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  }, []);

  console.log('Current users:', users);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={newName}
          onChange={(e) => {
            console.log('Input changed:', e.target.value);
            setNewName(e.target.value);
          }}
          placeholder="Enter name"
          aria-label="User name"
        />
        <Button primary type="submit">
          <FaPlus /> Add User
        </Button>
      </Form>

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
                <span>{user.name}</span>
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
    </Container>
  );
};

export default UserDetails;
