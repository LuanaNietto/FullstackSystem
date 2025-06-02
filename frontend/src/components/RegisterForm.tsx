import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Container, Form, Input, Button, Title } from '../styles/common';
import BackButton from './BackButton';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password });
      navigate('/login');
    } catch {
      setError('Erro ao cadastrar');
    }
  }

  return (
    <Container>
      <BackButton />
      <Title>Cadastro</Title>
      <Form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required />
        <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit">Cadastrar</Button>
      </Form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </Container>
  );
};

export default RegisterForm;