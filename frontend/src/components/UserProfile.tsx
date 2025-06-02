import React, { useState } from 'react';
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

const UserProfile = async () => {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  if (!user) return null;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/users/${user.id}`, { name, ...(password ? { password } : {}) });

      login(localStorage.getItem('token')!, { ...user, name });
      setPassword('');
      setMessage('Perfil atualizado com sucesso.');
    } catch {
      setMessage('Erro ao atualizar perfil.');
    }
  };

  return (
     <Container>
      <BackButton />
      <Title>Meu Perfil</Title>

      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Criado em:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

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

export default UserProfile;