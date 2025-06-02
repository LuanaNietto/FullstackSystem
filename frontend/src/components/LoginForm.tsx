import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../hooks/useAuth';
import { Container, Form, Input, Button, Title } from '../styles/common';
import BackButton from './BackButton';

import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, user } = response.data;

      login(access_token, user);

       navigate('/');
    } catch {
      setError('Email ou senha inválidos.');
    }
  }

  async function onGoogleSuccess(credentialResponse: CredentialResponse) {
    if (!credentialResponse.credential) {
      setError('Falha no login com Google');
      return;
    }
    try {
      const response = await api.post('/auth/google', { token: credentialResponse.credential });
      const { access_token, user } = response.data;
      login(access_token, user);
      if (user.role === 'admin') navigate('/users');
      else navigate('/profile');
    } catch {
      setError('Login Google falhou');
    }
  }

  return (
    <Container>
      <BackButton />
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit">Entrar</Button>
      </Form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Não tem conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </Container>
    // <GoogleLogin
    //   onSuccess={onGoogleSuccess}
    //   onError={() => setError('Falha ao autenticar com Google')}
    //   logo_alignment="left"
    //   style={{ marginTop: '1rem' }}
    // />  
  );
};

export default LoginForm;