import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axiosConfig';
import { Container, Form, Input, Button, Title } from '../styles/common';
import styled from 'styled-components';
import BackButton from './BackButton';

const Message = styled.p`
  margin-top: 1rem;
  color: green;
  font-weight: 600;
  text-align: center;
`;

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

const UserProfileEdit = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [userState, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { user, login } = useAuth();


  useEffect(() => {
    if (userId) loadUsuario(userId);
  }, [userId]);

  async function loadUsuario(id: string) {
    try {
      const response = await api.get<User>(`/users/${id}`);
      const userData = response.data;
      setUser(userData);
      setName(userData.name);
    } catch {
      alert('Erro ao carregar dados do usuário');
      navigate('/');
    }
  }

 const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!userState) return;

  try {
    await api.put(`/users/${userState.id}`, { name, ...(password ? { password } : {}) });

    if (user?.id === userState.id) {
      login(
        localStorage.getItem('token')!,
        {
          id: userState.id,
          name,
          email: userState.email,
          role: userState.role as 'admin' | 'user',
          createdAt: userState.createdAt,
        }
      );
    }

    setUser(prev => prev ? { ...prev, name } : prev);
    setPassword('');
    setMessage('Perfil atualizado com sucesso.');
  } catch {
    setMessage('Erro ao atualizar perfil.');
  }
};

  if (!userState) return <p>Carregando...</p>;

  return (
     <Container>
      <BackButton />
      <Title>Meu Perfil</Title>

      <p><strong>Email:</strong> {userState.email}</p>
      <p><strong>Criado em:</strong> {new Date(userState.createdAt).toLocaleDateString()}</p>

      <Form onSubmit={handleUpdate}>
        <Input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required />

        <Input
          type="password"
          placeholder="Nova senha (deixe em branco para não mudar)"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button type="submit">Atualizar Perfil</Button>
      </Form>

      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default UserProfileEdit;