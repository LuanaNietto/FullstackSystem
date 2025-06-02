import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { TableWrapper, Table, Th, Td, Actions, ActionButton } from '../styles/tableStyles';
import api from '../api/axiosConfig';
import BackButton from './BackButton';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  lastLoginAt?: string;

};

const Filters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  select {
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: #0366d6;
    }
  }
`;

export const Container = styled.div`
  max-width: 800px;
  margin: 5rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 12px rgb(0 0 0 / 0.1);

  @media (max-width: 480px) {
    margin: 2rem 1rem;
    max-width: 100%;
  }
`;

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'createdAt'>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, sortBy, order]);

  async function fetchUsers() {
    setLoading(true);
    try {
      const params: Record<string,string> = {};

      if (roleFilter !== 'all') {
        params.role = roleFilter;
      }

      params.sortBy = sortBy;
      params.order = order;

      const queryString = new URLSearchParams(params).toString();

      const response = await api.get<User[]>(`/users?${queryString}`);

      setUsers(response.data);
    } catch (error) {
      alert('Erro ao carregar usuários.');
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(userId: string) {
    navigate(`/profile/${userId}`);
  }

  async function handleDelete(userId: string) {
    const confirmado = window.confirm('Tem certeza que deseja excluir este usuário?');
    if (!confirmado) return;

    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(u => u.id !== userId));
      alert('Usuário excluído com sucesso!');
    } catch (error) {
      alert('Erro ao excluir usuário');
    }
  }

  function statusAtivo(lastLogin: string | Date): 'Ativo' | 'Inativo' {
    const dataUltimoLogin = new Date(lastLogin);
    const hoje = new Date();

    const diffMs = hoje.getTime() - dataUltimoLogin.getTime();
    const trintaDiasMs = 30 * 24 * 60 * 60 * 1000;

    return diffMs > trintaDiasMs ? 'Inativo' : 'Ativo';
  }

  return (
    <Container>
      <BackButton />
      <h2>Listagem de Usuários</h2>

      <Filters>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="all">Todos os papéis</option>
          <option value="admin">Admin</option>
          <option value="user">Usuário</option>
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
          <option value="name">Ordenar por Nome</option>
          <option value="createdAt">Ordenar por Data de Criação</option>
        </select>

        <select value={order} onChange={e => setOrder(e.target.value as any)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </Filters>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Papel</Th>
                <Th>Data Criação</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </tr>
            </thead>
            <tbody>
              {users.length ? (
                users.map(u => (
                  <tr key={u.id}>
                    <Td>{u.name}</Td>
                    <Td>{u.email}</Td>
                    <Td>{u.role}</Td>
                    <Td>{new Date(u.createdAt).toLocaleDateString()}</Td>
                    <Td>
                      {u.lastLoginAt
                        ? statusAtivo(new Date(u.lastLoginAt))
                        : 'Inativo'}
                    </Td>
                    <Td>
                      <Actions>
                        <ActionButton variant="edit" onClick={() => handleEdit(u.id)}>Editar</ActionButton>
                        <ActionButton variant="delete" onClick={() => handleDelete(u.id)}>Excluir</ActionButton>
                      </Actions>
                    </Td>
                  </tr>
                ))
              ) : (
                <tr><Td colSpan={6} style={{ textAlign: 'center' }}>Nenhum usuário encontrado.</Td></tr>
              )}
            </tbody>
          </Table>
        </TableWrapper>  
      )}
    </Container>
  );
};

export default UserList;