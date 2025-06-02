import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
  background: transparent;
  border: none;
  color: #0366d6;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const BackButton = () => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate('/')}>← Voltar</Button>;
};

export default BackButton;