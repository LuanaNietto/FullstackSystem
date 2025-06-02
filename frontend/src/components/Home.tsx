import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  text-align: center;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  padding: 0.75rem;
  border-radius: 8px;
  border: none;
  background-color: #0366d6;
  color: white;
  font-weight: 600;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #024fa2;
  }
`;

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

   function handleProfile() {
    if (user?.role === 'admin') {
      navigate(`/profile/${user.id}`);
    } else {
      navigate('/profile');
    }
  }

  return (
    <Container>
      <h1>Bem-vindo{user ? `, ${user.name}` : ''}!</h1>

      {user?.role === 'admin' && (
        <Button onClick={() => navigate('/users')}>Listagem de Usuários</Button>
      )}

      {user && (
        <Button onClick={handleProfile}>Meu Perfil</Button>
      )}

      {user && (
        <Button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          style={{ backgroundColor: '#d64545' }}
        >
          Sair
        </Button>
      )}
    </Container>
  );
};

export default Home;